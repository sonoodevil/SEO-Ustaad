import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Modality } from "@google/genai";
import { createServer as createViteServer } from "vite";
import { requireAuth, AuthRequest } from "./src/middleware/auth.ts";
import {
  getOrCreateUser,
  logStudySession,
  getUserStudySessions,
  setChecklistStatus,
  getUserChecklist,
  savePracticeSubmission,
  getUserPracticeSubmissions,
} from "./src/db/users.ts";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Multi-key rotation helper for Gemini API quota failover
function getAllAvailableGeminiKeys(customKey?: string): string[] {
  const keys: string[] = [];
  if (customKey?.trim()) keys.push(customKey.trim());
  if (process.env.GEMINI_API_KEY?.trim()) keys.push(process.env.GEMINI_API_KEY.trim());
  if (process.env.GEMINI_API_KEY_2?.trim()) keys.push(process.env.GEMINI_API_KEY_2.trim());
  if (process.env.GEMINI_API_KEY_3?.trim()) keys.push(process.env.GEMINI_API_KEY_3.trim());
  if (process.env.GEMINI_API_KEY_4?.trim()) keys.push(process.env.GEMINI_API_KEY_4.trim());
  if (process.env.GEMINI_API_KEY_5?.trim()) keys.push(process.env.GEMINI_API_KEY_5.trim());
  return Array.from(new Set(keys.filter(Boolean)));
}

async function executeWithGeminiKeyRotation<T>(
  action: (ai: GoogleGenAI, apiKey: string) => Promise<T>,
  customKey?: string
): Promise<T> {
  const keys = getAllAvailableGeminiKeys(customKey);
  if (keys.length === 0) {
    throw new Error("No Gemini API keys available. Please configure GEMINI_API_KEY in environment or settings.");
  }

  let lastError: any = null;
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    try {
      const ai = new GoogleGenAI({
        apiKey: key,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
      return await action(ai, key);
    } catch (err: any) {
      lastError = err;
      const errMsg = String(err?.message || err);
      const isQuotaError =
        errMsg.includes("resource_exhausted") ||
        errMsg.includes("Quota exceeded") ||
        errMsg.includes("429") ||
        errMsg.includes("RATE_LIMIT_EXCEEDED") ||
        errMsg.includes("exhausted");

      console.warn(`⚠️ Gemini API key #${i + 1} (...${key.slice(-4)}) encountered error:`, errMsg);

      if (isQuotaError && i < keys.length - 1) {
        console.log(`🔄 Quota/Rate limit hit. Automatically rotating to backup Gemini API key #${i + 2}...`);
        continue;
      } else if (!isQuotaError) {
        throw err;
      }
    }
  }

  throw lastError || new Error("All available Gemini API keys exhausted their quotas or failed.");
}

// Convert 16-bit 24kHz PCM to WAV
function pcmToWav(pcmBuffer: Buffer, sampleRate = 24000, numChannels = 1, bitsPerSample = 16): Buffer {
  // If it's already a RIFF WAV container, return as is
  if (pcmBuffer.length > 4 && pcmBuffer.toString("utf8", 0, 4) === "RIFF") {
    return pcmBuffer;
  }
  const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const dataSize = pcmBuffer.length;
  const header = Buffer.alloc(44);

  header.write("RIFF", 0);
  header.writeUInt32LE(36 + dataSize, 4);
  header.write("WAVE", 8);
  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20); // PCM format
  header.writeUInt16LE(numChannels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitsPerSample, 34);
  header.write("data", 36);
  header.writeUInt32LE(dataSize, 40);

  return Buffer.concat([header, pcmBuffer]);
}

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    hasServerKey: !!process.env.GEMINI_API_KEY,
  });
});

