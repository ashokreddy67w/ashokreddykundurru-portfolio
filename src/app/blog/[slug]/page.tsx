import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui";
import { getPost, posts } from "@/lib/posts";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const p = getPost((await params).slug);
  return p ? pageMetadata(p.title, p.summary, `/blog/${p.slug}`, "article", !p.sample) : {};
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();
  const { default: Content } = await import(`@/content/blog/${slug}.mdx`);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    description: p.summary,
    url: `${site.url}/blog/${p.slug}`,
    mainEntityOfPage: `${site.url}/blog/${p.slug}`,
    image: `${site.url}/opengraph-image`,
    author: { "@type": "Person", "@id": `${site.url}/#person`, name: site.name, url: site.url },
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Container className="pt-36 pb-16 sm:pt-44">
        <Link href="/blog" className="link-u text-muted hover:text-fg font-mono text-xs tracking-[0.15em] uppercase">
          ← All notes
        </Link>
        <p className="text-accent mt-12 font-mono text-xs tracking-[0.15em] uppercase">{p.category}</p>
        <h1 className="display mt-6 max-w-[18ch] text-5xl sm:text-7xl">{p.title}</h1>
        <p className="text-muted mt-5">By {site.name}</p>
        {p.sample && (
          <p className="border-border text-muted mt-8 inline-block border px-4 py-2 font-mono text-xs tracking-[0.15em] uppercase">
            Draft · still being written
          </p>
        )}
      </Container>
      <Container className="pb-24">
        <div className="prose-article max-w-2xl lg:ml-[33%]">
          <Content />
        </div>
      </Container>
    </article>
  );
}
