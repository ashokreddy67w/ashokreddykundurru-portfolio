import Link from "next/link";
import type { Project } from "@/lib/projects";

const base = "inline-flex items-center gap-2 rounded-full px-5 py-3 font-mono text-xs tracking-[0.12em] uppercase transition";

// The clear next steps for a project: live site, demo, case study, code.
export function ProjectActions({ p, caseStudy = true }: { p: Project; caseStudy?: boolean }) {
  const href = p.slug === "emas-attendance" ? "/emas" : `/projects/${p.slug}`;
  return (
    <div className="flex flex-wrap gap-3">
      {p.links.map((l, i) => (
        <a
          key={l.href}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${base} ${i === 0 && l.kind !== "github" ? "bg-accent text-accent-fg hover:opacity-90" : "border-border hover:border-fg border"}`}
        >
          {l.label} <span aria-hidden>↗</span>
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      ))}
      {caseStudy && (
        <Link href={href} className={`${base} border-border hover:border-accent hover:text-accent border`}>
          {p.status ? "View project overview" : "View case study"} <span aria-hidden>→</span>
        </Link>
      )}
    </div>
  );
}
