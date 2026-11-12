// shortcut: regex tokenizer, good for short snippets; swap for shiki if posts need full grammar support.
const KEYWORDS = new Set(
  (
    "abstract async await boolean break case catch class const continue default do else enum export extends false final finally for from function if implements import interface let new null private protected public return static super switch this throw true try type typeof var void while " +
    "select from where join left inner on group by order having insert into values update set delete create table index primary key references not and or as limit count def return"
  ).split(" "),
);

export type Token = { text: string; kind: "plain" | "kw" | "str" | "com" | "num" | "ann" };

const RE = /(\/\/.*|#.*|--.*|\/\*[\s\S]*?\*\/)|("(?:\\.|[^"])*"|'(?:\\.|[^'])*'|`(?:\\.|[^`])*`)|(@\w+)|(\b\d+(?:\.\d+)?\b)|(\b[A-Za-z_]\w*\b)/g;

export function tokenize(code: string, lang: string): Token[] {
  const out: Token[] = [];
  let last = 0;
  for (const m of code.matchAll(RE)) {
    const i = m.index!;
    if (i > last) out.push({ text: code.slice(last, i), kind: "plain" });
    const [t, com, str, ann, num, word] = m;
    // '#' and '--' are comments only in shell/python/sql; elsewhere treat as plain text.
    const isCom =
      com && (com.startsWith("//") || com.startsWith("/*") || (com.startsWith("#") && /bash|python|py/.test(lang)) || (com.startsWith("--") && lang === "sql"));
    if (isCom) out.push({ text: t, kind: "com" });
    else if (com) out.push({ text: t, kind: "plain" });
    else if (str) out.push({ text: t, kind: "str" });
    else if (ann) out.push({ text: t, kind: lang === "json" ? "plain" : "ann" });
    else if (num) out.push({ text: t, kind: "num" });
    else out.push({ text: t, kind: word && KEYWORDS.has(lang === "sql" ? word.toLowerCase() : word) ? "kw" : "plain" });
    last = i + t.length;
  }
  if (last < code.length) out.push({ text: code.slice(last), kind: "plain" });
  return out;
}
