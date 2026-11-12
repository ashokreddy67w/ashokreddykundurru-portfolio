// Keyword intent matching for the site assistant. No imports, so it can be unit tested directly.
export type Intent = { id: string; keywords: string[] };

export function normalise(text: string) {
  return ` ${text
    .toLowerCase()
    .replace(/[^a-z0-9@.+#\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()} `;
}

// Picks the intent with the most keyword hits; multi-word keywords count double. Ties go to the earlier intent.
export function matchIntent(text: string, intents: Intent[]): string | null {
  const t = normalise(text);
  let best: string | null = null;
  let bestScore = 0;
  for (const intent of intents) {
    let score = 0;
    for (const k of intent.keywords) if (t.includes(` ${k} `) || (k.length > 4 && t.includes(k))) score += k.includes(" ") ? 2 : 1;
    if (score > bestScore) {
      best = intent.id;
      bestScore = score;
    }
  }
  return best;
}
