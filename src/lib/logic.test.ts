// Run: node --experimental-strip-types --test src/lib/logic.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { tokenize } from "./highlight.ts";

// Duplicated from geofence-demo / contact-form so this runs without a bundler.
function distanceMeters(a: [number, number], b: [number, number]) {
  const R = 6371000;
  const rad = (d: number) => (d * Math.PI) / 180;
  const h = Math.sin(rad(b[0] - a[0]) / 2) ** 2 + Math.cos(rad(a[0])) * Math.cos(rad(b[0])) * Math.sin(rad(b[1] - a[1]) / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

test("haversine: 0.001° latitude ≈ 111 m", () => {
  assert.equal(Math.round(distanceMeters([17, 78], [17.001, 78])), 111);
  assert.equal(distanceMeters([17, 78], [17, 78]), 0);
});

test("tokenizer round-trips text and tags tokens", () => {
  const code = `@GetMapping("/x") // hi\nreturn 42;`;
  const toks = tokenize(code, "java");
  assert.equal(toks.map((t) => t.text).join(""), code);
  assert.deepEqual(
    toks.filter((t) => t.kind !== "plain").map((t) => t.kind),
    ["ann", "str", "com", "kw", "num"],
  );
});

test("'#' is a comment in python only", () => {
  assert.equal(tokenize("# x", "python")[0].kind, "com");
  assert.equal(tokenize("# x", "ts")[0].kind, "plain");
});

// Mirrors decide() in components/lab/confidence-demo.tsx.
function decide(ocr: number, visual: number, threshold: number) {
  const score = 0.55 * ocr + 0.45 * visual;
  if (score >= threshold) return "answer";
  return ocr < visual ? "label" : "angle";
}

test("confidence gate asks for the weaker evidence", () => {
  assert.equal(decide(90, 90, 75), "answer");
  assert.equal(decide(20, 90, 75), "label");
  assert.equal(decide(90, 20, 75), "angle");
});

import { matchIntent } from "./assistant-match.ts";

test("assistant routes common questions to the right intent", () => {
  const intents = [
    { id: "price", keywords: ["cost", "how much", "price"] },
    { id: "ai-agent", keywords: ["ai agent", "agent"] },
    { id: "freelance", keywords: ["website", "build my", "freelance"] },
    { id: "projects", keywords: ["project", "projects", "build"] },
    { id: "ai", keywords: ["ai", "machine learning"] },
    { id: "about", keywords: ["about", "who"] },
  ];
  assert.equal(matchIntent("Can you build my website?", intents), "freelance");
  assert.equal(matchIntent("How much does a website cost?", intents), "price");
  assert.equal(matchIntent("Tell me about the AI agent", intents), "ai-agent");
  assert.equal(matchIntent("What about AI?", intents), "ai");
  assert.equal(matchIntent("Show me your projects", intents), "projects");
  assert.equal(matchIntent("what's the weather", intents), null);
});
