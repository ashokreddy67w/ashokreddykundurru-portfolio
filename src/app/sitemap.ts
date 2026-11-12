import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { projects } from "@/lib/projects";
import { posts } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/emas",
    "/projects",
    "/freelance",
    "/lab",
    "/blog",
    "/about",
    "/contact",
    ...projects.filter((p) => p.slug !== "emas-attendance").map((p) => `/projects/${p.slug}`),
    // Drafts are noindex (see blog/[slug]), so they stay out of the sitemap until published.
    ...posts.filter((p) => !p.sample).map((p) => `/blog/${p.slug}`),
  ];
  return paths.map((p) => ({ url: `${site.url}${p}` }));
}
