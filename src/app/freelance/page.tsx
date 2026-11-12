import { pageMetadata } from "@/lib/metadata";
import { Container, PageHero, TextLink } from "@/components/ui";
import { ClientSites } from "@/components/client-sites";
import { clientSites } from "@/lib/projects";

export const metadata = pageMetadata(
  "Freelance websites",
  "Websites Ashok Reddy Kundurru has designed and built for clinics, schools, smart home companies and local businesses. Every site links to the live version.",
  "/freelance",
);

export default function FreelancePage() {
  return (
    <>
      <PageHero
        label={`Freelance · ${clientSites.length} live sites`}
        title="Client websites"
        lead={
          <p>
            Alongside EMAS I design and build websites for businesses: clinics, a pre-school, smart home companies and local shops. Each one is live, so click
            through and try it. Need one? <TextLink href="/contact">Get in touch</TextLink>.
          </p>
        }
      />
      <Container className="pb-24">
        <ClientSites />
      </Container>
    </>
  );
}
