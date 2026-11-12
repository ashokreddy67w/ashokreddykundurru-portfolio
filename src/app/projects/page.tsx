import { pageMetadata } from "@/lib/metadata";
import { ArrowLink, Container, Label, PageHero } from "@/components/ui";
import { ProjectShowcase } from "@/components/project-showcase";
import { SecondaryProject } from "@/components/secondary-project";
import { ClientSites } from "@/components/client-sites";
import { projects } from "@/lib/projects";

export const metadata = pageMetadata(
  "Work",
  "EMAS Attendance, a QR restaurant ordering SaaS, an AI support agent, SmartLiv and ABHEE, plus live client websites.",
  "/projects",
);

export default function ProjectsPage() {
  const main = projects.filter((p) => p.tier !== "secondary");
  const secondary = projects.filter((p) => p.tier === "secondary");
  return (
    <>
      <PageHero
        label="Selected work · 2026"
        title="Work"
        lead={<p>Products, SaaS and client websites. Every project has a live link, a demo or a case study you can open.</p>}
      />
      <Container className="pb-24">
        <ProjectShowcase items={main} />
        <div className="mt-32">
          {secondary.map((p) => (
            <SecondaryProject key={p.slug} p={p} />
          ))}
        </div>
      </Container>
      <section id="freelance" className="border-border scroll-mt-20 border-t py-24 sm:py-32">
        <Container>
          <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
            <div>
              <Label>Freelance</Label>
              <h2 className="display mt-6 text-6xl sm:text-8xl">Client websites</h2>
            </div>
            <ArrowLink href="/freelance">All client work</ArrowLink>
          </div>
          <ClientSites limit={4} />
        </Container>
      </section>
    </>
  );
}
