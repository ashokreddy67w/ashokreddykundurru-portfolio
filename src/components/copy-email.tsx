"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { email } from "@/lib/social";

// Copies the address and says clearly whether it worked; falls back to showing it for manual copy.
export function CopyEmail({ className = "" }: { className?: string }) {
  const [state, setState] = useState<"idle" | "ok" | "fail">("idle");
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setState("ok");
    } catch {
      setState("fail");
    }
    setTimeout(() => setState("idle"), 2500);
  };
  return (
    <span className={`inline-flex flex-wrap items-center gap-3 ${className}`}>
      <button
        type="button"
        onClick={copy}
        className="border-border hover:border-accent hover:text-accent focus-visible:border-accent inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-xs tracking-[0.12em] uppercase transition"
      >
        {state === "ok" ? <Check className="text-accent size-3.5" aria-hidden /> : <Copy className="size-3.5" aria-hidden />}
        {state === "ok" ? "Copied" : "Copy email"}
      </button>
      <span role="status" aria-live="polite" className="text-sm">
        {state === "ok" && <span className="text-accent">Email copied to clipboard.</span>}
        {state === "fail" && <span className="text-red-400">Couldn&apos;t copy automatically. Select the address above instead.</span>}
      </span>
    </span>
  );
}
