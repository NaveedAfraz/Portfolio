import { useState, useRef, useEffect } from "react";
import { Bot, X, Send, Sparkles, Loader2, ChevronDown, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const SYSTEM_PROMPT = `You are "NavBot" - Naveed Afraz's personal AI assistant on his portfolio website. You are enthusiastic, professional, and always speak highly of Naveed as an exceptional Full-Stack Engineer. Your goal is to help recruiters, clients, and visitors learn about Naveed's expertise in web, mobile, and end-to-end software engineering and encourage them to hire or collaborate with him.

## About Naveed Afraz
- Title: Full-Stack Software Engineer (Web, Mobile & End-to-End Systems)
- Location: India
- Education: BCA (Bachelor of Computer Applications) from St. Joseph Degree College, Hyderabad (2023-2026)
- Impact: 1 year professional experience, 7+ engagements (internships + freelance), 19+ production applications delivered (9 client/startup platforms + 10 final year academic systems for students).

## Core Engineering Capabilities
- Frontend & Mobile: React.js, Next.js, React Native, TypeScript, Tailwind CSS, Redux, Vite
- Backend & Microservices: Node.js, Express.js, Python, Django, FastAPI, Socket.IO, REST APIs
- Databases & Systems: MySQL (complex 80+ table architecture), MongoDB, PostgreSQL, Redis
- DevOps & Tools: Docker, Git/GitHub, Microservices Architecture, HWID Licensing
- Payments & AI: Razorpay, Whop, Stripe, AI Captions (Whisper.cpp), Gemini API

## Flagship Systems Built
1. Klipp (klipp.in): AI-powered Adobe After Effects CEP plugin with Whisper.cpp transcription, multilingual translation, HWID licensing, Razorpay/Whop billing & admin dashboard.
2. Tech Students (techstudents.in): EdTech microservices platform with 6 role-based dashboards, automated testing engines, and analytics.
3. MSE Org (mseorg.com), Auramiingo (auramiingo.com), Carekov (carekov.com): Production e-commerce, social networking, and healthcare platforms.

## Rules & Tone
- Always highlight Naveed as a versatile Full-Stack & Systems Engineer (Web + Mobile + Backend + DB).
- Be enthusiastic, confident, and professional.
- Keep answers concise (2-4 sentences) unless detailed system architecture is asked.
- Direct serious hiring/client inquiries to WhatsApp (+91 6300375450).`;

const QUICK_QUESTIONS = [
  "What are his top engineering skills?",
  "Show me his full-stack projects",
  "Is he available for hire?",
  "What backend & mobile stack does he use?",
];

const WA_LINK = "https://wa.me/916300375450";

// Smart local fallback if all AI APIs hit quota/rate limits
const getFallbackReply = (text) => {
  const lower = text.toLowerCase();

  if (lower.includes("skill") || lower.includes("stack") || lower.includes("tech") || lower.includes("backend") || lower.includes("mobile")) {
    return "Naveed is a **Full-Stack Software Engineer** skilled in **React, Next.js, React Native, Node.js, Django, and FastAPI**. He builds end-to-end systems with **MySQL (80+ tables), MongoDB, Redis, Docker, and Microservices**!";
  }
  if (lower.includes("project") || lower.includes("work") || lower.includes("system") || lower.includes("klipp")) {
    return "Naveed has engineered 19+ systems! Key highlights include **Klipp** (AI Adobe After Effects CEP plugin), **Tech Students** (EdTech microservices platform), **MSE Org** (production e-commerce), and 10+ final year engineering systems!";
  }
  if (lower.includes("hire") || lower.includes("contact") || lower.includes("available") || lower.includes("job") || lower.includes("freelance")) {
    return "Yes! Naveed is currently available for full-time engineering roles, freelance software contracts, and end-to-end app development. Reach out on WhatsApp at **+91 6300375450**!";
  }
  if (lower.includes("education") || lower.includes("degree") || lower.includes("college") || lower.includes("bca")) {
    return "Naveed is completing his **BCA (Bachelor of Computer Applications)** at St. Joseph Degree College, Hyderabad (2023-2026).";
  }
  if (lower.includes("hi") || lower.includes("hello") || lower.includes("hey")) {
    return "Hello! I am NavBot. How can I help you learn more about Naveed's full-stack engineering, mobile development, or end-to-end system projects today?";
  }

  return "Naveed Afraz is a Full-Stack Engineer specializing in web, mobile apps, microservices, and end-to-end system architecture with 19+ delivered projects. Feel free to connect directly via WhatsApp at **+91 6300375450**!";
};

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "model",
      text: "Hi! I am NavBot • Naveed Afraz's personal AI assistant.\n\nAsk me anything about his full-stack engineering skills, mobile apps, or end-to-end system architecture • I am here to help!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const formatText = (text) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="font-semibold text-cyan-400 dark:text-cyan-300">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  const fetchGrok = async (userMessages, grokKey, modelName = "grok-2-latest") => {
    const apiMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...userMessages.map((m) => ({
        role: m.role === "model" ? "assistant" : "user",
        content: m.text,
      })),
    ];

    // Using Vite's local dev server proxy to bypass CORS natively!
    const endpoint = "/api/grok/v1/chat/completions";
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${grokKey}`,
      },
      body: JSON.stringify({
        model: modelName,
        messages: apiMessages,
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(`HTTP error ${res.status}: ${errData.error?.message || JSON.stringify(errData)}`);
    }

    const data = await res.json();
    return data.choices?.[0]?.message?.content;
  };

  const fetchGemini = async (userMessages, geminiKey, modelName = "gemini-2.5-flash") => {
    const contents = userMessages.map((m) => ({
      role: m.role === "model" ? "model" : "user",
      parts: [{ text: m.text }],
    }));

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${geminiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents,
          generationConfig: { temperature: 0.7, maxOutputTokens: 350 },
        }),
      }
    );

    const data = await res.json();
    if (data.error) {
      throw new Error(data.error.message || `Gemini API error ${data.error.code}`);
    }

    return data.candidates?.[0]?.content?.parts?.[0]?.text;
  };

  const sendMessage = async (textToUse) => {
    const trimmed = (textToUse ?? input).trim();
    if (!trimmed || loading) return;

    const userMsg = { role: "user", text: trimmed };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    const geminiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const grokKey = import.meta.env.VITE_GROK_API_KEY;

    let reply = null;

    // Strategy 1: Grok API (xAI - grok-2-latest)
    if (!reply && grokKey && grokKey.startsWith("xai-")) {
      try {
        console.log("NavBot: Attempting Grok 2 API call...");
        reply = await fetchGrok(updatedMessages, grokKey, "grok-2-latest");
      } catch (e) {
        console.warn("NavBot: Grok 2 attempt failed:", e.message);
      }
    }

    // Strategy 2: Gemini 2.5 Flash
    if (!reply && geminiKey) {
      try {
        console.log("NavBot: Attempting Gemini 2.5 Flash API call...");
        reply = await fetchGemini(updatedMessages, geminiKey, "gemini-2.5-flash");
      } catch (e) {
        console.warn("NavBot: Gemini 2.5 Flash attempt failed:", e.message);
      }
    }

    // Strategy 3: Gemini 2.0 Flash
    if (!reply && geminiKey) {
      try {
        console.log("NavBot: Attempting Gemini 2.0 Flash API call...");
        reply = await fetchGemini(updatedMessages, geminiKey, "gemini-2.0-flash");
      } catch (e) {
        console.warn("NavBot: Gemini 2.0 Flash attempt failed:", e.message);
      }
    }

    // Strategy 4: Gemini 1.5 Flash Latest
    if (!reply && geminiKey) {
      try {
        console.log("NavBot: Attempting Gemini 1.5 Flash Latest API call...");
        reply = await fetchGemini(updatedMessages, geminiKey, "gemini-1.5-flash-latest");
      } catch (e) {
        console.warn("NavBot: Gemini 1.5 Flash Latest attempt failed:", e.message);
      }
    }

    // Strategy 5: Local Intelligent Fallback Engine (Seamless user experience for recruiters)
    if (!reply) {
      console.log("NavBot: Using Local Intelligent Fallback Engine");
      reply = getFallbackReply(trimmed);
    }

    setMessages((prev) => [...prev, { role: "model", text: reply }]);
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <motion.button
        onClick={() => setIsOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 text-white shadow-lg shadow-cyan-500/30 flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-transform"
        title="Chat with NavBot AI"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <ChevronDown className="w-6 h-6" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Sparkles className="w-6 h-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-[380px] h-[520px] max-h-[80vh] bg-neutral-900/95 dark:bg-[#0c1017]/95 border border-neutral-800 backdrop-blur-2xl rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3.5 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white sour-gummy flex items-center gap-1.5">
                    NavBot AI
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  </h3>
                  <p className="text-[11px] text-neutral-400">Naveed's Personal Assistant</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Chat on WhatsApp"
                  className="w-8 h-8 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                </a>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors flex items-center justify-center cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
              style={{ scrollbarWidth: "thin", scrollbarColor: "#333 transparent" }}
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15 }}
                  className={`flex items-end gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role !== "user" && (
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center shrink-0 mb-0.5">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed break-words [overflow-wrap:anywhere] ${
                      msg.role === "user"
                        ? "bg-cyan-500 text-white rounded-br-none"
                        : "bg-neutral-800/80 border border-neutral-700/60 text-neutral-200 rounded-bl-none"
                    }`}
                  >
                    {msg.text.split("\n").map((line, li) => (
                      <p key={li} className={`break-words [overflow-wrap:anywhere] ${li > 0 ? "mt-1.5" : ""}`}>
                        {formatText(line)}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}

              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-end gap-2 justify-start"
                >
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center shrink-0">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="bg-neutral-800/80 border border-neutral-700/60 rounded-2xl rounded-bl-none px-4 py-2.5 flex items-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                    <span className="text-xs text-neutral-400">NavBot is thinking...</span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            {messages.length === 1 && !loading && (
              <div
                className="px-4 pb-3 flex gap-2 overflow-x-auto shrink-0"
                style={{ scrollbarWidth: "none" }}
              >
                {QUICK_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="shrink-0 text-xs px-3 py-1.5 rounded-xl border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input & WhatsApp Action */}
            <div className="p-3 border-t border-neutral-800 space-y-2 bg-neutral-900/60 shrink-0">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about Naveed..."
                  maxLength={500}
                  className="flex-1 bg-neutral-800/90 border border-neutral-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 outline-none focus:border-cyan-500 transition-colors"
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || loading}
                  className="w-10 h-10 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed transition-all shrink-0 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>

              {/* Direct WhatsApp Action Button */}
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-semibold transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                Chat directly on WhatsApp (+91 6300375450)
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;
