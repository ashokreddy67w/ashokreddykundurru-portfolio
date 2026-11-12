import { clientSites } from "@/lib/projects";
import { BrowserFrame } from "@/components/browser-frame";
import { FadeIn } from "@/components/reveal";

// Staggered two-column gallery of live client websites; every card links to the real site.
export function ClientSites({ limit }: { limit?: number }) {
  const sites = limit ? clientSites.slice(0, limit) : clientSites;
  return (
    <ul className="grid gap-x-10 gap-y-20 md:grid-cols-2">
      {sites.map((s, i) => (
        <li key={s.href} className={i % 2 === 1 ? "md:mt-32" : ""}>
          <FadeIn>
            <a href={s.href} target="_blank" rel="noopener noreferrer" className="group block" data-cursor="Visit">
              <BrowserFrame
                src={s.shot}
                alt={`${s.name} website`}
                width={1440}
                height={900}
                label={s.href.replace(/^https:\/\/(www\.)?/, "").replace(/\/$/, "")}
                sizes="(min-width: 768px) 45vw, 100vw"
              />
              <div className="mt-6 flex items-start justify-between gap-6">
                <div>
                  <p className="text-muted font-mono text-[11px] tracking-[0.15em] uppercase">
                    {s.kind} · {s.place}
                  </p>
                  <h3 className="group-hover:text-accent mt-2 text-2xl font-medium tracking-tight transition sm:text-3xl">{s.name}</h3>
                  <p className="text-muted mt-2">{s.summary}</p>
                  <p className="text-muted mt-3 font-mono text-[11px] tracking-wider uppercase">{s.stack.join(" · ")}</p>
                </div>
                <span className="text-accent mt-1 shrink-0 font-mono text-xs tracking-[0.12em] whitespace-nowrap uppercase">
                  Visit live ↗<span className="sr-only"> (opens in a new tab)</span>
                </span>
              </div>
            </a>
          </FadeIn>
        </li>
      ))}
    </ul>
  );
}
