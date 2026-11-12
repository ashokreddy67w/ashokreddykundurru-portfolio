import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Label, Tag } from "@/components/ui";
import { Chapter } from "@/components/chapter";
import { FadeIn, RevealText } from "@/components/reveal";
import { BrowserFrame } from "@/components/browser-frame";
import { ProjectActions } from "@/components/project-actions";
import { AiWorkflow } from "@/components/lab/ai-workflow";
import { ConfidenceDemo } from "@/components/lab/confidence-demo";
import { AgentConceptVisual, ComingSoonBadge } from "@/components/coming-soon";
import { getProject, projects, type Plan } from "@/lib/projects";

// EMAS has its own case study at /emas (next.config.ts redirects the old URL).
const pages = projects.filter((p) => p.slug !== "emas-attendance");

export function generateStaticParams() {
  return pages.map((p) => ({ slug: p.slug }));
}
export const dynamicParams = false;

// Search results cut descriptions near 160 characters; end on a whole word instead of mid-word.
const clip = (s: string) => (s.length <= 160 ? s : `${s.slice(0, 157).replace(/\s+\S*$/, "")}…`);

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const p = getProject((await params).slug);
  return p ? pageMetadata(p.name, clip(`${p.oneLine}. ${p.intro}`), `/projects/${p.slug}`, "website") : {};
}

const stateLabel: Record<Plan["roadmap"][number]["state"], string> = { "in-progress": "In progress", next: "Next", later: "Later" };

