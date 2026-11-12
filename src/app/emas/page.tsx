import { pageMetadata } from "@/lib/metadata";
import Image from "next/image";
import { Container, Label, TextLink } from "@/components/ui";
import { Chapter } from "@/components/chapter";
import { FadeIn, RevealText } from "@/components/reveal";
import { ArchitectureDiagram } from "@/components/emas-visuals";
import { emasRecent } from "@/components/activity";
import { BrowserFrame } from "@/components/browser-frame";
import { ProjectActions } from "@/components/project-actions";
import { getProject } from "@/lib/projects";

export const metadata = pageMetadata(
  "EMAS Attendance",
  "EMAS Attendance, the attendance and employee management product I'm building. What works, how it's built, and what's next.",
  "/emas",
);

const works = [
  ["Attendance", "Check-in and check-out from the app, with break tracking and work-from-home and outdoor-duty states."],
  ["GPS and field teams", "Location-aware check-ins, validated on the server against configurable office and site geofences."],
  ["Leave", "Employees request leave; managers and HR approve it, with a clear status history for every request."],
  ["Shifts and policies", "Shifts and attendance rules that apply consistently across departments and branches."],
  ["Organization", "Employees, departments, branches and designations in one place, with invites."],
  ["Roles", "Separate views and permissions for employees, HR, organization admins and company owners."],
  ["Mobile", "Android and iOS apps, built from the same web app with Capacitor."],
];

const hard = [
  [
    "Keeping companies apart",
    "Multi-tenant bugs are the scary kind. I moved the company check into Postgres row-level security, set by the server on every transaction. If a filter is missing, you get nothing back, not another company's rows.",
  ],
  [
    "GPS is messy",
    "Accuracy changes from phone to phone, and indoors it can be way off. The server makes the geofence call, not the app, and every attempt is logged so a manager can look at the odd cases.",
  ],
  [
    "Sessions inside a mobile wrapper",
    "Cookies, CSRF protection and refresh tokens have to behave the same in the Capacitor app as in the browser. That took more debugging than any feature.",
  ],
];

const docs = ["01-project-vision", "02-requirements", "03-roles-permissions", "04-database-design", "05-api-design", "06-ui-wireframes", "07-roadmap"];

const status: [string, string][] = [
  ["Product site and sign-up at emasattendance.com", "Live"],
  ["Everything listed above", "Built"],
  ["Self-service account deletion", "In progress"],
  ["Fingerprint device support", "In the original plan"],
  ["Payroll module", "Planned"],
];

