import type { MDXComponents } from "mdx/types";
import { isValidElement } from "react";
import { CodeBlock } from "@/components/code-block";

const components: MDXComponents = {
  // Fenced code arrives as <pre><code className="language-x">…</code></pre>.
  pre: ({ children }) => {
    if (isValidElement<{ className?: string; children?: string }>(children)) {
      const lang = children.props.className?.replace("language-", "") ?? "text";
      return <CodeBlock code={String(children.props.children ?? "").trimEnd()} lang={lang} />;
    }
    return <pre>{children}</pre>;
  },
};

export function useMDXComponents(): MDXComponents {
  return components;
}
