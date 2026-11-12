import { matchIntent, type Intent } from "@/lib/assistant-match";
import { clientSites, getProject, projects } from "@/lib/projects";
import { email, socials } from "@/lib/social";
import { skillGroups } from "@/lib/skills";

export type Reply = { text: string; links?: { label: string; href: string }[]; chips?: string[] };

const intents: Intent[] = [
  { id: "greeting", keywords: ["hi", "hello", "hey", "namaste", "good morning", "good evening"] },
  { id: "price", keywords: ["price", "pricing", "cost", "charge", "rate", "rates", "budget", "quote", "how much"] },
  { id: "resume", keywords: ["resume", "cv", "curriculum"] },
  {
    id: "resolution",
    keywords: ["resolution", "resolution agent", "email automation", "support email", "langgraph", "multimodal", "coming soon", "upcoming", "next project"],
  },
  { id: "qr", keywords: ["qr", "restaurant", "ordering", "menu", "food", "table"] },
  { id: "ai-agent", keywords: ["support agent", "ai agent", "agent", "photo", "image", "identify", "identification", "ocr", "clip"] },
  { id: "smartliv", keywords: ["smartliv", "smart liv", "abhee", "smart home", "switchboard", "home automation"] },
  { id: "panditdesk", keywords: ["panditdesk", "pandit", "priest", "priests", "ceremony"] },
  {
    id: "emas",
    keywords: ["emas", "attendance", "attence", "check-in", "check in", "geofence", "geofencing", "gps", "leave", "shift", "flagship", "your product"],
  },
  {
    id: "ai",
    keywords: ["ai", "ml", "machine learning", "llm", "llms", "rag", "fine-tuning", "fine tuning", "neural", "ollama", "computer vision", "opencv", "vision"],
  },
  {
    id: "freelance",
    keywords: ["freelance", "freelancer", "client", "clients", "website", "websites", "hire", "hiring", "build my", "business site", "landing page"],
  },
  { id: "projects", keywords: ["project", "projects", "work", "portfolio", "built", "build", "made", "case study", "demo"] },
  {
    id: "skills",
    keywords: [
      "skill",
      "skills",
      "stack",
      "tech",
      "technology",
      "technologies",
      "java",
      "spring",
      "react",
      "next.js",
      "nextjs",
      "typescript",
      "postgres",
      "postgresql",
      "mysql",
      "mongodb",
      "backend",
      "frontend",
      "full stack",
      "full-stack",
    ],
  },
  { id: "linkedin", keywords: ["linkedin"] },
  { id: "github", keywords: ["github", "code", "repo", "repos", "source"] },
  { id: "social", keywords: ["instagram", "youtube", "twitter", "x.com", "social", "socials"] },
  { id: "contact", keywords: ["contact", "email", "mail", "reach", "talk", "connect", "message", "call", "collaborate", "collaboration"] },
  { id: "learn", keywords: ["lab", "learn", "blog", "writing", "notes", "article", "articles", "tutorial"] },
  { id: "about", keywords: ["who", "about", "ashok", "yourself", "background", "founder", "experience", "story"] },
];

const START = ["What is EMAS?", "Show me your projects", "Can you build my website?", "How do I contact you?"];

const projectReply = (slug: string, extra?: string): Reply => {
  const p = getProject(slug)!;
  const page = p.slug === "emas-attendance" ? "/emas" : `/projects/${p.slug}`;
  if (p.status === "coming-soon")
    return {
      text: `${p.name} (coming soon): ${p.oneLine}. It's in planning and early development, so there's no demo yet.`,
      links: [{ label: "Project overview", href: page }],
      chips: ["Show me your projects", "How do I contact you?"],
    };
  return {
    text: `${p.name}: ${p.oneLine}. Ashok Reddy Kundurru's role: ${p.role}.${extra ? ` ${extra}` : ""}`,
    links: [{ label: "Case study", href: page }, ...p.links.map((l) => ({ label: l.label, href: l.href }))],
    chips: ["Show me your projects", "How do I contact you?"],
  };
};

const socialLink = (key: string) => socials.find((s) => s.key === key)!;

