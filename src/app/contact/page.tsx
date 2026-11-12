import { pageMetadata } from "@/lib/metadata";
import { Mail } from "lucide-react";
import { Container, Label } from "@/components/ui";
import { RevealText } from "@/components/reveal";
import { ContactForm } from "@/components/contact-form";
import { CopyEmail } from "@/components/copy-email";
import { SocialList } from "@/components/social-links";
import { email } from "@/lib/social";

export const metadata = pageMetadata(
  "Contact",
  "Email Ashok Reddy Kundurru or find him on LinkedIn and GitHub. Open to freelance projects, collaborations, roles and conversations about EMAS Attendance.",
  "/contact",
);

export default function ContactPage() {
  return (
    <Container className="grid gap-16 pt-36 pb-24 sm:pt-44 lg:grid-cols-12">
      <div className="min-w-0 lg:col-span-6">
        <Label>Contact</Label>
        <RevealText as="h1" onLoad accent={["build"]} text="Let's build something." className="display mt-8 text-[15vw] sm:text-8xl" />
        <p className="text-muted mt-10 max-w-md text-lg leading-relaxed">
          I&apos;m always interested in connecting with developers, founders and people working on interesting technology products. Freelance projects,
          collaborations, roles, or EMAS: tell me what you&apos;re working on.
        </p>

        <div className="mt-12">
          <p className="text-muted font-mono text-xs tracking-[0.15em] uppercase">Email</p>
          <a
            href={`mailto:${email}`}
            className="group hover:text-accent focus-visible:text-accent mt-3 inline-flex max-w-full items-center gap-3 text-xl font-medium tracking-tight break-all transition sm:text-2xl"
          >
            <Mail className="text-accent size-5 shrink-0" aria-hidden />
            <span className="link-u">{email}</span>
          </a>
          <CopyEmail className="mt-4 flex" />
        </div>

        <div className="mt-14">
          <p className="text-muted mb-2 font-mono text-xs tracking-[0.15em] uppercase">Elsewhere</p>
          <SocialList />
        </div>
      </div>
      <div className="min-w-0 lg:col-span-5 lg:col-start-8 lg:pt-24">
        <ContactForm />
      </div>
    </Container>
  );
}
