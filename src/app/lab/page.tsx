import { pageMetadata } from "@/lib/metadata";
import { Container, Label, PageHero } from "@/components/ui";
import { ConfidenceDemo } from "@/components/lab/confidence-demo";
import { CodeBlock } from "@/components/code-block";
import { ArchitectureDiagram } from "@/components/emas-visuals";
import { GeofenceDemo } from "@/components/lab/geofence-demo";
import { ApiDemo } from "@/components/lab/api-demo";
import { CheckInDemo } from "@/components/lab/check-in-demo";

export const metadata = pageMetadata(
  "Learn How I Build",
  "An interactive engineering lab: Java, Spring Boot, React, Next.js, SQL, REST APIs, system design and AI, with code and in-browser demos.",
  "/lab",
);

const java = `public record Attendance(long employeeId, Instant checkIn, Instant checkOut) {

    public Duration worked() {
        if (checkOut == null) return Duration.ZERO; // still checked in
        return Duration.between(checkIn, checkOut);
    }
}

// Total hours across a week, using streams
Duration total = week.stream()
        .map(Attendance::worked)
        .reduce(Duration.ZERO, Duration::plus);`;

const spring = `@RestController
@RequestMapping("/api/v1/employees")
public class EmployeeController {

    private final EmployeeService service;

    public EmployeeController(EmployeeService service) {
        this.service = service;
    }

    @GetMapping("/{id}")
    public EmployeeDto get(@PathVariable long id) {
        return service.findById(id); // throws 404 if missing
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public EmployeeDto create(@Valid @RequestBody CreateEmployee req) {
        return service.create(req);
    }
}`;

const react = `export function CheckInDemo() {
  const [log, setLog] = useState<Entry[]>([]);
  const checkedIn = log.at(-1)?.type === "in"; // derived, not stored

  const toggle = () =>
    setLog([...log, { type: checkedIn ? "out" : "in", at: new Date().toLocaleTimeString() }]);

  return <button onClick={toggle}>{checkedIn ? "Check out" : "Check in"}</button>;
}`;

const next = `app/
├── layout.tsx            // shared shell: nav, theme, fonts
├── page.tsx              // server component: no JS shipped unless needed
├── projects/
│   ├── page.tsx          // static list
│   └── [slug]/page.tsx   // generateStaticParams → prerendered at build
└── api/
    └── attendance/route.ts  // server-only route handler

// Rule of thumb: render on the server, add "use client" only where
// the component needs state, effects or browser APIs.`;

const sql = `-- Who checked in late today, per branch
SELECT b.name            AS branch,
       e.full_name       AS employee,
       a.check_in::time  AS checked_in
FROM attendance a
JOIN employees e ON e.id = a.employee_id
JOIN branches  b ON b.id = e.branch_id
WHERE a.check_in::date = CURRENT_DATE
  AND a.check_in::time > b.shift_start + INTERVAL '10 minutes'
ORDER BY b.name, a.check_in;`;

const rls = `-- Each company only ever sees its own rows
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance FORCE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation ON attendance
  USING (company_id::text = current_setting('app.company_id', true));`;

const ai = `// Ask a local vision model (via Ollama) to describe a product photo
const res = await fetch("http://localhost:11434/api/generate", {
  method: "POST",
  body: JSON.stringify({
    model: "llava",
    prompt: "What product is in this photo? Reply with brand and model only.",
    images: [base64Image],
    stream: false,
  }),
});
const { response } = await res.json();
// Never trust it blindly: verify against OCR text and the catalogue first.`;

const sections = [
  { id: "java", label: "Java" },
  { id: "spring", label: "Spring Boot" },
  { id: "react", label: "React" },
  { id: "nextjs", label: "Next.js" },
  { id: "sql", label: "SQL" },
  { id: "api", label: "REST API" },
  { id: "system", label: "System design" },
  { id: "ai", label: "AI" },
];