export function reply(question: string): Reply {
  switch (matchIntent(question, intents)) {
    case "greeting":
      return {
        text: "Hi! I'm Ashok Reddy Kundurru's site assistant. I can tell you about EMAS Attendance, his projects, freelance work and how to reach him.",
        chips: START,
      };
    case "about":
      return {
        text: "Ashok Reddy Kundurru is a software developer and founder. He's building EMAS Attendance, an employee management and attendance platform, and works as a freelance full-stack developer on business websites, SaaS platforms, backend systems and AI-powered applications.",
        links: [{ label: "About Ashok Reddy Kundurru", href: "/about" }],
        chips: ["What is EMAS?", "What's your tech stack?"],
      };
    case "emas":
      return projectReply("emas-attendance", "It's live at emasattendance.com.");
    case "resolution":
      return projectReply("ai-support-resolution-agent");
    case "qr":
      return projectReply("qr-restaurant-ordering");
    case "ai-agent":
      return projectReply("ai-support-agent");
    case "smartliv":
      return projectReply("smartliv-abhee");
    case "panditdesk":
      return projectReply("panditdesk");
    case "projects":
      return {
        text: `Main projects: ${projects.map((p) => (p.status ? `${p.name} (coming soon)` : p.name)).join(", ")}. Each has its own page, and most have a live site or demo.`,
        links: [
          { label: "All work", href: "/projects" },
          ...projects.map((p) => ({ label: p.name, href: p.slug === "emas-attendance" ? "/emas" : `/projects/${p.slug}` })),
        ],
        chips: ["Freelance websites", "Tell me about the AI agent"],
      };
    case "freelance":
      return {
        text: `Yes, Ashok Reddy Kundurru builds websites and web apps for businesses. ${clientSites.length} of his client sites are live, including ${clientSites
          .slice(0, 4)
          .map((c) => c.name)
          .join(", ")}. Email him with what you need.`,
        links: [
          { label: "Client websites", href: "/freelance" },
          { label: `Email ${email}`, href: `mailto:${email}` },
        ],
        chips: ["How much does a website cost?", "How do I contact you?"],
      };
    case "price":
      return {
        text: "There are no fixed prices on the site. Every project is different, so the best way is to email Ashok Reddy Kundurru with what you need and he'll reply with a quote.",
        links: [{ label: `Email ${email}`, href: `mailto:${email}` }],
        chips: ["Freelance websites"],
      };
    case "skills":
      return {
        text: skillGroups.map((g) => `${g.group}: ${g.skills.map((s) => s.name).join(", ")}.`).join(" "),
        links: [{ label: "Explore the skills", href: "/about" }],
        chips: ["What about AI?", "Show me your projects"],
      };
    case "ai":
      return {
        text: "Ashok Reddy Kundurru works with machine learning, LLMs, RAG, fine-tuning, computer vision (OpenCV, vision models) and local AI with Ollama. He's especially interested in AI that admits uncertainty instead of guessing, like his AI support agent.",
        links: [
          { label: "AI support agent", href: "/projects/ai-support-agent" },
          { label: "Try the AI lab", href: "/lab#ai" },
        ],
        chips: ["Tell me about the AI agent"],
      };
    case "contact":
      return {
        text: `The quickest way is email: ${email}. You can also find Ashok Reddy Kundurru on LinkedIn and GitHub.`,
        links: [
          { label: `Email ${email}`, href: `mailto:${email}` },
          { label: "LinkedIn", href: socialLink("linkedin").href },
          { label: "GitHub", href: socialLink("github").href },
          { label: "Contact page", href: "/contact" },
        ],
      };
    case "linkedin":
      return { text: "Here's Ashok Reddy Kundurru's LinkedIn.", links: [{ label: "LinkedIn", href: socialLink("linkedin").href }] };
    case "github":
      return {
        text: "Ashok Reddy Kundurru's GitHub has public repos, including the QR restaurant ordering backend and the SmartLiv website.",
        links: [{ label: "GitHub", href: socialLink("github").href }],
      };
    case "social":
      return { text: "Ashok Reddy Kundurru is on these networks:", links: socials.map((s) => ({ label: s.label, href: s.href })) };
    case "learn":
      return {
        text: "There's an interactive lab with code and in-browser demos (Java, Spring Boot, React, SQL, system design, AI), plus engineering notes.",
        links: [
          { label: "Lab", href: "/lab" },
          { label: "Writing", href: "/blog" },
        ],
      };
    case "resume":
      return {
        text: "There isn't a downloadable resume on the site yet. LinkedIn has Ashok Reddy Kundurru's background, or you can email him to ask for one.",
        links: [
          { label: "LinkedIn", href: socialLink("linkedin").href },
          { label: `Email ${email}`, href: `mailto:${email}` },
        ],
      };
    default:
      return {
        text: `I'm a simple assistant that only knows what's on this site, so I don't have an answer for that yet. A real RAG-powered AI version is coming soon. Ashok Reddy Kundurru can help directly: ${email}.`,
        links: [{ label: `Email ${email}`, href: `mailto:${email}` }],
        chips: START,
      };
  }
}

export const starterChips = START;
