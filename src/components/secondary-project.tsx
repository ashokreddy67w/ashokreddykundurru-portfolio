import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/lib/projects";

// A compact row for supporting projects, so the flagship work stays in front.
export function SecondaryProject({ p }: { p: Project }) {
  const shot = p.shots[0];
  return (
    <Link href={`/projects/${p.slug}`} className="group border-border grid items-center gap-6 border-y py-8 sm:grid-cols-[200px_1fr_auto]" data-cursor="Open">
      <Image src={shot.src} alt={shot.alt} width={400} height={225} className="border-border rounded-md border" sizes="200px" />
      <div>
        <p className="text-muted font-mono text-[11px] tracking-[0.15em] uppercase">
          Also · {p.when} · {p.role}
        </p>
        <h3 className="group-hover:text-accent mt-2 text-3xl font-medium tracking-tight transition">{p.name}</h3>
        <p className="text-muted mt-1">{p.oneLine}.</p>
      </div>
      <span className="text-muted group-hover:text-accent font-mono text-xs tracking-[0.12em] uppercase">Case study →</span>
    </Link>
  );
}
