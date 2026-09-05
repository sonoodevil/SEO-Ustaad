import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Modality } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

function getGeminiClient(customKey?: string) {
  const apiKey = customKey?.trim() || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("No Gemini API key available. Please add a Gemini key in Settings or environment.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
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

    const ai = getGeminiClient(customApiKey);

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
      contents: [{ parts: [{ text: fullText }] }],
      config: {
        responseModalities: [Modality.AUDIO],
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
    const wavBuffer = pcmToWav(rawBuffer, 24000, 1, 16);

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

// AI Tutor Chat API
app.post("/api/tutor", async (req, res) => {
  try {
    const { message, history = [], weekTitle, lang = "ur", customApiKey } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = getGeminiClient(customApiKey);

    const systemInstruction = `You are 'SEO Ustaad' (ایس ای او استاد), an expert, patient, warm, and highly practical Digital Marketing and SEO instructor in Pakistan.
The student is studying the 12-week curriculum merging Google Digital Garage and DigiSkills.
Current lesson context: ${weekTitle || "General SEO & Digital Marketing"}.
Guidelines:
1. Reply in the EXACT language and script the user asks in (Urdu Nastaliq, Roman Urdu, or English).
2. When answering in Urdu or Roman Urdu, keep standard technical terms in clear English (crawling, indexing, keywords, backlinks, title tag, permalink, meta description, schema, JSON-LD, Core Web Vitals, Google Business Profile, Fiverr, Upwork, proposal, retainer) — exactly as Pakistani mentors speak in Lahore, Karachi, and Islamabad.
3. Fix awkward plurals (e.g. write "links", "keywords", "tags", "pages" rather than attaching Urdu suffixes like "linkس").
4. Be direct, helpful, and concrete with examples from Pakistan (e.g. local eCommerce, Pakistani restaurants, clinics, DHA/Gulberg, PKR pricing, Payoneer/Wise, PSEB registration).
5. Format answers cleanly using bullet points, short paragraphs, and bold text for key insights. Keep replies under 250 words unless in-depth steps are requested.`;

    const chatContents: Array<{ role: "user" | "model"; parts: [{ text: string }] }> = [];

    if (Array.isArray(history)) {
      for (const item of history.slice(-8)) {
        chatContents.push({
          role: item.role === "user" ? "user" : "model",
          parts: [{ text: item.text }],
        });
      }
    }

    chatContents.push({
      role: "user",
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: chatContents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const text = response.text || "I am ready to help you with SEO. Please ask your question.";
    return res.json({ text, provider: "Gemini" });
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

    const ai = getGeminiClient(customApiKey);

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
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        temperature: 0.3,
      },
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("Empty response from AI evaluator");
    }

    const parsed = JSON.parse(responseText);
    return res.json(parsed);
  } catch (error: any) {
    console.warn("AI evaluation error (falling back to client evaluator):", error?.message || error);
    return res.status(500).json({
      error: error?.message || "Failed to evaluate via Gemini",
    });
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
