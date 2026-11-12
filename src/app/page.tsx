import type { Metadata } from "next";
import { site } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";
import { ArrowLink, Container, Label, TextLink } from "@/components/ui";
import { FadeIn, RevealText } from "@/components/reveal";
import { HeroScene } from "@/components/hero-scene";
import { ProjectShowcase } from "@/components/project-showcase";
import { SecondaryProject } from "@/components/secondary-project";
import { ClientSites } from "@/components/client-sites";
import { BrowserFrame } from "@/components/browser-frame";
import { AiWorkflow } from "@/components/lab/ai-workflow";
import { SkillExplorer } from "@/components/skill-explorer";
import { ConfidenceDemo } from "@/components/lab/confidence-demo";
import { Activity, latestEmasCommit } from "@/components/activity";
import { projects } from "@/lib/projects";
import { skillGroups } from "@/lib/skills";
import { posts } from "@/lib/posts";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: site.name, title: site.title, description: site.description, url: "/" },
};

const emasFeatures = [
  ["Check-in, check-out", "From the web or the phone app, with break tracking and work-from-home and outdoor-duty states."],
  ["GPS and geofencing", "Location is captured at check-in and checked against configurable geofences on the server."],
  ["Leave and shifts", "Leave requests with manager and HR approval, plus shift schedules and attendance policies per branch."],
  ["Roles and platforms", "Separate views for employees, HR, admins and owners, on web, Android and iOS from one codebase."],
];