export default function EmasPage() {
  const p = getProject("emas-attendance")!;
  return (
    <>
      <section className="relative overflow-hidden">
        <Container className="pt-36 pb-20 sm:pt-44">
          <Label>Founder &amp; product builder · {p.when}</Label>
          <div className="mt-10 flex flex-wrap items-end gap-x-10 gap-y-6">
            <Image src="/shots/emas-icon.png" alt="EMAS app icon" width={140} height={140} priority className="rounded-[2rem]" />
            <RevealText as="h1" onLoad text="EMAS" className="display text-[28vw] leading-[0.8] sm:text-[18rem]" />
          </div>
          <p className="serif text-accent mt-4 text-5xl sm:ml-[30%] sm:text-7xl">Attendance</p>
          <p className="text-muted mt-14 max-w-2xl text-xl leading-relaxed sm:ml-[30%]">{p.intro}</p>
          <p className="text-muted mt-8 font-mono text-xs tracking-[0.15em] uppercase sm:ml-[30%]">{p.commits} · live as EMAS Attence</p>
          <div className="mt-10 sm:ml-[30%]">
            <ProjectActions p={p} caseStudy={false} />
          </div>
        </Container>
      </section>

      <Chapter
        n="01"
        label="Why"
        title={
          <>
            Attendance still lives in <span className="serif text-accent">spreadsheets.</span>
          </>
        }
      >
        <p className="max-w-2xl">{p.problem}</p>
      </Chapter>

      <Container className="pb-24">
        <FadeIn y={80}>
          <a
            href="https://emasattendance.com/"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="Visit"
            aria-label="Visit emasattendance.com (opens in a new tab)"
          >
            <BrowserFrame
              src="/shots/emas-site.jpg"
              alt="EMAS product website hero"
              width={1440}
              height={900}
              label="emasattendance.com"
              priority
              sizes="100vw"
            />
          </a>
        </FadeIn>
      </Container>

      <Chapter n="02" label="What works today">
        <ul>
          {works.map(([k, v]) => (
            <li key={k} className="border-border grid gap-2 border-t py-6 first:border-t-0 first:pt-0 sm:grid-cols-[1fr_1.6fr]">
              <span className="text-fg text-2xl font-medium tracking-tight">{k}</span>
              <span>{v}</span>
            </li>
          ))}
        </ul>
      </Chapter>

      <Chapter
        n="03"
        label="Screenshots"
        title={
          <>
            From the <span className="serif text-accent">live product site.</span>
          </>
        }
      >
        <div className="space-y-12">
          {p.shots.slice(1).map((sh) => (
            <FadeIn key={sh.src}>
              <BrowserFrame src={sh.src} alt={sh.alt} width={sh.width} height={sh.height} label={sh.caption} />
            </FadeIn>
          ))}
        </div>
        <p className="mt-6 text-sm">Screens inside the app sit behind a login. Ask me for a walkthrough.</p>
      </Chapter>

      <Chapter n="04" label="My contribution">
        <ul>
          {p.contribution.map((c) => (
            <li key={c} className="border-border border-t py-4 first:border-t-0 first:pt-0">
              {c}
            </li>
          ))}
        </ul>
      </Chapter>

      <Chapter
        n="05"
        label="Architecture"
        title={
          <>
            Five boxes, <span className="serif text-accent">no magic.</span>
          </>
        }
      >
        <p className="mb-10 max-w-2xl">
          FastAPI and Python on the backend, PostgreSQL for data, Redis for rate limiting, Next.js for the web app, and Capacitor for the phone apps.
        </p>
        <FadeIn>
          <ArchitectureDiagram />
        </FadeIn>
      </Chapter>

      <Chapter n="06" label="The hard parts">
        <div className="space-y-14">
          {hard.map(([t, b], i) => (
            <FadeIn key={t}>
              <p className="text-accent font-mono text-xs">0{i + 1}</p>
              <h3 className="text-fg mt-3 text-3xl font-medium tracking-tight sm:text-4xl">{t}</h3>
              <p className="mt-4 max-w-2xl">{b}</p>
            </FadeIn>
          ))}
        </div>
      </Chapter>

      <Chapter
        n="07"
        label="Process"
        title={
          <>
            I wrote the plan <span className="serif text-accent">before the code.</span>
          </>
        }
      >
        <p className="max-w-2xl">Before writing any code in July I wrote these seven docs, and I still go back to them:</p>
        <ul className="mt-8 grid gap-x-8 font-mono text-sm sm:grid-cols-2">
          {docs.map((d) => (
            <li key={d} className="border-border text-fg border-b py-3">
              docs/{d}.md
            </li>
          ))}
        </ul>
      </Chapter>

      <Chapter n="08" label="Recent commits">
        <ul className="space-y-3 font-mono text-sm">
          {emasRecent.map((c, i) => (
            <li key={i} className="grid gap-1 sm:grid-cols-[7rem_1fr]">
              <span>{c.date}</span>
              <span className="text-fg">{c.msg}</span>
            </li>
          ))}
        </ul>
      </Chapter>

      <Chapter n="09" label="Status">
        <ul>
          {status.map(([k, v]) => (
            <li key={k} className="border-border flex flex-wrap items-baseline justify-between gap-4 border-t py-5 first:border-t-0 first:pt-0">
              <span className="text-fg text-xl">{k}</span>
              <span className={`font-mono text-xs tracking-[0.15em] uppercase ${v === "Built" || v === "Live" ? "text-accent" : ""}`}>{v}</span>
            </li>
          ))}
        </ul>
        <div className="mt-12">
          <ProjectActions p={p} caseStudy={false} />
        </div>
        <p className="mt-6">
          Want a walkthrough or to try it with your team? <TextLink href="/contact">Get in touch</TextLink>.
        </p>
      </Chapter>
    </>
  );
}
