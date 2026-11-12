import { socials } from "@/lib/social";
import { SocialIcon } from "@/components/social-icons";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

// Compact icon row (footer). Primary profiles first, each with an accessible name.
export function SocialRow({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center gap-2 ${className}`} aria-label="Social profiles">
      {socials.map((s) => (
        <li key={s.key}>
          <a
            href={s.href}
            {...ext}
            aria-label={`${s.label} (opens in a new tab)`}
            title={s.label}
            className={`hover:border-accent hover:text-accent focus-visible:border-accent focus-visible:text-accent grid size-11 place-items-center rounded-full border transition duration-300 hover:-translate-y-0.5 ${s.primary ? "border-fg/30 text-fg" : "border-border text-muted"}`}
          >
            <SocialIcon name={s.key} className="size-[18px]" />
          </a>
        </li>
      ))}
    </ul>
  );
}

// Full list with handles (contact page): primary profiles large, secondary ones smaller.
export function SocialList() {
  const primary = socials.filter((s) => s.primary);
  const secondary = socials.filter((s) => !s.primary);
  return (
    <div>
      <ul className="border-border border-t">
        {primary.map((s) => (
          <li key={s.key} className="border-border border-b">
            <a href={s.href} {...ext} className="group hover:text-accent focus-visible:text-accent flex items-center gap-5 py-6 transition">
              <SocialIcon name={s.key} className="size-6" />
              <span className="flex-1">
                <span className="block text-2xl font-medium tracking-tight">{s.label}</span>
                <span className="text-muted block font-mono text-xs tracking-wider">{s.handle}</span>
              </span>
              <span className="text-muted group-hover:text-accent font-mono text-xs tracking-[0.12em] uppercase transition group-hover:translate-x-1">
                Open ↗<span className="sr-only"> {s.label} in a new tab</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
      <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
        {secondary.map((s) => (
          <li key={s.key}>
            <a href={s.href} {...ext} className="link-u text-muted hover:text-fg focus-visible:text-fg inline-flex items-center gap-2 py-1">
              <SocialIcon name={s.key} className="size-4" />
              {s.label}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
