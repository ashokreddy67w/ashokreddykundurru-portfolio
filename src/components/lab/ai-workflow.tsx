"use client";

import { useState } from "react";

// The AI support agent's pipeline, step by step. Outputs are illustrative examples, not live results.
const steps = [
  {
    key: "photo",
    title: "Photo in",
    what: "The customer uploads a picture or takes one with the camera, right in the browser.",
    out: `image: kettle_front.jpg\nsize: 1280×960\nsource: camera`,
  },
  {
    key: "ocr",
    title: "Read the label",
    what: "Tesseract OCR pulls any text it can find: brand names, model numbers, sticker codes.",
    out: `ocr.text: ["ACME", "KT-2", "220-240V"]\nocr.confidence: 0.58`,
  },
  {
    key: "embed",
    title: "Compare the look",
    what: "A CLIP model turns the photo into an embedding and searches a local vector store of catalogue products.",
    out: `nearest:\n  ACME KT-200   0.86\n  ACME KT-250   0.81\n  Brio Pour 1.7 0.62`,
  },
  {
    key: "verify",
    title: "Check the evidence",
    what: "Candidates are verified against both signals. A visual match with no supporting label text stays a guess.",
    out: `KT-200: visual ✓  label "KT-2" partial ✓\nKT-250: visual ✓  label ✗\ncombined confidence: 0.71`,
  },
  {
    key: "decide",
    title: "Answer or ask",
    what: "Above the threshold it names the product and checks for visible damage. Below it, it asks for the one photo that would settle it.",
    out: `threshold: 0.75 → not sure yet\nask: "Could you take a closer photo\n      of the model sticker underneath?"`,
  },
];

export function AiWorkflow() {
  const [active, setActive] = useState(0);
  const step = steps[active];
  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <ol className="lg:col-span-5" aria-label="AI support agent pipeline">
        {steps.map((s, i) => (
          <li key={s.key}>
            <button
              onClick={() => setActive(i)}
              aria-current={i === active ? "step" : undefined}
              className={`group border-border flex w-full items-baseline gap-5 border-t py-5 text-left transition ${i === active ? "text-fg" : "text-muted hover:text-fg"}`}
            >
              <span className={`font-mono text-xs ${i === active ? "text-accent" : ""}`}>0{i + 1}</span>
              <span className="text-2xl font-medium tracking-tight sm:text-3xl">{s.title}</span>
              {i === active && (
                <span className="text-accent ml-auto" aria-hidden>
                  →
                </span>
              )}
            </button>
          </li>
        ))}
      </ol>
      <div className="border-border bg-surface rounded-md border p-6 sm:p-8 lg:col-span-7" aria-live="polite">
        <p className="text-muted font-mono text-xs tracking-[0.15em] uppercase">
          Step 0{active + 1} of 0{steps.length}
        </p>
        <h3 className="mt-3 text-3xl font-medium tracking-tight">{step.title}</h3>
        <p className="text-muted mt-4 text-lg leading-relaxed">{step.what}</p>
        <pre className="bg-code text-accent mt-6 overflow-x-auto rounded-md p-5 font-mono text-sm leading-relaxed">{step.out}</pre>
        <p className="text-muted mt-3 font-mono text-[11px] tracking-wider uppercase">Illustrative output</p>
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => setActive(Math.max(0, active - 1))}
            disabled={active === 0}
            className="border-border rounded-full border px-4 py-2 font-mono text-xs uppercase disabled:opacity-30"
          >
            ← Prev
          </button>
          <button
            onClick={() => setActive(Math.min(steps.length - 1, active + 1))}
            disabled={active === steps.length - 1}
            className="border-border rounded-full border px-4 py-2 font-mono text-xs uppercase disabled:opacity-30"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