// Text-to-Speech API
app.post("/api/tts", async (req, res) => {
  try {
    const { text, lang = "ur", voiceName = "Kore", customApiKey, stylePrompt } = req.body;

    if (!text || typeof text !== "string") {
      return res.status(400).json({ error: "Text is required" });
    }

    const wavBuffer = await executeWithGeminiKeyRotation(async (ai) => {
      // Style prompt for teacher delivery
      const defaultUrduPrompt =
        "Aap ek Pakistani SEO ustad hain jo bohot itminaan, shafqat aur saaf lehje mein parha rahe hain. " +
        "Urdu jumlay qudrati, bol chaal wale lehje mein bolein, aur technical English terms (crawling, indexing, keywords, backlinks, title tag, meta description, SERP, schema, robots.txt, canonical, Core Web Vitals, Fiverr, Upwork) saaf English accent mein bolein. " +
        "Raftar mutawassit aur itminaan wali ho:\n\n";

      const defaultEnglishPrompt =
        "Read the following clearly, warmly, and at a steady, engaging pace like an experienced patient mentor:\n\n";

      const promptPrefix = stylePrompt || (lang === "ur" ? defaultUrduPrompt : defaultEnglishPrompt);
      const fullText = promptPrefix + text;

      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-tts-preview",
        contents: [{ role: "user", parts: [{ text: fullText }] }],
        config: {
          responseModalities: ["AUDIO"],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: {
                voiceName: voiceName || "Kore",
              },
            },
          },
        },
      });

      const candidate = response.candidates?.[0];
      const part = candidate?.content?.parts?.[0];
      const inlineData = part?.inlineData;

      if (!inlineData?.data) {
        throw new Error("No audio returned from Gemini TTS");
      }

      const rawBuffer = Buffer.from(inlineData.data, "base64");
      return pcmToWav(rawBuffer, 24000, 1, 16);
    }, customApiKey);

    res.setHeader("Content-Type", "audio/wav");
    res.setHeader("Content-Length", wavBuffer.length.toString());
    res.setHeader("Cache-Control", "public, max-age=86400");
    return res.end(wavBuffer);
  } catch (error: any) {
    console.error("TTS generation error:", error?.message || error);
    return res.status(500).json({
      error: error?.message || "Failed to generate speech",
    });
  }
});

// AI Tutor Chat API with Google Search Grounding
app.post("/api/tutor", async (req, res) => {
  try {
    const { message, history = [], weekTitle, lang = "ur", customApiKey, useSearch = true } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required" });
    }

    const result = await executeWithGeminiKeyRotation(async (ai) => {
      const systemInstruction = `You are 'SEO Ustaad' (ایس ای او استاد), an expert, patient, warm, and highly practical Digital Marketing and SEO instructor in Pakistan.
The student is studying the 12-week curriculum merging Google Digital Garage and DigiSkills.
Current lesson context: ${weekTitle || "General SEO & Digital Marketing"}.
Guidelines:
1. Reply in the EXACT language and script the user asks in (Urdu Nastaliq, Roman Urdu, or English).
2. When answering in Urdu or Roman Urdu, keep standard technical terms in clear English (crawling, indexing, keywords, backlinks, title tag, permalink, meta description, schema, JSON-LD, Core Web Vitals, Google Business Profile, Fiverr, Upwork, proposal, retainer) — exactly as Pakistani mentors speak in Lahore, Karachi, and Islamabad.
3. Fix awkward plurals (e.g. write "links", "keywords", "tags", "pages" rather than attaching Urdu suffixes like "linkس").
4. Be direct, helpful, and concrete with examples from Pakistan (e.g. local eCommerce, Pakistani restaurants, clinics, DHA/Gulberg, PKR pricing, Payoneer/Wise, PSEB registration).
5. Format answers cleanly using bullet points, short paragraphs, and bold text for key insights. Keep replies under 250 words unless in-depth steps are requested.
6. Use Google Search to provide the LATEST SEO news, algorithm updates (e.g. Google Core Updates), and marketplace trends if the student asks for recent info.`;

      const chatContents: any[] = [];

      if (Array.isArray(history)) {
        for (const item of history.slice(-10)) {
          // Robustly extract text from various history formats
          let textValue = "";
          if (item.text && typeof item.text === "string") {
            textValue = item.text;
          } else if (item.content && typeof item.content === "string") {
            textValue = item.content;
          } else if (Array.isArray(item.parts) && item.parts[0]?.text) {
            textValue = item.parts[0].text;
          }

          textValue = textValue.trim();
          if (textValue) {
            chatContents.push({
              role: item.role === "user" ? "user" : "model",
              parts: [{ text: textValue }],
            });
          }
        }
      }

      const userMessage = message.toString().trim();
      if (userMessage) {
        chatContents.push({
          role: "user",
          parts: [{ text: userMessage }],
        });
      }

      if (chatContents.length === 0) {
        throw new Error("No message content to send to AI");
      }

      let response;
      try {
        response = await ai.models.generateContent({
          model: "gemini-3.8-flash",
          contents: chatContents,
          config: {
            systemInstruction,
            temperature: 0.7,
            tools: useSearch ? [{ googleSearch: {} }] : [],
          },
        });
      } catch (searchErr: any) {
        if (useSearch) {
          console.warn("Gemini Search grounding failed, retrying without tools:", searchErr.message);
          response = await ai.models.generateContent({
            model: "gemini-3.8-flash",
            contents: chatContents,
            config: {
              systemInstruction,
              temperature: 0.7,
            },
          });
        } else {
          throw searchErr;
        }
      }

      return {
        text: response.text || "I am ready to help you with SEO. Please ask your question.",
        groundingMetadata: (response as any).candidates?.[0]?.groundingMetadata,
      };
    }, customApiKey);

    return res.json({ 
      text: result.text, 
      provider: "Gemini",
      groundingMetadata: result.groundingMetadata
    });
  } catch (error: any) {
    console.error("Tutor chat error:", error?.message || error);
    return res.status(500).json({
      error: error?.message || "Failed to process tutor question",
    });
  }
});

