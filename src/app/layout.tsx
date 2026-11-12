import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Cursor } from "@/components/cursor";
import { ChatAssistant } from "@/components/chat-assistant";
import { site } from "@/lib/site";
import { socials } from "@/lib/social";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const serif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["italic", "normal"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: site.name, title: site.title, description: site.description, url: "/", locale: "en_US" },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
};

export const viewport: Viewport = { themeColor: "#060606" };

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${site.url}/#person`,
  name: site.name,
  url: site.url,
  jobTitle: site.role,
  email: `mailto:${site.email}`,
  sameAs: socials.map((s) => s.href),
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: site.url,
  name: site.name,
  description: site.description,
  inLanguage: "en",
  publisher: { "@id": `${site.url}/#person` },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${serif.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([personJsonLd, websiteJsonLd]).replace(/</g, "\\u003c") }} />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        <a
          href="#main"
          className="focus:bg-accent focus:text-accent-fg sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:px-3 focus:py-2"
        >
          Skip to content
        </a>
        <Cursor />
        <Nav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <ChatAssistant />
      </body>
    </html>
  );
}
