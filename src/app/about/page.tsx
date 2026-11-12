import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";
import { PageHero, TextLink } from "@/components/ui";
import { Chapter } from "@/components/chapter";
import { SkillExplorer } from "@/components/skill-explorer";

export const metadata = pageMetadata(
  "About",
  "Ashok Reddy Kundurru: software developer, founder of EMAS Attendance and freelance web developer, building practical products across full-stack, backend and AI.",
  "/about",
);

const areas = [
  ["Full-stack development", "Java, Spring Boot, React, Next.js, TypeScript, JavaScript and REST APIs."],
  ["Backend and databases", "PostgreSQL, MySQL, MongoDB, Hibernate and JPA."],
  ["AI and machine learning", "Machine learning, neural networks, large language models (LLMs), RAG and model fine-tuning."],
  ["Computer vision", "OpenCV, image processing and vision-based AI applications."],
  ["Local AI development", "Ollama, local AI models, prompt engineering and AI application integration."],
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            "@id": `${site.url}/about#profile`,
            url: `${site.url}/about`,
            name: `About ${site.name}`,
            mainEntity: { "@id": `${site.url}/#person` },
          }).replace(/</g, "\\u003c"),
        }}
      />
      <PageHero
        label="About"
        title="Developer. Founder."
        lead={
          <p>
            I&apos;m {site.name}, a software developer and founder, interested in building practical technology products and solving real-world problems through
            software.
          </p>
        }
      />

      <Chapter
        n="01"
        label="What I do"
        title={
          <>
            Building EMAS, and building <span className="serif text-accent">for businesses.</span>
          </>
        }
      >
        <div className="max-w-2xl space-y-6">
          <p>
            I&apos;m the founder of <TextLink href="/emas">EMAS Attendance</TextLink>, where I&apos;m developing an employee management and attendance platform.
            My <TextLink href="https://emasattendance.com/founder">founder page</TextLink> is on the EMAS site.
          </p>
          <p>Alongside product development, I work on freelance website development, SaaS applications, backend systems and AI-powered applications.</p>
          <p>
            Projects I&apos;ve worked on include EMAS Attendance, a{" "}
            <TextLink href="/projects/qr-restaurant-ordering">QR-based restaurant ordering SaaS</TextLink>, an{" "}
            <TextLink href="/projects/ai-support-agent">AI support agent</TextLink>, <TextLink href="/projects/smartliv-abhee">SmartLiv</TextLink> and other{" "}
            <TextLink href="/freelance">business websites</TextLink>. <TextLink href="/projects">See the work</TextLink>.
          </p>
        </div>
      </Chapter>

      <Chapter n="02" label="Experience and interests">
        <ol className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
          {areas.map(([t, b], i) => (
            <li key={t}>
              <span className="text-accent font-mono text-xs">0{i + 1}</span>
              <h3 className="text-fg mt-3 text-3xl font-medium tracking-tight">{t}</h3>
              <p className="mt-3">{b}</p>
            </li>
          ))}
        </ol>
      </Chapter>

      <Chapter
        n="03"
        label="How I learn"
        title={
          <>
            I learn by <span className="serif text-accent">building.</span>
          </>
        }
      >
        <p className="max-w-2xl">
          I enjoy experimenting with new technologies, developing useful applications, and learning through hands-on projects. That&apos;s what the{" "}
          <TextLink href="/lab">lab</TextLink> and the <TextLink href="/blog">notes</TextLink> are for.
        </p>
      </Chapter>

      <Chapter n="04" label="Toolkit">
        <SkillExplorer />
      </Chapter>

      <Chapter n="05" label="Say hello">
        <p className="text-fg max-w-2xl text-2xl leading-snug">
          I&apos;m always interested in connecting with developers, founders and people working on interesting technology products.{" "}
          <TextLink href="/contact">Get in touch</TextLink>.
        </p>
      </Chapter>
    </>
  );
}
