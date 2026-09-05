import React, { useState, useRef, useEffect } from "react";
import { X, Send, Bot, User, Sparkles, Volume2, Copy, Check, RotateCcw } from "lucide-react";
import Markdown from "react-markdown";

interface Message {
  role: "user" | "model";
  text: string;
}

interface AITutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlayAudio: (text: string, title: string) => void;
  initialPrompt?: string;
}

const STARTER_PROMPTS = [
  "Crawling aur Indexing mein kya farq hai? Aasan misaal se samjhayein.",
  "Mera LCP 4.2 seconds hai, isko 2.5s se neeche kaise laaon?",
  "Shopify ya WordPress site ke liye canonical tag kaise lagate hain?",
  "Google Maps Pakistan par clinic ya shop rank karne ke 3 sab se zaroori kaam?",
  "Fiverr par pehla SEO order lene ke liye gig description kaise likhun?",
];

export const AITutorModal: React.FC<AITutorModalProps> = ({
  isOpen,
  onClose,
  onPlayAudio,
  initialPrompt,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: "السلام علیکم! میں آپ کا **ایس ای او استاد (SEO Ustaad)** ہوں۔ ڈیجی اسکلز اور گوگل ڈیجیٹل گیراج نصاب، ٹیکنیکل ایس ای او، کی ورڈز، یا کلائنٹ پروجیکٹس کے بارے میں کچھ بھی پوچھیں۔ میں آپ کو سادہ اردو اور انگریزی بول چال میں سکھاؤں گا!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sentInitialRef = useRef<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen && initialPrompt && sentInitialRef.current !== initialPrompt) {
      sentInitialRef.current = initialPrompt;
      handleSend(initialPrompt);
    }
  }, [isOpen, initialPrompt]);

  if (!isOpen) return null;

  const handleSend = async (userText: string) => {
    const textToSend = userText.trim();
    if (!textToSend || isLoading) return;

    const newHistory: Message[] = [...messages, { role: "user", text: textToSend }];
    setMessages(newHistory);
    setInput("");
    setIsLoading(true);

    try {
      // Send conversation to backend /api/tutor
      const res = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          history: newHistory.map((m) => ({
            role: m.role,
            parts: [{ text: m.text }],
          })),
          message: textToSend,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to get response from AI tutor");
      }

      const data = await res.json();
      setMessages([...newHistory, { role: "model", text: data.reply }]);
    } catch (err: any) {
      setMessages([
        ...newHistory,
        {
          role: "model",
          text: "معذرت، رابطہ قائم نہیں ہو سکا۔ براہ کرم اپنا سوال دوبارہ بھیجیں یا انٹرنیٹ کنکشن چیک کریں۔",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleClear = () => {
    setMessages([
      {
        role: "model",
        text: "السلام علیکم! نیا سیشن شروع ہے۔ آپ کیا جاننا چاہتے ہیں؟",
      },
    ]);
  };

  return (
    <div
      id="ai-tutor-overlay"
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4"
    >
      <div
        id="ai-tutor-window"
        className="bg-[#0F0F0F] text-[#E0E0E0] w-full max-w-2xl h-[85vh] max-h-[750px] rounded-2xl shadow-2xl border border-white/10 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-white/10 bg-[#0A0A0A] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold text-white tracking-tight">
                  AI SEO Ustaad <span className="text-blue-500">•</span> اے آئی استاد
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full">
                  Lahore Classroom
                </span>
              </div>
              <p className="text-xs text-white/40">
                Google Digital Garage & DigiSkills Verified Knowledge
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleClear}
              className="p-2 text-white/50 hover:text-white rounded-lg hover:bg-white/5 transition"
              title="Reset Chat"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              id="ai-tutor-close-btn"
              onClick={onClose}
              className="p-2 text-white/50 hover:text-white rounded-lg hover:bg-white/5 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Message Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((m, idx) => {
            const isUser = m.role === "user";
            return (
              <div
                key={idx}
                className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-semibold ${
                    isUser
                      ? "bg-white/10 text-white border border-white/10"
                      : "bg-blue-600 text-white shadow-sm shadow-blue-500/30"
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`group relative max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                    isUser
                      ? "bg-blue-600 text-white rounded-tr-none shadow-blue-500/20 shadow-md"
                      : "bg-white/5 text-[#E0E0E0] rounded-tl-none border border-white/10 font-urdu-body"
                  }`}
                >
                  {isUser ? (
                    <p className="whitespace-pre-wrap">{m.text}</p>
                  ) : (
                    <div className="space-y-2">
                      <div className="prose prose-sm prose-invert max-w-none prose-p:my-1 prose-headings:my-2 prose-ul:my-1 prose-li:my-0.5 prose-headings:text-white">
                        <Markdown>{m.text}</Markdown>
                      </div>

                      {/* Action buttons for AI response */}
                      <div className="pt-2 mt-2 border-t border-white/10 flex items-center gap-2 text-xs">
                        <button
                          onClick={() => onPlayAudio(m.text, "Ustaad's Answer")}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 font-medium transition"
                          title="Listen with Pakistani Urdu voice"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Listen (سنیں)</span>
                        </button>
                        <button
                          onClick={() => copyToClipboard(m.text, idx)}
                          className="flex items-center gap-1 px-2 py-1 rounded hover:bg-white/10 text-white/50 hover:text-white transition"
                          title="Copy text"
                        >
                          {copiedIndex === idx ? (
                            <Check className="w-3.5 h-3.5 text-blue-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                          <span>{copiedIndex === idx ? "Copied" : "Copy"}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-none px-4 py-3 text-sm text-white/60 flex items-center gap-2">
                <Sparkles className="w-4 h-4 animate-spin text-blue-400" />
                <span>استاد سوچ رہے ہیں... (Ustaad is drafting advice...)</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Starter Prompt Chips */}
        {messages.length <= 2 && (
          <div className="px-4 py-2.5 border-t border-white/10 bg-[#0A0A0A]/70">
            <div className="text-[11px] font-semibold text-white/40 mb-1.5 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-blue-400" />
              <span>فوری سوالات (Quick Prompts):</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {STARTER_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(prompt)}
                  className="text-xs px-2.5 py-1 bg-white/5 hover:bg-blue-500/10 hover:border-blue-500/30 hover:text-blue-400 border border-white/10 rounded-full text-white/70 text-left transition"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-3 bg-[#0A0A0A] border-t border-white/10">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="flex items-center gap-2"
          >
            <input
              id="ai-tutor-input-field"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="اردو یا انگلش میں سوال لکھیں... (Ask anything about SEO)"
              className="flex-1 bg-white/5 text-white placeholder:text-white/30 text-sm px-4 py-2.5 rounded-xl border border-white/10 focus:border-blue-500 focus:bg-white/10 outline-none transition"
              disabled={isLoading}
            />
            <button
              id="ai-tutor-submit-btn"
              type="submit"
              disabled={!input.trim() || isLoading}
              className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white p-2.5 rounded-xl transition flex items-center justify-center shadow-md shadow-blue-500/20"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