// Sections only planned projects have: vision, use cases, architecture, workflow, roadmap and status.
function PlanSections({ plan }: { plan: Plan }) {
  return (
    <>
      <Chapter label="Product vision">
        <p className="text-fg max-w-2xl text-2xl leading-snug">{plan.vision}</p>
      </Chapter>

      <Chapter label="Use cases">
        <div className="grid gap-10 sm:grid-cols-2">
          {plan.useCases.map((u) => (
            <div key={u.title}>
              <h3 className="text-fg text-2xl font-medium tracking-tight">{u.title}</h3>
              <ul className="mt-4">
                {u.items.map((it) => (
                  <li key={it} className="border-border border-t py-3">
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Chapter>

      <Chapter label="Proposed architecture">
        <ol className="space-y-3">
          {plan.architecture.map((a, k) => (
            <li key={a.layer} className="border-border bg-surface grid gap-1 rounded-md border px-5 py-4 sm:grid-cols-[12rem_1fr] sm:gap-6">
              <span className="text-fg font-medium">
                <span className="text-teal mr-3 font-mono text-xs">{String(k + 1).padStart(2, "0")}</span>
                {a.layer}
              </span>
              <span>{a.detail}</span>
            </li>
          ))}
        </ol>
      </Chapter>

      <Chapter label="Planned agent workflow">
        <ol className="border-teal/40 relative ml-2 border-l">
          {plan.workflow.map((w) => {
            const [step, rest] = w.split(": ");
            return (
              <li key={w} className="relative pb-7 pl-8 last:pb-0">
                <span aria-hidden className="bg-teal absolute top-2 -left-[5px] size-2.5 rounded-full shadow-[0_0_10px_var(--teal)]" />
                <span className="text-fg font-medium">{step}</span>
                {rest && <span className="block">{rest}</span>}
              </li>
            );
          })}
        </ol>
      </Chapter>
    </>
  );
}

function RoadmapSections({ plan }: { plan: Plan }) {
  return (
    <>
      <Chapter label="Development roadmap">
        <ol>
          {plan.roadmap.map((r) => (
            <li key={r.phase} className="border-border flex flex-wrap items-baseline justify-between gap-4 border-t py-5 first:border-t-0 first:pt-0">
              <span>
                <span className="text-muted mr-4 font-mono text-xs uppercase">{r.phase}</span>
                <span className="text-fg">{r.items}</span>
              </span>
              <span className={`font-mono text-xs tracking-[0.15em] uppercase ${r.state === "in-progress" ? "text-teal" : ""}`}>{stateLabel[r.state]}</span>
            </li>
          ))}
        </ol>
      </Chapter>

      <Chapter label="Current status">
        <ComingSoonBadge />
        <p className="text-fg mt-6 max-w-2xl text-2xl leading-snug">{plan.current}</p>
        <p className="mt-4">No demo, public code or documentation yet. This page will be updated as phases ship.</p>
      </Chapter>
    </>
  );
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const p = getProject((await params).slug);
  if (!p) notFound();
  const i = projects.indexOf(p);
  const next = pages[(pages.indexOf(p) + 1) % pages.length];
  const [hero, ...rest] = p.shots;

  return (
    <>
      <Container className="pt-36 pb-12 sm:pt-44">
        {p.status && (
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <ComingSoonBadge />
            <span className="text-muted font-mono text-[11px] tracking-[0.15em] uppercase">Project in development</span>
          </div>
        )}
        <Label n={`0${i + 1}`}>{p.category ?? (p.tier === "secondary" ? `Secondary project · ${p.when}` : p.when)}</Label>
        <RevealText as="h1" onLoad text={p.name} className="display mt-8 max-w-[14ch] text-[13vw] sm:text-[8vw] lg:text-[7.5rem]" />
        <p className="text-muted mt-8 max-w-2xl text-xl leading-relaxed sm:ml-[20%]">{p.oneLine}.</p>
        <div className="border-border mt-12 grid gap-8 border-t pt-8 sm:grid-cols-3">
          <div>
            <p className="text-muted font-mono text-xs tracking-[0.15em] uppercase">Role</p>
            <p className="mt-2">{p.role}</p>
          </div>
          <div>
            <p className="text-muted font-mono text-xs tracking-[0.15em] uppercase">{p.status ? "Status" : "Timeline"}</p>
            <p className="mt-2">
              {p.when}
              {p.commits && <span className="text-muted block">{p.commits}</span>}
            </p>
          </div>
          <div>
            <p className="text-muted font-mono text-xs tracking-[0.15em] uppercase">{p.status ? "Planned stack" : "Stack"}</p>
            <p className="mt-2">{p.stack.slice(0, 4).join(", ")}</p>
          </div>
        </div>
        <div className="mt-10">
          <ProjectActions p={p} caseStudy={false} />
          {p.linkNote && <p className="text-muted mt-4 text-sm">{p.linkNote}</p>}
        </div>
      </Container>

      <Container className="pb-8">
        <FadeIn y={80}>
          {hero ? (
            <BrowserFrame src={hero.src} alt={hero.alt} width={hero.width} height={hero.height} label={hero.caption} priority sizes="100vw" />
          ) : (
            <AgentConceptVisual />
          )}
        </FadeIn>
      </Container>

      <Chapter n="01" label="Overview" title={p.intro} />

      <Chapter n="02" label={p.status ? "Problem statement" : "Problem solved"}>
        <p className="text-fg max-w-2xl text-2xl leading-snug">{p.problem}</p>
      </Chapter>

      {p.plan && <PlanSections plan={p.plan} />}

      <Chapter n="03" label={p.status ? "My role" : "My contribution"}>
        <ul>
          {p.contribution.map((d) => (
            <li key={d} className="border-border border-t py-4 first:border-t-0 first:pt-0">
              {d}
            </li>
          ))}
        </ul>
      </Chapter>

      <Chapter n="04" label={p.status ? "Planned capabilities" : "Features"}>
        {p.status && <p className="mb-6">These are planned capabilities, not finished features.</p>}
        <ul className="grid gap-x-10 sm:grid-cols-2">
          {p.features.map((f, k) => (
            <li key={f} className="border-border flex gap-4 border-t py-5">
              <span className="text-accent font-mono text-xs">{String(k + 1).padStart(2, "0")}</span>
              <span className="text-fg">{f}</span>
            </li>
          ))}
        </ul>
      </Chapter>

      {p.slug === "ai-support-agent" && (
        <>
          <Chapter
            n="05"
            label="How it works"
            title={
              <>
                Five steps from photo to <span className="serif text-accent">answer.</span>
              </>
            }
          >
            <div className="text-fg">
              <AiWorkflow />
            </div>
          </Chapter>
          <Chapter
            label="Uncertainty, playable"
            title={
              <>
                The part that says <span className="serif text-accent">&ldquo;not sure yet.&rdquo;</span>
              </>
            }
          >
            <p className="mb-10 max-w-2xl">The decision rule, simplified and running in your browser. No model is called here.</p>
            <ConfidenceDemo />
          </Chapter>
        </>
      )}

      {rest.length > 0 && (
        <Chapter label="Screenshots">
          <div className="space-y-12">
            {rest.map((s) => (
              <FadeIn key={s.src}>
                <BrowserFrame src={s.src} alt={s.alt} width={s.width} height={s.height} label={s.caption} />
              </FadeIn>
            ))}
          </div>
        </Chapter>
      )}

      <Chapter label={p.status ? "Planned technology stack" : "Technology stack"}>
        {p.status && <p className="mb-6">Planned technologies. This list will be confirmed as each part is built.</p>}
        <div className="flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>
      </Chapter>

      <Chapter label={p.status ? "Design principles" : "Development challenges"}>
        <div className="space-y-12">
          {p.challenges.map((d) => (
            <FadeIn key={d.title}>
              <h3 className="text-fg text-3xl font-medium tracking-tight">{d.title}</h3>
              <p className="mt-3 max-w-2xl">{d.body}</p>
            </FadeIn>
          ))}
        </div>
      </Chapter>

      {p.plan && <RoadmapSections plan={p.plan} />}

      {p.links.length > 0 && (
        <Chapter label="Live links">
          <ProjectActions p={p} caseStudy={false} />
        </Chapter>
      )}

      <Link href={`/projects/${next.slug}`} className="group border-border block border-t" data-cursor="Next">
        <Container className="py-20 sm:py-28">
          <p className="text-muted font-mono text-xs tracking-[0.15em] uppercase">Next project</p>
          <p className="display group-hover:text-accent mt-6 text-[10vw] transition group-hover:translate-x-4 sm:text-8xl">{next.name} →</p>
        </Container>
      </Link>
    </>
  );
}