export default function Home() {
  const stack = skillGroups.flatMap((g) => g.skills.map((s) => s.name));
  return (
    <>
      {/* (00) Hero */}
      <section className="relative isolate flex min-h-svh flex-col justify-end overflow-clip pb-10">
        <HeroScene className="absolute inset-0 -z-10 opacity-75 sm:left-[30%]" />
        <div className="from-bg via-bg/40 pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t to-transparent" aria-hidden />
        <Container>
          <RevealText
            as="p"
            onLoad
            delay={0.2}
            accent={["future", "one", "product"]}
            text="Building the future, one product at a time."
            className="display max-w-[16ch] text-[15vw] sm:text-[10.5vw] lg:text-[9.5rem]"
          />
          <div className="border-border text-muted mt-12 grid gap-6 border-t pt-6 font-mono text-xs tracking-[0.15em] uppercase sm:grid-cols-4">
            <h1 className="text-fg">Ashok Reddy Kundurru</h1>
            <p>Founder, EMAS Attendance</p>
            <p>Freelance Full-Stack Developer</p>
            <a href="#intro" className="hover:text-fg flex items-center gap-2 sm:justify-self-end">
              Scroll <span className="inline-block animate-bounce motion-reduce:animate-none">↓</span>
            </a>
          </div>
        </Container>
      </section>

      {/* (01) Founder introduction */}
      <section id="intro" className="scroll-mt-10 py-32 sm:py-48">
        <Container className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Label n="01">Introduction</Label>
          </div>
          <div className="lg:col-span-9">
            <RevealText
              as="p"
              accent={["practical", "real"]}
              text="I'm Ashok Reddy Kundurru. I build practical software products that solve real problems, from the database all the way to the button people tap."
              className="text-4xl leading-[1.05] font-medium tracking-tight sm:text-6xl"
            />
            <FadeIn className="text-muted mt-16 grid gap-10 text-lg leading-relaxed sm:grid-cols-2">
              <p>
                Right now that&apos;s <TextLink href="/emas">EMAS Attendance</TextLink>, my own attendance and employee management product. I started it in July
                2026 and I&apos;ve written every line so far: the plan, the backend, the database, the web app and the phone apps.
              </p>
              <p>
                Alongside building <TextLink href="/emas">EMAS Attendance</TextLink>, I work as a freelance web developer, helping businesses turn their ideas
                into functional, well-designed digital products. My work spans business websites, SaaS platforms like{" "}
                <TextLink href="/projects/panditdesk">PanditDesk</TextLink>,{" "}
                <TextLink href="/projects/qr-restaurant-ordering">QR-based restaurant ordering systems</TextLink>, backend applications, and AI-powered
                solutions. I&apos;m particularly interested in building AI systems that communicate uncertainty instead of making unsupported guesses.{" "}
                <TextLink href="/about">More about Ashok Reddy Kundurru</TextLink>.
              </p>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* (02) EMAS flagship */}
      <section className="border-border border-t py-32 sm:py-40">
        <Container className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Label n="02">Flagship product</Label>
              <Image src="/shots/emas-icon.png" alt="EMAS app icon" width={96} height={96} className="mt-10 rounded-2xl" />
              <h2 className="display mt-8 text-7xl sm:text-8xl">
                EMAS
                <span className="serif text-accent block text-5xl normal-case sm:text-6xl">Attendance</span>
              </h2>
              <p className="text-muted mt-8 max-w-md text-lg leading-relaxed">
                Attendance and employee management for teams. People check in from their phone, managers see who&apos;s in, HR gets the records.
              </p>
              <p className="text-muted mt-6 font-mono text-xs tracking-[0.15em] uppercase">Jul 2026 – now · 395 commits, all mine</p>
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <a
                  href="https://emasattendance.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-accent text-accent-fg inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-mono text-xs tracking-[0.12em] uppercase transition hover:opacity-90"
                >
                  Visit live product ↗<span className="sr-only"> (opens in a new tab)</span>
                </a>
                <ArrowLink href="/emas">Case study</ArrowLink>
              </div>
            </div>
          </div>
          <ol className="min-w-0 lg:col-span-6 lg:col-start-7">
            <li className="pb-10">
              <FadeIn y={60}>
                <a
                  href="https://emasattendance.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="Visit"
                  aria-label="Visit emasattendance.com (opens in a new tab)"
                >
                  <BrowserFrame
                    src="/shots/emas-site.jpg"
                    alt="EMAS product website"
                    width={1440}
                    height={900}
                    label="emasattendance.com"
                    sizes="(min-width: 1024px) 45vw, 100vw"
                  />
                </a>
              </FadeIn>
            </li>
            {emasFeatures.map(([t, b], i) => (
              <li key={t} className="border-border border-t py-10">
                <FadeIn>
                  <span className="text-accent font-mono text-xs">0{i + 1}</span>
                  <h3 className="mt-4 text-4xl font-medium tracking-tight sm:text-5xl">{t}</h3>
                  <p className="text-muted mt-5 max-w-md text-lg leading-relaxed">{b}</p>
                </FadeIn>
              </li>
            ))}
            <li className="border-border border-t pt-10">
              <FadeIn>
                <p className="text-muted font-mono text-xs tracking-[0.15em] uppercase">Latest commit · {latestEmasCommit.date}</p>
                <p className="mt-4 font-mono text-lg">{latestEmasCommit.msg}</p>
              </FadeIn>
            </li>
          </ol>
        </Container>
      </section>

      {/* (03) Selected work */}
      <section className="border-border border-t py-32 sm:py-40">
        <Container>
          <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
            <div>
              <Label n="03">Selected work</Label>
              <RevealText text="Things I've built" className="display mt-6 text-6xl sm:text-8xl" />
            </div>
            <ArrowLink href="/projects">All work</ArrowLink>
          </div>
          <ProjectShowcase items={projects.filter((p) => p.tier === "featured")} />
          <div className="mt-32">
            {projects
              .filter((p) => p.tier === "secondary")
              .map((p) => (
                <SecondaryProject key={p.slug} p={p} />
              ))}
          </div>
        </Container>
      </section>

      {/* (04) Freelance */}
      <section className="border-border border-t py-32 sm:py-40">
        <Container>
          <div className="mb-16 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Label n="04">Freelance</Label>
              <h2 className="display mt-6 text-6xl sm:text-8xl">
                Websites for <span className="serif text-accent normal-case">real businesses.</span>
              </h2>
            </div>
            <div className="self-end lg:col-span-5 lg:col-start-8">
              <p className="text-muted text-lg leading-relaxed">
                Clinics, a pre-school, smart home companies and local shops. Every one of these is live, so click through and try it.
              </p>
              <div className="mt-8">
                <ArrowLink href="/freelance">All client websites</ArrowLink>
              </div>
            </div>
          </div>
          <ClientSites limit={4} />
        </Container>
      </section>

      {/* (05) Expertise */}
      <section className="border-border overflow-hidden border-t py-32 sm:py-40">
        <div className="mb-20 flex w-max whitespace-nowrap" aria-hidden>
          {[0, 1].map((k) => (
            <div key={k} className="marquee flex shrink-0">
              {stack.map((s) => (
                <span key={s} className="display text-border px-6 text-6xl sm:text-8xl">
                  {s}
                  <span className="serif text-accent/40 ml-12">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
        <Container className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Label n="05">Engineering</Label>
            <h2 className="mt-6 text-4xl font-medium tracking-tight sm:text-5xl">
              Full stack, <span className="serif text-accent">end to end.</span>
            </h2>
            <p className="text-muted mt-6 text-lg">Pick a technology to see what it is and where I&apos;ve actually used it.</p>
          </div>
          <div className="lg:col-span-8">
            <SkillExplorer />
          </div>
        </Container>
      </section>

      {/* (06) AI lab */}
      <section className="border-border border-t py-32 sm:py-40">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Label n="06">AI engineering lab</Label>
              <RevealText accent={["not", "sure."]} text="An AI that knows when it's not sure." className="display mt-6 text-5xl sm:text-7xl" />
            </div>
            <p className="text-muted self-end text-lg leading-relaxed lg:col-span-5 lg:col-start-8">
              How my AI support agent identifies a product from a photo. Step through the pipeline, then play with the rule that decides whether to answer or
              ask for a better photo.
            </p>
          </div>
          <FadeIn className="mt-16">
            <AiWorkflow />
          </FadeIn>
          <FadeIn className="mt-16">
            <ConfidenceDemo />
          </FadeIn>
          <div className="mt-10 flex flex-wrap gap-8">
            <ArrowLink href="/projects/ai-support-agent">Case study</ArrowLink>
            <ArrowLink href="/lab">Open the lab</ArrowLink>
          </div>
        </Container>
      </section>

      {/* (07) Experiments */}
      <section className="border-border border-t py-32 sm:py-40">
        <Container className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Label n="07">Experiments</Label>
            <h2 className="mt-6 text-4xl font-medium tracking-tight sm:text-5xl">
              Small things, <span className="serif text-accent">built to learn.</span>
            </h2>
          </div>
          <ul className="space-y-16 lg:col-span-8">
            <li>
              <h3 className="text-muted font-mono text-xs tracking-[0.15em] uppercase">Commit field</h3>
              <p className="text-muted mt-3 mb-6 max-w-xl text-lg">Every square is a day. Pulled straight from my local git history by a small shell script.</p>
              <Activity />
            </li>
            <li className="border-border grid gap-6 border-t pt-16 sm:grid-cols-2">
              <Link href="/lab#system" className="group block" data-cursor="Try">
                <h3 className="text-muted font-mono text-xs tracking-[0.15em] uppercase">Geofence playground</h3>
                <p className="group-hover:text-accent mt-3 text-2xl font-medium">Drag an employee around an office and watch check-in pass or fail.</p>
              </Link>
              <div>
                <h3 className="text-muted font-mono text-xs tracking-[0.15em] uppercase">The sphere up top</h3>
                <p className="mt-3 text-2xl font-medium">A few thousand points and one shader. It leans toward your cursor and pauses when you scroll away.</p>
              </div>
            </li>
          </ul>
        </Container>
      </section>

      {/* (08) Writing */}
      <section className="border-border border-t py-32 sm:py-40">
        <Container>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <Label n="08">Writing</Label>
              <h2 className="mt-6 text-4xl font-medium tracking-tight sm:text-5xl">Notes from building</h2>
            </div>
            <ArrowLink href="/blog">All notes</ArrowLink>
          </div>
          <ul className="border-border border-t">
            {posts.map((p) => (
              <li key={p.slug} className="border-border border-b">
                <Link href={`/blog/${p.slug}`} className="group grid gap-2 py-8 sm:grid-cols-[1fr_2fr_auto] sm:items-baseline">
                  <span className="text-muted font-mono text-xs tracking-[0.15em] uppercase">{p.category}</span>
                  <span className="group-hover:text-accent text-2xl font-medium tracking-tight transition group-hover:translate-x-2">{p.title}</span>
                  <span className="text-muted font-mono text-xs uppercase">{p.sample ? "Draft" : "Read"}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
