import type { Metadata } from "next";
import { site } from "@/lib/site";

// Spreading a page's own openGraph drops the root share image, so name it on every page.
const images = ["/opengraph-image"];

export function pageMetadata(title: string, description: string, path: string, type: "website" | "article" = "website", index = true): Metadata {
  const socialTitle = `${title} | ${site.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type, title: socialTitle, description, url: path, siteName: site.name, images },
    twitter: { card: "summary_large_image", title: socialTitle, description, images },
    ...(index ? {} : { robots: { index: false, follow: true } }),
  };
}