function Lesson({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: React.ReactNode }) {
  const n = String(sections.findIndex((s) => s.id === id) + 1).padStart(2, "0");
  return (
    <section id={id} className="border-border grid scroll-mt-32 gap-8 border-t py-20 lg:grid-cols-12">
      <div className="min-w-0 lg:col-span-4">
        <Label n={n}>{eyebrow}</Label>
        <h2 className="mt-6 text-3xl font-medium tracking-tight text-balance sm:text-4xl">{title}</h2>
      </div>
      <div className="text-muted min-w-0 text-lg leading-relaxed lg:col-span-8 [&>p+p]:mt-4">{children}</div>
    </section>
  );
}

export default function LabPage() {
  return (
    <>
      <PageHero
        label="Interactive engineering lab"
        title="Learn how I build."
        lead={<p>Small lessons pulled from my own projects. The code is copyable, and the demos run in your browser, no server involved.</p>}
      />
      <nav aria-label="Lab topics" className="border-border bg-bg/85 sticky top-14 z-30 border-y backdrop-blur-md">
        <Container className="flex gap-1 overflow-x-auto py-2">
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="link-u text-muted hover:text-fg shrink-0 px-3 py-2 font-mono text-xs tracking-[0.15em] uppercase">
              {s.label}
            </a>
          ))}
        </Container>
      </nav>
      <Container className="pb-24">
        <Lesson id="java" eyebrow="Java" title="Model the domain with records">
          <p>Records give you immutable data with equals, hashCode and toString for free. Keep behaviour that belongs to the data right next to it.</p>
          <CodeBlock code={java} lang="java" title="Attendance.java" />
        </Lesson>

        <Lesson id="spring" eyebrow="Spring Boot" title="A thin controller over a service">
          <p>
            Controllers translate HTTP; services hold the rules; repositories talk to the database. Validation happens at the edge with <code>@Valid</code>.
          </p>
          <CodeBlock code={spring} lang="java" title="EmployeeController.java" />
        </Lesson>

        <Lesson id="react" eyebrow="React" title="State in, UI out">
          <p>Store the minimum state and derive the rest. This one is live, try it.</p>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <CodeBlock code={react} lang="tsx" title="check-in-demo.tsx" />
            <div className="lg:mt-6">
              <CheckInDemo />
            </div>
          </div>
        </Lesson>

        <Lesson id="nextjs" eyebrow="Next.js" title="App Router architecture">
          <p>Server components by default, client components only where interaction lives. This very site follows this layout.</p>
          <CodeBlock code={next} lang="text" title="project structure" />
        </Lesson>

        <Lesson id="sql" eyebrow="SQL" title="Queries that answer real questions">
          <p>A late-arrivals report joins attendance, employees and branches. And row-level security makes the database itself enforce tenant isolation.</p>
          <CodeBlock code={sql} lang="sql" title="late_arrivals.sql" />
          <CodeBlock code={rls} lang="sql" title="tenant_isolation.sql" />
        </Lesson>

        <Lesson id="api" eyebrow="REST API" title="Requests and responses">
          <p>Try the verbs below. Status codes carry meaning: 201 on create, 204 on delete, 422 on invalid input.</p>
          <div className="mt-6">
            <ApiDemo />
          </div>
        </Lesson>

        <Lesson id="system" eyebrow="System design" title="Geofenced attendance, end to end">
          <p>
            The check-in flow from EMAS: the client sends its location, the server computes the distance to the branch and decides. Move the employee around to
            see the rule in action.
          </p>
          <div className="mt-6 space-y-6">
            <GeofenceDemo />
            <ArchitectureDiagram />
          </div>
        </Lesson>

        <Lesson id="ai" eyebrow="AI engineering" title="Vision models, with guardrails">
          <p>
            An experiment from my AI support agent work: ask a local model what&apos;s in a photo, then verify before answering. Shown as code only, nothing
            runs here.
          </p>
          <CodeBlock code={ai} lang="ts" title="identify.ts" />
          <p>And here is the decision rule that sits after the model, simplified and playable:</p>
          <div className="mt-6">
            <ConfidenceDemo />
          </div>
        </Lesson>
      </Container>
    </>
  );
}
