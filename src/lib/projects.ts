// Every URL here was checked to load publicly. Never add a Vercel dashboard or preview-only link.
export type Shot = { src: string; alt: string; caption: string; width: number; height: number };
export type ProjectLink = { kind: "live" | "demo" | "github"; label: string; href: string };

export type Project = {
  slug: string;
  name: string;
  tier: "flagship" | "featured" | "secondary";
  when: string;
  oneLine: string;
  role: string;
  commits: string | null; // from git history; null when not tracked
  shots: Shot[];
  intro: string;
  problem: string;
  contribution: string[];
  features: string[];
  stack: string[];
  challenges: { title: string; body: string }[];
  links: ProjectLink[];
  linkNote: string | null; // shown when there is no public link
  status?: "coming-soon"; // planned or in development: never shown as built or deployed
  category?: string;
  plan?: Plan;
};

export type Plan = {
  vision: string;
  useCases: { title: string; items: string[] }[];
  architecture: { layer: string; detail: string }[];
  workflow: string[];
  roadmap: { phase: string; items: string; state: "in-progress" | "next" | "later" }[];
  current: string;
};

const desktop = (src: string, alt: string, caption: string): Shot => ({ src, alt, caption, width: 1440, height: 900 });

export const projects: Project[] = [
  {
    slug: "emas-attendance",
    name: "EMAS Attendance",
    tier: "flagship",
    when: "Jul 2026 – now",
    oneLine: "Employee management and attendance for office, remote and field teams",
    role: "Founder & product builder",
    commits: "395 commits, all mine",
    shots: [
      desktop("/shots/emas-site.jpg", "EMAS product website hero", "emasattendance.com, the live product site"),
      desktop("/shots/emas-features.jpg", "EMAS feature overview", "Features: attendance, leave, GPS, shifts, roles"),
      desktop("/shots/emas-how.jpg", "EMAS how it works", "Onboarding flow from organization setup to attendance review"),
    ],
    intro:
      "EMAS is my own product: an employee management and attendance platform. Employees check in from their phone, managers see who's in, and HR gets clean records and leave approvals.",
    problem:
      "A lot of teams still track attendance on spreadsheets, paper registers and WhatsApp. Nobody can say for sure who checked in, where, or when, and every branch does it a bit differently.",
    contribution: [
      "Product vision, planning docs and roadmap",
      "Backend API and database design",
      "Web app, Android and iOS apps",
      "Auth, roles and tenant isolation",
      "Deployment and the public product site",
    ],
    features: [
      "Check-in and check-out with break tracking, work-from-home and outdoor-duty states",
      "GPS and field attendance, validated against configurable geofences",
      "Leave requests with manager and HR approval and a full status history",
      "Shift scheduling and attendance policies across departments and branches",
      "Employees, departments, branches and designations in one place",
      "Role-based views for employees, HR, organization admins and company owners",
      "Android and iOS apps from the same codebase",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "FastAPI", "Python", "PostgreSQL", "Redis", "Capacitor"],
    challenges: [
      {
        title: "Keeping companies apart",
        body: "Company scoping lives in Postgres row-level security, set by the server on every transaction. If a filter is missing, the query returns nothing instead of another company's rows.",
      },
      {
        title: "GPS is messy",
        body: "Accuracy varies by phone and indoors it can be far off. The server makes the geofence decision, not the app, and every attempt is logged for review.",
      },
      {
        title: "Sessions inside a mobile wrapper",
        body: "Cookies, CSRF protection and rotating refresh tokens have to behave the same in the Capacitor apps as in the browser.",
      },
    ],
    links: [{ kind: "live", label: "Visit live product", href: "https://emasattendance.com/" }],
    linkNote: null,
  },
  {
    slug: "ai-support-resolution-agent",
    name: "AI Support & Resolution Agent",
    tier: "featured",
    status: "coming-soon",
    category: "AI Engineering · AI Agents · Multimodal AI · Email Automation",
    when: "In development",
    oneLine: "An AI agent that understands a support problem, talks to the company by email and follows up until it's resolved",
    role: "Founder & engineer",
    commits: null,
    shots: [],
    intro:
      "An AI-powered customer support platform designed to understand customer problems, analyse uploaded images and documents, communicate with companies through email, manage ongoing conversations and coordinate support until the issue is resolved. It is designed for both individuals seeking product support and businesses automating customer service workflows.",
    problem:
      "Getting a product issue resolved means finding the right contact, explaining the problem with photos and order details, and chasing replies for days. Businesses face the same loop from the other side, answering routine support emails by hand.",
    contribution: ["Product vision and scope", "System architecture and agent workflow design", "Planning the multimodal, RAG and email integrations"],
    features: [
      "AI-powered customer problem understanding",
      "Image analysis using computer vision and multimodal AI",
      "Product and document information extraction",
      "RAG-powered product manuals and knowledge retrieval",
      "Automated email drafting and communication",
      "Customer approval before the first external email",
      "Controlled automatic replies to routine company responses",
      "Scheduled email follow-ups",
      "Human escalation for complex issues",
      "Support case tracking and resolution confirmation",
      "Personal and business support modes",
    ],
    stack: ["Next.js", "React", "TypeScript", "Python", "FastAPI", "LangGraph", "Ollama", "Qwen2.5-VL", "OpenCV", "PostgreSQL", "pgvector", "Redis", "Gmail API", "Microsoft Graph", "Docker"],
    challenges: [
      { title: "Never email on the customer's behalf without consent", body: "The first message to any company needs the customer's explicit approval. Only routine replies after that can be automated, and within set limits." },
      { title: "Knowing when to hand over to a human", body: "Refunds, legal questions or anything the agent isn't confident about are escalated instead of answered." },
      { title: "Grounded answers", body: "Product facts should come from retrieved manuals and documents, not the model's memory." },
    ],
    links: [],
    linkNote: "Coming soon. In planning and early development, so there's no demo or public code yet.",
    plan: {
      vision:
        "Describe the problem once, attach a photo or receipt, and let the agent handle the back-and-forth with the company, with you in control of anything that matters.",
      useCases: [
        { title: "Personal support", items: ["Report a faulty product with photos", "Let the agent find the manual and warranty terms", "Approve the first email, then let it follow up", "Get notified when the company replies or the issue is resolved"] },
        { title: "Business support", items: ["Triage incoming support emails", "Answer routine questions from product documentation", "Draft replies for agents to approve", "Escalate complex cases with full context"] },
      ],
      architecture: [
        { layer: "Web app", detail: "Next.js, React and TypeScript for cases, approvals and conversation history" },
        { layer: "Agent service", detail: "Python, FastAPI and LangGraph orchestrating each support case as a stateful workflow" },
        { layer: "Vision and language models", detail: "Local models through Ollama: Qwen2.5-VL for images and documents, OpenCV for image processing" },
        { layer: "Knowledge", detail: "PostgreSQL with pgvector for retrieval over product manuals and documents (RAG)" },
        { layer: "Email", detail: "Gmail API and Microsoft Graph for sending, receiving and threading conversations" },
        { layer: "Jobs and deployment", detail: "Redis for scheduled follow-ups and queues, Docker for deployment" },
      ],
      workflow: [
        "Understand: the customer describes the problem and uploads photos or documents",
        "Analyse: vision models extract product, model and document details",
        "Research: RAG retrieves the manual, warranty and support information",
        "Draft: the agent writes the first email to the company",
        "Approve: the customer reviews and approves it before anything is sent",
        "Converse: routine replies are handled automatically, with scheduled follow-ups",
        "Escalate: complex or uncertain cases go to a human",
        "Resolve: the case is tracked until the customer confirms it's resolved",
      ],
      roadmap: [
        { phase: "Phase 1", items: "Problem intake, image and document analysis", state: "in-progress" },
        { phase: "Phase 2", items: "RAG over product manuals and knowledge", state: "next" },
        { phase: "Phase 3", items: "Email drafting, approval and sending", state: "next" },
        { phase: "Phase 4", items: "Automatic replies, follow-ups and escalation", state: "later" },
        { phase: "Phase 5", items: "Case tracking, resolution and business mode", state: "later" },
      ],
      current: "Planning and early development. Architecture and agent workflow are designed; the first phase is being built.",
    },
  },
  {
    slug: "panditdesk",
    name: "PanditDesk",
    tier: "featured",
    when: "Apr – Sep 2026",
    oneLine: "Practice management SaaS for Hindu priests in the US",
    role: "Developer in a small team at Avison Technologies",
    commits: "184 of ~350 commits were mine",
    shots: [{ src: "/shots/panditdesk.jpg", alt: "PanditDesk website", caption: "PanditDesk public site (local build)", width: 1280, height: 720 }],
    intro:
      "PanditDesk helps priests run their practice: customers, ceremonies, a calendar, reminders and payments, in one place. I built it with a small team at Avison Technologies.",
    problem: "Priests juggle bookings and reminders across phone calls, paper diaries and a handful of apps. Follow-ups get missed.",
    contribution: [
      "Priest portal: dashboard, customers, ceremonies and calendar",
      "SMS, WhatsApp and email reminders",
      "Calendar feed for Google, Apple and Outlook",
      "Admin 'view as priest' with an audit log",
      "Installable PWA with an offline page",
    ],
    features: [
      "Multi-tenant priest portal",
      "Reminders over SMS, WhatsApp and email",
      "One iCal feed that works in every calendar app",
      "Audited support impersonation",
      "Installable PWA",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Stripe", "Twilio", "Resend"],
    challenges: [
      {
        title: "One .ics feed instead of three integrations",
        body: "A token-protected iCal URL works in Google, Apple and Outlook. No OAuth apps to maintain.",
      },
      {
        title: "Support access that leaves a trail",
        body: "Admins view a priest's account through a signed, one-hour cookie, with a visible banner and an audit log entry.",
      },
    ],
    links: [],
    linkNote: "Private codebase, not publicly launched.",
  },
  {
    slug: "qr-restaurant-ordering",
    name: "QR Restaurant Ordering SaaS",
    tier: "featured",
    when: "Feb – Mar 2026",
    oneLine: "Multi-restaurant ordering: customers scan a table QR, restaurants run orders, tables and billing",
    role: "Full-stack developer",
    commits: null,
    shots: [
      desktop("/shots/qr-demo.jpg", "QR restaurant platform role picker", "The demo: pick a role to explore its screens"),
      desktop("/shots/qr-owner.jpg", "Restaurant owner dashboard", "Restaurant owner dashboard (demo data)"),
    ],
    intro:
      "A multi-restaurant ordering platform. Customers scan the QR code on their table to browse the menu and order; restaurants manage menus, tables, kitchen orders and billing; a platform admin onboards and verifies restaurants.",
    problem: "Small restaurants lose time to paper order slips and waiting staff. Ordering from the table, straight to the kitchen, takes that friction out.",
    contribution: [
      "Designed the four-role product: platform admin, restaurant owner, staff and customer",
      "Built the clickable frontend prototype (23 screens across desktop, tablet and mobile)",
      "Built the Spring Boot backend for authentication and restaurant onboarding",
    ],
    features: [
      "Platform admin: verify restaurants, review onboarding, approve, reject or suspend",
      "Restaurant owner: menu, tables and QR codes, billing, reports and theme",
      "Staff: kitchen display board, floor view with a table map, per-table orders",
      "Customer: scan, browse the menu, add to cart, place an order and track it",
      "Separate JWT logins for platform admins and restaurant owners",
      "Email OTP verification, password reset and an activity log",
    ],
    stack: ["React", "Vite", "Tailwind CSS", "Java", "Spring Boot", "Spring Security", "JWT", "PostgreSQL"],
    challenges: [
      {
        title: "Two kinds of users, two auth realms",
        body: "Platform admins and restaurant owners have different permissions and different login flows, so they get separate JWT filters and security configs instead of one shared role flag.",
      },
      {
        title: "One product, four screen sizes",
        body: "Owners work on desktop, staff on tablets, customers on their phones. Each role's screens were designed for the device it is actually used on.",
      },
    ],
    links: [
      { kind: "demo", label: "Try demo", href: "https://qr-restaurant-saas-figma-demo.vercel.app/" },
      { kind: "github", label: "Backend on GitHub", href: "https://github.com/ashokreddy67w/qr-restaurant-saas-backend" },
      { kind: "github", label: "Frontend on GitHub", href: "https://github.com/ashokreddy67w/qr-restaurant-saas-figma-demo" },
    ],
    linkNote: "The demo is a frontend prototype with mocked data.",
  },
  {
    slug: "ai-support-agent",
    name: "AI Support Agent",
    tier: "featured",
    when: "Sep 2026",
    oneLine: "Identifies a product from a photo, and asks for a better photo when it isn't sure",
    role: "Solo build",
    commits: null,
    shots: [
      {
        src: "/shots/ai-support-agent.jpg",
        alt: "AI Product Support Agent upload screen",
        caption: "The agent's upload and camera screen",
        width: 720,
        height: 280,
      },
    ],
    intro:
      "Upload or photograph a product and the agent works out the brand, product family and exact model, but only when the evidence supports it. It checks for visible damage and tells you exactly which extra photo would help.",
    problem: "Support chats waste time on 'which model do you have?'. A photo should be enough, as long as the system is honest about what it can't confirm.",
    contribution: [
      "The whole pipeline: OCR, image embeddings, matching, verification",
      "A local vector store for catalogue matching",
      "Camera capture and follow-up photo requests in the UI",
    ],
    features: [
      "Reads label text with OCR (Tesseract)",
      "Compares the photo to the catalogue with CLIP image embeddings",
      "Verifies a match against both kinds of evidence before answering",
      "Checks for visible physical damage",
      "Asks for a specific follow-up photo when confidence is low",
    ],
    stack: ["Next.js", "TypeScript", "Tesseract OCR", "CLIP embeddings", "Vector search", "Vision models"],
    challenges: [
      {
        title: "Knowing when not to answer",
        body: "A wrong model number is worse than no answer. Evidence is combined into one confidence score, and below the threshold the agent asks for the photo that would help most.",
      },
      {
        title: "Pluggable sources",
        body: "The local catalogue and open-world search sit behind one provider interface, so new sources plug in without touching the orchestration.",
      },
    ],
    links: [],
    linkNote: "Runs locally for now, there's no public deployment yet. Try the decision logic in the interactive demo below.",
  },
  {
    slug: "smartliv-abhee",
    name: "SmartLiv & ABHEE",
    tier: "featured",
    when: "Jun – Oct 2026",
    oneLine: "Smart home brand websites and a switchboard design tool",
    role: "Designer & developer",
    commits: null,
    shots: [
      desktop("/shots/smartliv-site.jpg", "SmartLiv website hero", "smartliv.io"),
      desktop("/shots/abhee.jpg", "ABHEE Smart Home Systems website", "abheesmarthomesystems.com"),
      { src: "/shots/smartliv-designer.jpg", alt: "SmartLiv switchboard designer", caption: "The switchboard designer tool", width: 1280, height: 800 },
    ],
    intro:
      "Work for two smart home businesses: the SmartLiv brand website, the ABHEE Smart Home Systems website, and a switchboard designer that lets customers plan every room and download one PDF for the installer.",
    problem: "Smart home buyers need to see what's possible and then pin down exact switch layouts. Both used to happen over calls and sketches.",
    contribution: ["Designed and built both websites", "Built the switchboard designer end to end", "Deployment and ongoing updates"],
    features: [
      "SmartLiv: cinematic product site with scene demos and consultation booking",
      "ABHEE: services, products and project galleries with WhatsApp contact",
      "Designer: rooms, a 240-icon switch catalogue, fan and regulator rules",
      "Designer: one combined PDF, generated in the browser",
      "Designer: projects saved locally, with JSON import and export",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite", "Vitest"],
    challenges: [
      {
        title: "No backend for the designer",
        body: "Projects live in the browser and PDFs are generated client-side, so the tool is just static files: nothing to run, secure or pay for.",
      },
      {
        title: "Layout rules that match real hardware",
        body: "A fan regulator takes two switch places and sockets take two. The layout logic had to model the physical board, not just a grid of icons.",
      },
    ],
    links: [
      { kind: "live", label: "Visit SmartLiv", href: "https://smartliv.io/" },
      { kind: "live", label: "Visit ABHEE", href: "https://www.abheesmarthomesystems.com/" },
      { kind: "github", label: "View GitHub", href: "https://github.com/ashokreddy67w/smartliv-website" },
    ],
    linkNote: null,
  },
];

export type ClientSite = { name: string; kind: string; place: string; href: string; shot: string; stack: string[]; summary: string };

export const clientSites: ClientSite[] = [
  {
    name: "ABHEE Smart Home Systems",
    kind: "Smart home installer",
    place: "Andhra Pradesh",
    href: "https://www.abheesmarthomesystems.com/",
    shot: "/shots/abhee.jpg",
    stack: ["Next.js", "TypeScript", "Tailwind"],
    summary: "Services, products and project galleries, with WhatsApp booking.",
  },
  {
    name: "SmartLiv",
    kind: "Smart home brand",
    place: "smartliv.io",
    href: "https://smartliv.io/",
    shot: "/shots/smartliv-site.jpg",
    stack: ["Next.js", "Framer Motion", "Tailwind"],
    summary: "A cinematic brand site with scene demos and consultation booking.",
  },
  {
    name: "ABHEE Car Shopee",
    kind: "Car audio & accessories",
    place: "Guntur",
    href: "https://abhee-car-shopee-tirupati.vercel.app/",
    shot: "/shots/carshopee.jpg",
    stack: ["Next.js", "TypeScript", "Tailwind"],
    summary: "Services, products and brands, with quote, call and WhatsApp actions and a verified map pin.",
  },
  {
    name: "Dr. Uma's Skin, Hair & Laser",
    kind: "Dermatology clinic",
    place: "Guntur",
    href: "https://drumaguntur.vercel.app/",
    shot: "/shots/druma.jpg",
    stack: ["Next.js", "TypeScript", "Tailwind"],
    summary: "Doctor profile, treatments, reviews and one-tap calling and directions.",
  },
  {
    name: "Dr. Indira's Skin & Hair Clinic",
    kind: "Dermatology clinic",
    place: "Guntur",
    href: "https://dr-indira-skin-hair-clinic.vercel.app/",
    shot: "/shots/indira.jpg",
    stack: ["Next.js", "TypeScript", "Tailwind"],
    summary: "Services, clinic hours and appointment booking over phone and WhatsApp.",
  },
  {
    name: "Vennela Dental Clinic",
    kind: "Dental clinic",
    place: "Kukatpally, Hyderabad",
    href: "https://vennela-dental-kbhp.vercel.app/",
    shot: "/shots/vennela.jpg",
    stack: ["Next.js", "TypeScript", "Tailwind"],
    summary: "Treatments, facilities, clinic hours and call or online booking.",
  },
  {
    name: "Smart Pearls Pre School",
    kind: "Pre-school",
    place: "Madhapur, Hyderabad",
    href: "https://smartpearl.vercel.app/",
    shot: "/shots/smartpearl.jpg",
    stack: ["Next.js", "TypeScript", "Tailwind"],
    summary: "Programs, activities, a gallery and visit enquiries for parents.",
  },
  {
    name: "PureProtein",
    kind: "Plant-based food brand",
    place: "Soya products",
    href: "https://pureprotein.vercel.app/",
    shot: "/shots/pureprotein.jpg",
    stack: ["HTML", "CSS"],
    summary: "A light, fast product site for fresh tofu, soya milk and curd.",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
