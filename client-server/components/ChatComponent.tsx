"use client";

import { useState, useRef, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "./ui/sidebar";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  createConversation,
  getConversationMessages,
  sendChatMessage,
  Message,
} from "@/lib/api";

interface ChatComponentProps {
  activeThreadId: string | null;
  onConversationCreated: (threadId: string) => void;
}

export default function ChatComponent({
  activeThreadId,
  onConversationCreated,
}: ChatComponentProps) {
  const { user } = useUser();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  // Load history whenever the active conversation changes
  useEffect(() => {
    if (!activeThreadId) {
      setMessages([]);
      return;
    }
    getConversationMessages(activeThreadId).then(setMessages);
  }, [activeThreadId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || !user || loading) return;

    let threadId = activeThreadId;

    // No active conversation yet — create one on first message
    if (!threadId) {
      const conversation = await createConversation(user.id);
      threadId = conversation.thread_id;
      onConversationCreated(threadId);
    }

    const userMessage: Message = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const reply = await sendChatMessage(trimmed, threadId);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong reaching the planner. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <main className="font-mono-github flex h-screen flex-col bg-white text-[#212529]">
      {/* ================= HEADER ================= */}
      <header className="flex items-center gap-4 border-b border-gray-200 px-6 py-4">
        <SidebarTrigger className="text-[#6C757D] hover:bg-[#f1f3f5] hover:text-[#212529]" />
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-[#212529]">
            TripPilot
          </h1>
          <p className="font-mono text-xs text-[#6C757D]">
            Start Your Journey without worrying about the Plan
          </p>
        </div>
      </header>

      {/* ================= MESSAGES ================= */}
      <section className="flex-1 space-y-6 overflow-y-auto px-6 py-8">
        {messages.length === 0 && !loading && (
          <div className="flex h-full items-center justify-center text-sm text-[#6C757D]">
            Tell me where you'd like to go and I'll plan the trip.
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xl rounded-lg border px-4 py-3 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "border-[#007BFF] bg-[#007BFF] text-white"
                  : "border-gray-200 bg-[#f8f9fa] text-[#212529]"
              }`}
            >
              {msg.role === "assistant" ? (
                <div className="prose prose-sm max-w-none prose-p:my-2 prose-ul:my-2 prose-li:my-0.5">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {msg.content}
                  </ReactMarkdown>
                </div>
              ) : (
                <span className="whitespace-pre-wrap">{msg.content}</span>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="max-w-xl rounded-lg border border-gray-200 bg-[#f8f9fa] px-4 py-3 text-sm text-[#6C757D]">
              Thinking...
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </section>

      {/* ================= INPUT ================= */}
      <footer className="border-t border-gray-200 bg-white p-4">
        <div className="mx-auto flex max-w-4xl gap-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            placeholder="Ask TripPilot anything..."
            className="h-11 w-full border-gray-200 bg-white text-[#212529] placeholder:text-[#6C757D] focus-visible:border-[#007BFF] focus-visible:ring-[#007BFF]/20 shadow-none disabled:opacity-60"
          />

          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="h-11 rounded-sm bg-[#007BFF] px-5 font-semibold text-white transition-all duration-200 hover:bg-[#0069d9] shadow-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </footer>
    </main>
  );
}