import Link from "next/link";
import { Container } from "@/components/ui";
import { SocialRow } from "@/components/social-links";
import { nav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-border border-t">
      <Container className="py-16">
        <Link href="/contact" className="group block" data-cursor="Say hi">
          <p className="text-muted font-mono text-xs tracking-[0.2em] uppercase">Have something to build?</p>
          <p className="display group-hover:text-accent mt-4 text-[14vw] transition-colors lg:text-[11rem]">
            Let&apos;s talk<span className="serif text-accent group-hover:text-fg">.</span>
          </p>
        </Link>
        <div className="border-border mt-16 flex flex-col gap-8 border-t pt-10 sm:flex-row sm:items-center sm:justify-between">
          <a href={`mailto:${site.email}`} className="link-u hover:text-accent focus-visible:text-accent text-lg break-all sm:text-xl">
            {site.email}
          </a>
          <SocialRow />
        </div>
        <div className="text-muted mt-10 flex flex-col gap-6 font-mono text-xs tracking-[0.15em] uppercase sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. Designed and built by me.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="link-u hover:text-fg">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
