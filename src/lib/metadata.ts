import type { Metadata } from "next";
import { site } from "@/lib/site";

export function pageMetadata(title: string, description: string, path: string, type: "website" | "article" = "website"): Metadata {
  const socialTitle = `${title} | ${site.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type, title: socialTitle, description, url: path, siteName: site.name },
    twitter: { card: "summary_large_image", title: socialTitle, description },
  };
}
