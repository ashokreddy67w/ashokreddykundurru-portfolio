import { Bot, CheckCircle2, Mail, ShieldCheck, UserRound } from "lucide-react";

export function ComingSoonBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`border-teal/50 bg-teal/10 text-teal inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[11px] tracking-[0.15em] uppercase ${className}`}
    >
      <span className="bg-teal size-1.5 animate-pulse rounded-full motion-reduce:animate-none" aria-hidden />
      Coming soon
    </span>
  );
}

const steps = [
  { icon: UserRound, label: "Customer", sub: "Problem + photos" },
  { icon: Bot, label: "AI agent", sub: "Vision · RAG · draft" },
  { icon: ShieldCheck, label: "Approval", sub: "Customer says yes" },
  { icon: Mail, label: "Company", sub: "Email + follow-ups" },
  { icon: CheckCircle2, label: "Resolved", sub: "Confirmed by customer" },
];

// Concept illustration of the planned workflow. Deliberately not styled as an app screenshot.
export function AgentConceptVisual({ compact = false }: { compact?: boolean }) {
  return (
    <figure className="border-border bg-surface relative overflow-hidden rounded-lg border bg-[radial-gradient(70%_60%_at_50%_0%,rgba(46,230,200,0.12),transparent_70%),radial-gradient(50%_50%_at_90%_100%,rgba(200,255,62,0.08),transparent_70%)]">
      <div
        aria-hidden
        className="absolute inset-0 [background-image:linear-gradient(var(--fg)_1px,transparent_1px),linear-gradient(90deg,var(--fg)_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.07]"
      />
      <div className={`relative ${compact ? "p-6 sm:p-8" : "p-6 sm:p-12"}`}>
        <div className="flex items-center justify-between gap-4">
          <ComingSoonBadge />
          <span className="text-muted font-mono text-[11px] tracking-[0.15em] uppercase">Planned workflow</span>
        </div>

        <ol className="relative mt-10 grid gap-6 sm:mt-14 sm:grid-cols-5 sm:gap-3" aria-label="Planned support workflow">
          {/* connecting line with a travelling pulse (desktop) */}
          <span aria-hidden className="from-teal/40 via-accent/40 to-teal/40 absolute top-7 right-[10%] left-[10%] hidden h-px bg-gradient-to-r sm:block">
            <span className="flow-pulse bg-accent absolute -top-[3px] size-[7px] -translate-x-1/2 rounded-full shadow-[0_0_12px_var(--accent)]" />
          </span>
          {steps.map(({ icon: Icon, label, sub }, i) => (
            <li key={label} className="relative flex items-center gap-4 sm:flex-col sm:text-center">
              <span
                className={`bg-bg grid size-14 shrink-0 place-items-center rounded-2xl border ${i === 1 ? "border-accent/60 text-accent shadow-[0_0_28px_rgba(200,255,62,0.2)]" : "border-teal/40 text-teal"}`}
              >
                <Icon className="size-6" strokeWidth={1.5} aria-hidden />
              </span>
              <span>
                <span className="block font-medium">{label}</span>
                <span className="text-muted block text-xs">{sub}</span>
              </span>
            </li>
          ))}
        </ol>

        {!compact && (
          <div className="mt-12 grid gap-3 sm:grid-cols-3">
            {["Human escalation for complex cases", "Customer approves the first email", "Scheduled follow-ups until resolved"].map((t) => (
              <p key={t} className="border-border bg-bg/60 text-muted rounded-md border px-4 py-3 text-sm">
                {t}
              </p>
            ))}
          </div>
        )}
      </div>
      <figcaption className="border-border text-muted relative border-t px-6 py-3 font-mono text-[10px] tracking-[0.15em] uppercase sm:px-12">
        Concept illustration · not a product screenshot
      </figcaption>
    </figure>
  );
}
