import { email } from "@/lib/social";

export const site = {
  name: "Ashok Reddy Kundurru",
  title: "Ashok Reddy Kundurru | Full-Stack Developer & AI Builder",
  description:
    "Official portfolio of Ashok Reddy Kundurru, software developer, founder of EMAS Attendance, and builder of SaaS applications, AI-powered products and intelligent software solutions.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://ashokreddykundurru.com").replace(/\/+$/, ""),
  brand: "Ashok Reddy Kundurru",
  role: "Founder @ EMAS Attendance | Full-Stack Developer | AI & Machine Learning Enthusiast",
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
