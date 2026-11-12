import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { Container, PageHero } from "@/components/ui";
import { categories, posts } from "@/lib/posts";

export const metadata = pageMetadata(
  "Writing",
  "Engineering notes on Java, Spring Boot, full-stack work, databases, AI, system design and building a SaaS product.",
  "/blog",
);

export default function BlogPage() {
  return (
    <>
      <PageHero label="Writing" title="Notes" lead={<p>What I learn while building, written down so I remember it and so it might help you.</p>} />
      <Container className="pb-24">
        <ul className="border-border border-t">
          {posts.map((p, i) => (
            <li key={p.slug} className="border-border border-b">
              <Link href={`/blog/${p.slug}`} className="group grid gap-3 py-10 sm:grid-cols-[4rem_1fr_auto] sm:items-baseline" data-cursor="Read">
                <span className="text-muted font-mono text-xs">0{i + 1}</span>
                <span>
                  <span className="group-hover:text-accent block text-3xl font-medium tracking-tight transition group-hover:translate-x-2 sm:text-5xl">
                    {p.title}
                  </span>
                  <span className="text-muted mt-3 block">{p.summary}</span>
                </span>
                <span className="text-muted font-mono text-xs tracking-[0.15em] uppercase">
                  {p.category}
                  {p.sample && " · Draft"}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="text-muted mt-16 max-w-3xl font-mono text-xs leading-loose tracking-[0.15em] uppercase">Coming up: {categories.join(" · ")}</p>
      </Container>
    </>
  );
}
