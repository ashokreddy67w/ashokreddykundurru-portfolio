"use client";

import { useState } from "react";

// The decision rule behind the AI support agent, simplified: combine evidence, then either
// answer, or ask for a better photo. Runs locally; no model is called.
export function decide(ocr: number, visual: number, threshold: number) {
  const score = 0.55 * ocr + 0.45 * visual;
  if (score >= threshold) return { score, verdict: "answer" as const };
  return { score, verdict: (ocr < visual ? "label" : "angle") as "label" | "angle" };
}

export function ConfidenceDemo() {
  const [ocr, setOcr] = useState(62);
  const [visual, setVisual] = useState(81);
  const [threshold, setThreshold] = useState(75);
  const { score, verdict } = decide(ocr, visual, threshold);

  const slider = (label: string, hint: string, v: number, set: (n: number) => void) => (
    <label className="block">
      <span className="text-muted flex justify-between font-mono text-xs tracking-wider uppercase">
        {label} <span className="text-fg">{v}%</span>
      </span>
      <input
        type="range"
        min={0}
        max={100}
        value={v}
        onChange={(e) => set(+e.target.value)}
        className="mt-3 w-full accent-[var(--accent)]"
        aria-describedby={`${label}-hint`}
      />
      <span id={`${label}-hint`} className="text-muted mt-1 block text-xs">
        {hint}
      </span>
    </label>
  );

  return (
    <div className="border-border bg-surface grid gap-10 rounded-md border p-6 sm:p-10 lg:grid-cols-2">
      <div className="space-y-7">
        {slider("label text", "How much of the label OCR could read and match", ocr, setOcr)}
        {slider("visual match", "Image-embedding similarity to the closest catalogue product", visual, setVisual)}
        {slider("threshold", "How sure the agent must be before answering", threshold, setThreshold)}
      </div>
      <div className="flex flex-col justify-between" aria-live="polite">
        <div>
          <p className="text-muted font-mono text-xs tracking-wider uppercase">combined confidence</p>
          <p className="display mt-2 text-8xl tabular-nums">{Math.round(score)}</p>
          <div className="bg-border mt-4 h-1 w-full">
            <div className="bg-accent h-full transition-[width] duration-300" style={{ width: `${score}%` }} />
          </div>
        </div>
        <p className="mt-8 text-xl leading-snug">
          {verdict === "answer" ? (
            <>
              <span className="text-accent">Answer.</span> The evidence agrees, so the agent names the product.
            </>
          ) : verdict === "label" ? (
            <>
              <span className="serif text-accent">Not sure yet.</span> &ldquo;Could you take a closer photo of the label or model sticker?&rdquo;
            </>
          ) : (
            <>
              <span className="serif text-accent">Not sure yet.</span> &ldquo;Could you take a photo from the front, showing the whole product?&rdquo;
            </>
          )}
        </p>
      </div>
    </div>
  );
}
