import Link from "next/link";
import type { Project } from "@/lib/projects";
import { BrowserFrame } from "@/components/browser-frame";
import { ProjectActions } from "@/components/project-actions";
import { FadeIn } from "@/components/reveal";
import { AgentConceptVisual, ComingSoonBadge } from "@/components/coming-soon";

// Alternating, editorial project presentations: screenshot on one side, story and actions on the other.
export function ProjectShowcase({ items }: { items: Project[] }) {
  return (
    <ol className="space-y-28 sm:space-y-40">
      {items.map((p, i) => {
        const shot = p.shots[0];
        const flip = i % 2 === 1;
        return (
          <li key={p.slug} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <FadeIn y={60} className={`min-w-0 lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
              <Link
                href={p.slug === "emas-attendance" ? "/emas" : `/projects/${p.slug}`}
                data-cursor="Open"
                aria-label={`${p.name} ${p.status ? "overview" : "case study"}`}
              >
                {shot ? (
                  <BrowserFrame src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} label={shot.caption} />
                ) : (
                  <AgentConceptVisual compact />
                )}
              </Link>
            </FadeIn>
            <div className={`min-w-0 lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
              {p.status && (
                <div className="mb-5 flex flex-wrap items-center gap-3">
                  <ComingSoonBadge />
                  <span className="text-muted font-mono text-[11px] tracking-[0.15em] uppercase">Project in development</span>
                </div>
              )}
              <p className="text-muted font-mono text-xs tracking-[0.15em] uppercase">
                <span className="text-accent">0{i + 1}</span> · {p.category ?? p.when}
              </p>
              <h3 className="display mt-5 text-5xl text-balance sm:text-6xl">{p.name}</h3>
              <p className="text-muted mt-5 text-lg leading-relaxed">{p.oneLine}.</p>
              <ul className="text-muted mt-6 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] tracking-wider uppercase">
                {p.status && <li className="text-teal">Planned:</li>}
                {p.stack.slice(0, 5).map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <div className="mt-8">
                <ProjectActions p={p} />
              </div>
              {p.links.length === 0 && p.linkNote && <p className="text-muted mt-4 text-sm">{p.linkNote}</p>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
