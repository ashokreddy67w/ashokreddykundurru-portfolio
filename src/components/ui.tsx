import Link from "next/link";
import { RevealText } from "@/components/reveal";

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1400px] px-5 sm:px-8 ${className}`}>{children}</div>;
}

// "(03) Selected work" style label used to open every section.
export function Label({ n, children }: { n?: string; children: React.ReactNode }) {
  return (
    <p className="text-muted flex items-center gap-3 font-mono text-xs tracking-[0.2em] uppercase">
      {n && <span className="text-accent">({n})</span>}
      {children}
    </p>
  );
}

export function PageHero({ label, title, lead }: { label: string; title: string; lead?: React.ReactNode }) {
  return (
    <Container className="pt-36 pb-16 sm:pt-44 sm:pb-24">
      <Label>{label}</Label>
      <RevealText as="h1" onLoad text={title} className="display mt-8 text-[13vw] sm:text-[9vw] lg:text-[8rem]" />
      {lead && <div className="text-muted mt-10 max-w-2xl text-lg leading-relaxed text-pretty sm:ml-[20%] sm:text-xl">{lead}</div>}
    </Container>
  );
}

export function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="link-u text-fg">
      {children}
    </Link>
  );
}

export function ArrowLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="group inline-flex items-center gap-3 font-mono text-xs tracking-[0.2em] uppercase">
      <span className="link-u">{children}</span>
      <span className="border-border group-hover:border-accent group-hover:bg-accent group-hover:text-accent-fg grid size-9 place-items-center rounded-full border transition">
        →
      </span>
    </Link>
  );
}

export function Tag({ children }: { children: React.ReactNode }) {
  return <span className="border-border text-muted rounded-full border px-3 py-1 font-mono text-[11px] tracking-wider uppercase">{children}</span>;
}

export function ExtLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="link-u">
      {children} ↗
    </a>
  );
}