// AI Practice Evaluator & Mistake Correction API
app.post("/api/evaluate-practice", async (req, res) => {
  try {
    const { topicTitle, submissionText, customApiKey } = req.body;

    if (!submissionText || typeof submissionText !== "string") {
      return res.status(400).json({ error: "Practice submission text is required" });
    }

    const parsed = await executeWithGeminiKeyRotation(async (ai) => {
      const prompt = `You are 'SEO Ustaad' (ایس ای او استاد), a master SEO instructor in Pakistan grading a student's daily practical assignment.
Assignment Topic: "${topicTitle || "Practical SEO Task"}".
Student's Submitted Practice Work:
"""
${submissionText}
"""

Evaluate the work thoroughly. Return a strict JSON response (do NOT wrap in markdown formatting other than pure json or raw text):
{
  "overallScore": number (e.g. 8.2 out of 10),
  "status": "Excellent" | "Pass" | "Needs Revision",
  "rubricScores": {
    "technicalAccuracy": { "score": number (0-3), "max": 3, "note": string },
    "clientReadiness": { "score": number (0-2), "max": 2, "note": string },
    "depthAndAnalysis": { "score": number (0-3), "max": 3, "note": string },
    "actionableFixes": { "score": number (0-2), "max": 2, "note": string }
  },
  "ghaltiyan": [
    {
      "id": "err-1",
      "severity": "critical" | "warning" | "suggestion",
      "mistakeEn": "Brief title of error",
      "mistakeUr": "غلطی کا عنوان اردو میں",
      "explanationEn": "Why this is incorrect in client work",
      "explanationUr": "یہ کیوں غلط ہے اردو میں وضاحت",
      "theekKarnaEn": "Exact correct formula or code snippet to fix it",
      "theekKarnaUr": "درست طریقہ اور حل اردو میں"
    }
  ],
  "strengths": [
    {
      "id": "str-1",
      "titleEn": "What the student did well",
      "titleUr": "عمدہ کام کا عنوان",
      "detailEn": "Specific positive observation"
    }
  ],
  "ustaadAdvice": {
    "en": "Ustaad's personal feedback and encouraging next step",
    "ur": "استاد کا مشورہ اور حوصلہ افزائی"
  }
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        config: {
          responseMimeType: "application/json",
          temperature: 0.3,
        },
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("Empty response from AI evaluator");
      }

      return JSON.parse(responseText);
    }, customApiKey);

    return res.json(parsed);
  } catch (error: any) {
    console.warn("AI evaluation error (falling back to client evaluator):", error?.message || error);
    return res.status(500).json({
      error: error?.message || "Failed to evaluate via Gemini",
    });
  }
});

// ==================== CLOUD SQL USER & SYNC ROUTES ====================

// Synchronize authenticated user to Cloud SQL
app.post("/api/auth/sync-user", requireAuth, async (req: AuthRequest, res) => {
  try {
    const uid = req.user?.uid;
    const email = req.user?.email || "";
    const displayName = req.body?.displayName;

    if (!uid) {
      return res.status(401).json({ error: "Missing user UID in token" });
    }

    const user = await getOrCreateUser(uid, email, displayName);
    return res.json({ success: true, user });
  } catch (error: any) {
    console.error("Failed to sync user to Cloud SQL:", error);
    return res.status(500).json({ error: error?.message || "Failed to sync user" });
  }
});

// Log study stay session to Cloud SQL
app.post("/api/user/study-session", requireAuth, async (req: AuthRequest, res) => {
  try {
    const uid = req.user?.uid;
    const { dayKey, durationSeconds, date } = req.body;

    if (!uid) return res.status(401).json({ error: "Unauthorized" });
    if (!dayKey || typeof durationSeconds !== "number") {
      return res.status(400).json({ error: "dayKey and durationSeconds are required" });
    }

    const session = await logStudySession(
      uid,
      dayKey,
      durationSeconds,
      date || new Date().toISOString().split("T")[0]
    );
    return res.json({ success: true, session });
  } catch (error: any) {
    console.error("Failed to log study session:", error);
    return res.status(500).json({ error: error?.message || "Failed to log session" });
  }
});

// Get user's study sessions from Cloud SQL
app.get("/api/user/study-session", requireAuth, async (req: AuthRequest, res) => {
  try {
    const uid = req.user?.uid;
    if (!uid) return res.status(401).json({ error: "Unauthorized" });

    const sessions = await getUserStudySessions(uid);
    return res.json({ sessions });
  } catch (error: any) {
    console.error("Failed to get study sessions:", error);
    return res.status(500).json({ error: error?.message || "Failed to get sessions" });
  }
});

// Update checklist status in Cloud SQL
app.post("/api/user/checklist", requireAuth, async (req: AuthRequest, res) => {
  try {
    const uid = req.user?.uid;
    const { taskKey, completed } = req.body;

    if (!uid) return res.status(401).json({ error: "Unauthorized" });
    if (!taskKey || typeof completed !== "boolean") {
      return res.status(400).json({ error: "taskKey and completed boolean are required" });
    }

    const item = await setChecklistStatus(uid, taskKey, completed);
    return res.json({ success: true, item });
  } catch (error: any) {
    console.error("Failed to update checklist in Cloud SQL:", error);
    return res.status(500).json({ error: error?.message || "Failed to update checklist" });
  }
});

// Get user checklist from Cloud SQL
app.get("/api/user/checklist", requireAuth, async (req: AuthRequest, res) => {
  try {
    const uid = req.user?.uid;
    if (!uid) return res.status(401).json({ error: "Unauthorized" });

    const checklist = await getUserChecklist(uid);
    return res.json({ checklist });
  } catch (error: any) {
    console.error("Failed to get checklist:", error);
    return res.status(500).json({ error: error?.message || "Failed to get checklist" });
  }
});

// Save practice submission to Cloud SQL
app.post("/api/user/submissions", requireAuth, async (req: AuthRequest, res) => {
  try {
    const uid = req.user?.uid;
    const { topicTitle, submissionText, overallScore, feedbackJson } = req.body;

    if (!uid) return res.status(401).json({ error: "Unauthorized" });
    if (!topicTitle || !submissionText) {
      return res.status(400).json({ error: "topicTitle and submissionText are required" });
    }

    const submission = await savePracticeSubmission(
      uid,
      topicTitle,
      submissionText,
      overallScore,
      feedbackJson
    );
    return res.json({ success: true, submission });
  } catch (error: any) {
    console.error("Failed to save submission to Cloud SQL:", error);
    return res.status(500).json({ error: error?.message || "Failed to save submission" });
  }
});

// Get user submissions from Cloud SQL
app.get("/api/user/submissions", requireAuth, async (req: AuthRequest, res) => {
  try {
    const uid = req.user?.uid;
    if (!uid) return res.status(401).json({ error: "Unauthorized" });

    const submissions = await getUserPracticeSubmissions(uid);
    return res.json({ submissions });
  } catch (error: any) {
    console.error("Failed to get submissions:", error);
    return res.status(500).json({ error: error?.message || "Failed to get submissions" });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SEO Ustaad server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
