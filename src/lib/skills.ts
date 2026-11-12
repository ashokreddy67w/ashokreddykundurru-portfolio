export type Skill = { name: string; what: string; where: string; how: string; projects: string[] };
export type SkillGroup = { group: string; skills: Skill[] };

const s = (name: string, what: string, where: string, how: string, projects: string[] = []): Skill => ({
  name,
  what,
  where,
  how,
  projects,
});

export const skillGroups: SkillGroup[] = [
  {
    group: "Frontend",
    skills: [
      s(
        "React",
        "A library for building UIs from components and state.",
        "Interactive dashboards and tools.",
        "Component-driven UIs for every product I've built.",
        ["emas-attendance", "smartliv-abhee", "panditdesk", "ai-support-agent"],
      ),
      s(
        "Next.js",
        "A React framework with routing, server rendering and APIs.",
        "Production web apps and SaaS portals.",
        "App Router apps with server components and API routes, including this site.",
        ["emas-attendance", "panditdesk", "ai-support-agent"],
      ),
      s(
        "TypeScript",
        "JavaScript with static types.",
        "Everywhere the codebase must stay maintainable.",
        "Default language for all my frontend and Node work.",
        ["emas-attendance", "smartliv-abhee", "panditdesk", "ai-support-agent"],
      ),
      s("JavaScript", "The language of the web.", "Browser and Node.js.", "Foundation under all my TypeScript work.", []),
      s("HTML", "The structure of web pages.", "Semantic, accessible markup.", "Semantic structure and accessibility basics.", []),
      s("CSS", "Styling and layout for the web.", "Layouts, animation, theming.", "Responsive layouts, custom properties for theming.", []),
      s("Tailwind CSS", "Utility-first CSS framework.", "Fast, consistent UI styling.", "Design tokens and responsive UIs across projects.", [
        "emas-attendance",
        "smartliv-abhee",
        "panditdesk",
      ]),
    ],
  },
  {
    group: "Backend",
    skills: [
      s(
        "Java",
        "A typed, object-oriented language on the JVM.",
        "Enterprise backends and services.",
        "Core CS and backend foundation: OOP, collections, concurrency.",
        [],
      ),
      s(
        "Spring Boot",
        "Opinionated framework for Java services.",
        "REST APIs and microservices.",
        "REST APIs with layered controller/service/repository design.",
        [],
      ),
      s("Hibernate", "An ORM mapping Java objects to tables.", "Persistence in Java apps.", "Entity mapping and relationships.", []),
      s("JDBC", "Java's low-level database API.", "Direct SQL from Java.", "Prepared statements and connection handling.", []),
      s("JPA", "The Java persistence specification.", "Repository-based data access.", "Spring Data JPA repositories and queries.", []),
      s("REST APIs", "Resource-oriented HTTP APIs.", "Every client–server product.", "Designed and built the APIs behind my products.", [
        "emas-attendance",
        "panditdesk",
        "ai-support-agent",
      ]),
    ],
  },
  {
    group: "Database",
    skills: [
      s(
        "PostgreSQL",
        "A powerful open-source relational database.",
        "Transactional, multi-tenant data.",
        "EMAS data model, migrations and row-level security.",
        ["emas-attendance"],
      ),
      s("MySQL", "A popular relational database.", "Web application storage.", "Relational schemas and SQL queries.", []),
      s("MongoDB", "A document database.", "Flexible, schema-light data.", "Document modelling for prototypes.", []),
      s("Supabase", "Hosted Postgres with auth and APIs.", "Fast SaaS backends.", "PanditDesk's database and auth.", ["panditdesk"]),
    ],
  },
  {
    group: "Tools",
    skills: [
      s("Git", "Distributed version control.", "Every project.", "Branching, reviews, clean history.", []),
      s("GitHub", "Code hosting and collaboration.", "Repos, PRs, CI.", "Hosting and reviewing my projects.", []),
      s("Postman", "API client for testing endpoints.", "API development.", "Exploring and testing REST endpoints.", []),
      s("JMeter", "Load-testing tool.", "Performance testing.", "Load tests against API endpoints.", []),
      s("Vercel", "Hosting platform for frontend apps.", "Next.js deployments.", "Deploying Next.js apps.", []),
      s("Render", "Cloud platform for services.", "Backend hosting.", "Hosting backend services.", []),
    ],
  },
  {
    group: "AI & ML",
    skills: [
      s(
        "Machine learning",
        "Models that learn patterns from data instead of hand-written rules.",
        "Prediction, classification, recommendations.",
        "Learning through hands-on experiments.",
        [],
      ),
      s(
        "Neural networks",
        "Layered models behind modern deep learning.",
        "Vision, language and speech.",
        "Studying and experimenting with how they train and fail.",
        [],
      ),
      s("LLMs", "Large language models that read and write text.", "Assistants, search, summarising.", "Building with them locally and through APIs.", []),
      s(
        "RAG",
        "Retrieval-augmented generation: give a model the right documents before it answers.",
        "Grounded answers over your own data.",
        "Retrieval with embeddings and vector search, the same idea used in my support agent's catalogue matching.",
        ["ai-support-agent"],
      ),
      s(
        "Fine-tuning",
        "Further training a model on your own examples.",
        "Specialising a model for a domain or style.",
        "Exploring when fine-tuning beats prompting or retrieval.",
        [],
      ),
    ],
  },
  {
    group: "Computer vision",
    skills: [
      s(
        "OpenCV",
        "The standard open-source computer vision library.",
        "Image processing, detection, camera pipelines.",
        "Hands-on image processing experiments.",
        [],
      ),
      s(
        "Image processing",
        "Cleaning, transforming and measuring images.",
        "OCR prep, inspection, analysis.",
        "Preparing photos for text and visual recognition.",
        ["ai-support-agent"],
      ),
      s("Vision models", "Models that understand images.", "Image identification, OCR.", "Product identification from photos with OCR and CLIP embeddings.", [
        "ai-support-agent",
      ]),
    ],
  },
  {
    group: "Local AI",
    skills: [
      s("Ollama", "Runs open models on your own machine.", "Private, offline AI.", "Local model experiments without sending data out.", []),
      s("Prompt engineering", "Designing inputs that steer model output.", "Any LLM feature.", "Structured prompts and checking responses.", [
        "ai-support-agent",
      ]),
      s("AI integration", "Wiring models into real products.", "Assistants and automation.", "Pipelines that combine OCR, embeddings and verification.", [
        "ai-support-agent",
      ]),
    ],
  },
];
