// Article content lives in src/content/blog/<slug>.mdx. Add an entry here to publish one.
export const categories = [
  "Java & Spring Boot",
  "Full-Stack Development",
  "Database Engineering",
  "AI Engineering",
  "System Design",
  "Building SaaS Products",
  "Founder Journey",
] as const;

export type Post = {
  slug: string;
  title: string;
  summary: string;
  category: (typeof categories)[number];
  sample: boolean;
};

export const posts: Post[] = [
  {
    slug: "rest-api-spring-boot",
    title: "Designing a clean REST API with Spring Boot",
    summary: "Controller, service, repository, and why the boundaries matter.",
    category: "Java & Spring Boot",
    sample: true,
  },
  {
    slug: "multi-tenant-postgres",
    title: "Multi-tenant data with PostgreSQL row-level security",
    summary: "Making the database refuse cross-tenant reads, even when the app forgets a filter.",
    category: "Database Engineering",
    sample: true,
  },
  {
    slug: "why-i-built-emas",
    title: "Why I started building EMAS Attendance",
    summary: "From a spreadsheet problem to a product.",
    category: "Founder Journey",
    sample: true,
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
