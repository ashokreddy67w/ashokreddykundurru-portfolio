import { email } from "@/lib/social";

export const site = {
  name: "Ashok Reddy Kundurru",
  title: "Ashok Reddy Kundurru | Founder, Full-Stack Developer & AI Builder",
  description:
    "Official portfolio of Ashok Reddy Kundurru — Founder of EMAS Attendance, Full-Stack Developer and AI Builder working on SaaS products, backend systems and AI-powered solutions.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://ashokreddykundurru.com").replace(/\/+$/, ""),
  brand: "Ashok Reddy Kundurru",
  role: "Founder, Full-Stack Developer & AI Builder",
  email,
};

export const nav = [
  { href: "/emas", label: "EMAS" },
  { href: "/projects", label: "Work" },
  { href: "/freelance", label: "Freelance" },
  { href: "/lab", label: "Lab" },
  { href: "/blog", label: "Writing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
