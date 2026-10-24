"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Send, Bot, User, RotateCcw, ArrowRight, ShieldCheck, Sparkles, AlertCircle } from "lucide-react";
import { COMPANY } from "@/lib/company";

interface ActionItem {
  label: string;
  url: string;
}

interface Message {
  id: string;
  role: "assistant" | "user";
  content: string;
  actions?: ActionItem[];
  timestamp: string;
  isError?: boolean;
}

const INITIAL_MESSAGE: Message = {
  id: "welcome-1",
  role: "assistant",
  content: `Hello! I am the **PK IT AI Assistant**. How can I assist you with our enterprise AI solutions, custom software development, or cloud architecture today?`,
  actions: [
    { label: "Explore AI Solutions", url: "/services#ai-solutions" },
    { label: "Book Free Consultation", url: "/contact" },
  ],
  timestamp: "Just now",
};

const SUGGESTED_PROMPTS = [
  "What AI solutions do you provide?",
  "How does your senior-engineer model work?",
  "Can you build a mobile app?",
  "How do I book a consultation?",
];

export default function Chatbot() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastFailedInput, setLastFailedInput] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 100);
    }
  }, [isOpen, messages, loading]);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Hide chatbot on admin dashboard or document print/preview pages
  if (pathname?.startsWith("/admin") || pathname?.includes("/preview")) {
    return null;
  }

  const sendMessage = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || loading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setLastFailedInput(null);

    // Prepare history payload (last 6 messages)
    const historyPayload = messages.slice(-6).map((m) => ({
      role: m.role,
      content: m.content,
    }));

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: historyPayload,
        }),
      });

      const data = await res.json();

      if (data.success && data.message) {
        const botMessage: Message = {
          id: `bot-${Date.now()}`,
          role: "assistant",
          content: data.message,
          actions: data.actions || [],
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        setLastFailedInput(text);
        const errorMessage: Message = {
          id: `err-${Date.now()}`,
          role: "assistant",
          content: data.message || "We encountered a temporary network delay. Please retry your message or reach out via our contact page.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isError: true,
          actions: [{ label: "Contact Us Directly", url: "/contact" }],
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch {
      setLastFailedInput(text);
      const networkErrorMessage: Message = {
        id: `net-err-${Date.now()}`,
        role: "assistant",
        content: "Unable to connect to the assistant server right now. Please check your connection or contact our team directly.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isError: true,
        actions: [{ label: "Go to Contact Page", url: "/contact" }],
      };
      setMessages((prev) => [...prev, networkErrorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleReset = () => {
    setMessages([INITIAL_MESSAGE]);
    setLastFailedInput(null);
  };

  return (
    <>
      {/* ─── Floating Launcher Button ──────────────────────────────────── */}
      <div className="fixed bottom-5 right-5 z-50 select-none print:hidden">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open PK IT AI Assistant"
            className="group relative flex items-center gap-2.5 bg-[#08111F] hover:bg-[#0A2540] text-white px-4 py-3 rounded-full border border-[#2563EB]/50 shadow-2xl shadow-blue-900/40 hover:shadow-blue-600/30 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
          >
            {/* Pulsing indicator ring */}
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2563EB] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#2563EB]"></span>
            </span>

            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-[#C89B3C]" />
              <span className="text-xs font-bold tracking-wide font-display">Ask PK IT AI</span>
            </div>
          </button>
        )}
      </div>

      {/* ─── Chat Panel / Dialog ────────────────────────────────────────── */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="PK IT AI Assistant"
          aria-modal="true"
          className="fixed bottom-5 right-5 z-50 w-[92vw] sm:w-[410px] h-[580px] max-h-[85vh] bg-[#08111F] border border-[#1E293B] shadow-2xl shadow-black/80 rounded-2xl flex flex-col overflow-hidden font-sans backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-200"
        >
          {/* Header */}
          <div className="bg-[#0A2540] px-4 py-3.5 border-b border-[#1E293B] flex items-center justify-between text-white select-none">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <Bot size={18} />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-bold text-slate-100 font-display tracking-tight">
                    PK IT AI Assistant
                  </h3>
                  <span className="text-[9px] font-semibold bg-[#2563EB]/20 text-[#38BDF8] border border-[#2563EB]/40 px-1.5 py-0.2 rounded-full">
                    Online
                  </span>
                </div>
                <p className="text-[10px] text-slate-400">Enterprise Technology Guide</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleReset}
                title="Reset conversation"
                className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Reset conversation"
              >
                <RotateCcw size={14} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Close chat"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-[#08111F] to-[#0B1528] text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 rounded-full bg-[#0A2540] border border-[#2563EB]/40 flex-shrink-0 flex items-center justify-center text-[#38BDF8] mt-0.5">
                    <Bot size={13} />
                  </div>
                )}

                <div
                  className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 leading-relaxed shadow-sm ${
                    msg.role === "user"
                      ? "bg-[#2563EB] text-white rounded-br-none"
                      : msg.isError
                      ? "bg-rose-950/40 border border-rose-800/60 text-rose-200 rounded-bl-none"
                      : "bg-[#111C30] border border-[#1E293B] text-slate-200 rounded-bl-none"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>

                  {/* Actions / CTA Links */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-[#1E293B]/70 flex flex-wrap gap-1.5">
                      {msg.actions.map((act, i) => (
                        <Link
                          key={i}
                          href={act.url}
                          onClick={() => {
                            if (!act.url.startsWith("http")) {
                              setIsOpen(false);
                            }
                          }}
                          className="inline-flex items-center gap-1 text-[10.5px] font-semibold bg-[#2563EB]/20 hover:bg-[#2563EB] text-[#60A5FA] hover:text-white border border-[#2563EB]/40 px-2.5 py-1 rounded-lg transition-colors duration-150"
                        >
                          <span>{act.label}</span>
                          <ArrowRight size={10} />
                        </Link>
                      ))}
                    </div>
                  )}

                  <span
                    className={`block text-[9px] mt-1.5 ${
                      msg.role === "user" ? "text-blue-200 text-right" : "text-slate-500"
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>

                {msg.role === "user" && (
                  <div className="w-7 h-7 rounded-full bg-[#1E293B] flex-shrink-0 flex items-center justify-center text-slate-300 mt-0.5">
                    <User size={13} />
                  </div>
                )}
              </div>
            ))}

            {/* Loading Indicator */}
            {loading && (
              <div className="flex gap-2.5 items-center text-slate-400">
                <div className="w-7 h-7 rounded-full bg-[#0A2540] border border-[#2563EB]/40 flex-shrink-0 flex items-center justify-center text-[#38BDF8]">
                  <Bot size={13} />
                </div>
                <div className="bg-[#111C30] border border-[#1E293B] rounded-2xl rounded-bl-none px-3.5 py-2.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-bounce"></span>
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></span>
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></span>
                  <span className="text-[10px] text-slate-400 ml-1">Analyzing enquiry...</span>
                </div>
              </div>
            )}

            {/* Error retry button */}
            {lastFailedInput && (
              <div className="flex items-center justify-center pt-1">
                <button
                  onClick={() => sendMessage(lastFailedInput)}
                  className="inline-flex items-center gap-1.5 text-[11px] text-amber-400 hover:text-amber-300 bg-amber-950/30 border border-amber-800/40 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <AlertCircle size={12} />
                  Retry previous query
                </button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts (visible if conversation is short) */}
          {messages.length <= 2 && (
            <div className="px-3 py-2 bg-[#091322] border-t border-[#1E293B]/60 flex gap-1.5 overflow-x-auto no-scrollbar">
              {SUGGESTED_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => sendMessage(prompt)}
                  disabled={loading}
                  className="text-[10px] whitespace-nowrap bg-[#111C30] hover:bg-[#1A2942] text-slate-300 border border-[#1E293B] px-2.5 py-1 rounded-full transition-colors duration-150 flex-shrink-0 disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <div className="p-3 bg-[#0A1628] border-t border-[#1E293B]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="relative flex items-center"
            >
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about AI, custom software, or cloud..."
                rows={1}
                maxLength={500}
                disabled={loading}
                className="w-full bg-[#08111F] text-slate-100 placeholder-slate-500 text-xs rounded-xl pl-3.5 pr-10 py-2.5 border border-[#1E293B] focus:border-[#2563EB] focus:outline-none resize-none transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                aria-label="Send message"
                className="absolute right-2 text-white bg-[#2563EB] hover:bg-blue-600 disabled:opacity-40 disabled:hover:bg-[#2563EB] p-1.5 rounded-lg transition-colors flex items-center justify-center"
              >
                <Send size={13} />
              </button>
            </form>

            {/* Privacy & Transparency Notice */}
            <div className="flex items-center justify-between text-[9px] text-slate-500 mt-2 px-1 select-none">
              <span className="flex items-center gap-1">
                <ShieldCheck size={11} className="text-emerald-500" />
                Interacting with PK IT AI Assistant
              </span>
              <span>{COMPANY.name}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
