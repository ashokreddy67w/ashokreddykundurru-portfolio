"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, MessageCircle, X } from "lucide-react";
import { reply, starterChips, type Reply } from "@/lib/assistant";

type Msg = { from: "bot" | "you"; reply: Reply };

function Links({ links }: { links: NonNullable<Reply["links"]> }) {
  return (
    <span className="mt-3 flex flex-wrap gap-2">
      {links.map((l) =>
        l.href.startsWith("/") ? (
          <Link key={l.href} href={l.href} className="border-border hover:border-accent hover:text-accent rounded-full border px-3 py-1 text-xs transition">
            {l.label} →
          </Link>
        ) : (
          <a
            key={l.href}
            href={l.href}
            target={l.href.startsWith("mailto:") ? undefined : "_blank"}
            rel="noopener noreferrer"
            className="border-border hover:border-accent hover:text-accent rounded-full border px-3 py-1 text-xs transition"
          >
            {l.label} ↗
          </a>
        ),
      )}
    </span>
  );
}

// Answers come only from this site's data (lib/assistant.ts). No AI service, nothing is sent anywhere.
export function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLOListElement>(null);

  useEffect(() => {
    if (!open) return;
    input.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    list.current?.scrollTo({ top: list.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing]);

  const ask = (q: string) => {
    const question = q.trim().slice(0, 300);
    if (!question || typing) return;
    setMsgs((m) => [...m, { from: "you", reply: { text: question } }]);
    setText("");
    setTyping(true);
    // A short pause so the answer reads as a reply rather than a flash.
    setTimeout(() => {
      setMsgs((m) => [...m, { from: "bot", reply: reply(question) }]);
      setTyping(false);
    }, 350);
  };

  const lastChips = [...msgs].reverse().find((m) => m.from === "bot")?.reply.chips;

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Ashok Reddy Kundurru's site assistant"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="border-border bg-surface fixed right-4 bottom-24 z-[55] flex h-[min(560px,calc(100svh-8rem))] w-[min(390px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border shadow-2xl shadow-black/70 sm:right-6"
          >
            <div className="border-border flex items-center justify-between gap-3 border-b px-5 py-4">
              <div>
                <p className="flex flex-wrap items-center gap-2 font-medium">
                  Ask about Ashok Reddy Kundurru
                  <span className="border-accent/40 text-accent rounded-full border px-2 py-0.5 font-mono text-[10px] tracking-wider uppercase">
                    RAG AI · coming soon
                  </span>
                </p>
                <p className="text-muted font-mono text-[11px] tracking-wider uppercase">Today: answers from this site · not AI</p>
              </div>
              <button
                onClick={() => {
                  setOpen(false);
                  button.current?.focus();
                }}
                aria-label="Close assistant"
                className="border-border hover:border-accent hover:text-accent grid size-9 shrink-0 place-items-center rounded-full border transition"
              >
                <X className="size-4" />
              </button>
            </div>

            {msgs.length === 0 && (
              <div className="flex flex-1 flex-col justify-end px-5 pb-2">
                <p className="text-2xl font-medium tracking-tight">How can I help?</p>
                <p className="text-muted mt-2 text-sm">Questions about Ashok Reddy Kundurru, EMAS, his projects or working together.</p>
                <div className="mt-6 flex flex-col items-start gap-2">
                  {starterChips.map((c) => (
                    <button
                      key={c}
                      onClick={() => ask(c)}
                      className="border-border hover:border-accent hover:text-accent rounded-full border px-4 py-2 text-left text-sm transition"
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <ol ref={list} className={`${msgs.length === 0 ? "hidden" : "flex-1"} space-y-4 overflow-y-auto px-5 py-5`} aria-live="polite">
              {msgs.map((m, i) => (
                <li key={i} className={m.from === "you" ? "flex justify-end" : ""}>
                  <div
                    className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${m.from === "you" ? "bg-accent text-accent-fg" : "border-border bg-bg text-fg border"}`}
                  >
                    <span className="sr-only">{m.from === "you" ? "You said: " : "Assistant: "}</span>
                    {m.reply.text}
                    {m.reply.links && <Links links={m.reply.links} />}
                  </div>
                </li>
              ))}
              {typing && (
                <li className="text-muted font-mono text-xs" aria-label="Assistant is typing">
                  <span className="animate-pulse">● ● ●</span>
                </li>
              )}
            </ol>

            {lastChips && !typing && (
              <div className="border-border flex flex-wrap gap-2 border-t px-5 pt-3">
                {lastChips.map((c) => (
                  <button key={c} onClick={() => ask(c)} className="bg-bg text-muted hover:text-accent rounded-full px-3 py-1.5 text-xs transition">
                    {c}
                  </button>
                ))}
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                ask(text);
              }}
              className="flex items-center gap-2 p-4"
            >
              <label htmlFor="assistant-input" className="sr-only">
                Your question
              </label>
              <input
                id="assistant-input"
                ref={input}
                value={text}
                onChange={(e) => setText(e.target.value)}
                maxLength={300}
                autoComplete="off"
                placeholder="Ask a question…"
                className="border-border bg-bg focus:border-accent min-w-0 flex-1 rounded-full border px-4 py-2.5 text-sm transition outline-none"
              />
              <button
                type="submit"
                disabled={!text.trim() || typing}
                aria-label="Send"
                className="bg-accent text-accent-fg grid size-10 shrink-0 place-items-center rounded-full transition disabled:opacity-30"
              >
                <ArrowUp className="size-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        ref={button}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? "Close assistant" : "Open site assistant"}
        title={open ? "Close" : "Questions about Ashok Reddy Kundurru"}
        className="group hover:border-accent/50 focus-visible:border-accent fixed right-4 bottom-6 z-[55] grid size-12 place-items-center rounded-full border border-white/10 bg-white/[0.06] shadow-lg shadow-black/40 backdrop-blur-xl transition duration-300 hover:scale-105 hover:shadow-[0_0_24px_rgba(200,255,62,0.2)] sm:right-6"
      >
        {open ? (
          <X className="text-fg/80 group-hover:text-accent size-[18px] transition" strokeWidth={1.75} />
        ) : (
          <MessageCircle className="text-fg/80 group-hover:text-accent size-[18px] transition" strokeWidth={1.75} />
        )}
      </button>
    </>
  );
}
