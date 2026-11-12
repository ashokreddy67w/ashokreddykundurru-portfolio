"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { tokenize } from "@/lib/highlight";

export function CodeBlock({ code, lang, title }: { code: string; lang: string; title?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };
  return (
    <div className="border-border bg-code my-6 overflow-hidden rounded-md border">
      <div className="border-border flex items-center justify-between border-b px-4 py-2">
        <span className="text-muted font-mono text-xs">{title ?? lang}</span>
        <button onClick={copy} className="text-muted hover:text-fg flex items-center gap-1.5 rounded px-2 py-1 text-xs" aria-label="Copy code">
          {copied ? <Check className="text-accent size-3.5" /> : <Copy className="size-3.5" />}
          <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed">
        <code>
          {tokenize(code, lang).map((t, i) =>
            t.kind === "plain" ? (
              t.text
            ) : (
              <span key={i} className={`tok-${t.kind}`}>
                {t.text}
              </span>
            ),
          )}
        </code>
      </pre>
    </div>
  );
}
