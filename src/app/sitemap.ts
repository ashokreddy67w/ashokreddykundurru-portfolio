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
    ...posts.map((p) => `/blog/${p.slug}`),
  ];
  return paths.map((p) => ({ url: `${site.url}${p}` }));
}
