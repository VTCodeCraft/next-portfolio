/**
 * Work history and education.
 *
 * Two consumers read this file and they want different amounts of it:
 *
 *   - the homepage section renders company, role, dates and `descriptor`
 *   - /experience renders the full record — `intro`, `featured`,
 *     `selectedWork`, `spotlight`, `projects`, `metrics`, `links`
 *
 * Keeping both shapes here rather than in the components is what stops the
 * two surfaces drifting apart, and it means a future /experience/[slug]
 * route can be added without moving content again.
 *
 * Everything is résumé-supported. No invented metrics, outcomes, links,
 * client names, team sizes or user counts. Nothing here identifies private
 * infrastructure: no hosts, endpoints, repository names, credentials or
 * internal identifiers.
 */

export type ExperienceLink = {
  label: string;
  href: string;
};

/** A single supported figure. Value stays a string so units travel with it. */
export type ExperienceMetric = {
  value: string;
  label: string;
};

/** A hairline-separated row under a role. Title plus one compact paragraph. */
export type WorkRow = {
  title: string;
  body: string;
  /** Optional per-row link — a store listing, a live surface, a recording. */
  links?: ExperienceLink[];
};

/** The one project a role leads with. */
export type FeaturedWork = {
  name: string;
  /** Mono kicker above the name. */
  kicker: string;
  /** Short paragraphs. Two is the ceiling — this is a scan, not a case study. */
  summary: string[];
  engineeringFocus: string[];
  technologies: string[];
  /** Shape of the tool surface. Counts, not outcomes. */
  architecture: ExperienceMetric[];
  /** One sentence on why the architecture numbers are the interesting part. */
  architectureNote?: string;
  /**
   * Engineering-process figures only. Deliberately never restated as business
   * impact — a test count is evidence of rigour, not of revenue.
   */
  proof: ExperienceMetric[];
  proofNote?: string;
  /**
   * Stated rather than implied. This is a production codebase with other
   * hands on it, and claiming every line would be the one dishonest thing on
   * an otherwise verifiable page.
   */
  contribution?: string;
  links: ExperienceLink[];
};

/** A secondary body of work inside the same role. */
export type SpotlightWork = {
  name: string;
  kicker: string;
  summary: string[];
  /** The single strongest supported result. Rendered larger than the rest. */
  headline?: ExperienceMetric & { note: string };
  points: string[];
  technologies: string[];
  /**
   * Links belonging to this work rather than to the role's featured project.
   *
   * Added because the demo recording is of the vision engine, and it had been
   * sitting under the storefront builder — so the one video on the page was
   * filed against the wrong system.
   */
  links?: ExperienceLink[];
};

export type Experience = {
  /** Stable key, and the slug a future detail route would use. */
  slug: string;
  company: string;
  role: string;
  location: string;
  /** Display strings, not Dates: these are ranges, not instants. */
  start: string;
  end: string;
  /** Machine-readable counterparts for <time dateTime>. */
  startISO: string;
  /** Absent while the role is current — an open range has no end. */
  endISO?: string;
  current: boolean;
  /** The one line the homepage renders. Leads with engineering, not domain. */
  descriptor: string;
  /** The paragraph /experience opens the role with. */
  intro: string;
  /**
   * Secondary specialization. Kept apart from the descriptor so the
   * computer-vision work is represented without leading the positioning.
   */
  alsoWorkingWith?: string[];
  technologies: string[];
  /** Résumé-level bullets. Homepage does not render these; /experience does
      not either — they exist for a future detail route and for parity with
      the printed record. */
  highlights: string[];
  featured?: FeaturedWork;
  /** Rows under the featured project, inside the same role. */
  selectedWork?: WorkRow[];
  spotlight?: SpotlightWork;
  /** Roles that are a set of shipped surfaces rather than one flagship. */
  projects?: WorkRow[];
  metrics?: ExperienceMetric[];
  /**
   * Role-level links, read by the homepage section only.
   *
   * Left empty deliberately. The real destinations belong to the work that
   * produced them and are attached to `featured` and `projects`, where
   * /experience renders them beside the thing they point at; promoting them
   * here would put two outbound links into a homepage summary that is meant
   * to be four lines and a date.
   */
  links: ExperienceLink[];
};

export const experiences: Experience[] = [
  {
    slug: "hyperion",
    company: "Hyperion Future Tech Ventures Pvt. Ltd. (Gudz)",
    role: "Software Engineer Intern",
    location: "Gurugram, India",
    start: "Jul 2026",
    end: "Present",
    startISO: "2026-07",
    current: true,
    /*
      Leads with the agentic storefront platform rather than the vision work.
      The strongest engineering idea in this role is that the agent proposes
      changes and never writes to the database itself, which is an
      architecture and safety decision rather than a model one.
    */
    descriptor:
      "Agentic storefront platform — typed tool calling, validation and approval-driven database mutations. Real-time backend infrastructure in TypeScript, Next.js and Node.js.",
    intro:
      "Software engineering on production AI product systems: an agentic storefront builder on top of a live ERP, a multi-tenant SEO intelligence layer behind it, and the real-time media and inference services of the vision engine. Most of my time goes to backend architecture, the AI tool harness and the reliability work that keeps both honest — and the work goes the whole way, from specification through review and QA to merged and deployed.",
    alsoWorkingWith: [
      "YOLO",
      "GPU inference",
      "3D reconstruction",
      "Computer vision",
    ],
    technologies: [
      "TypeScript",
      "Next.js",
      "Node.js",
      "Vercel AI SDK",
      "Puck",
      "PostgreSQL",
      "Socket.IO",
      "WebRTC",
      "FastAPI",
      "MCP",
    ],
    highlights: [
      "Developed the LLM agent layer for an AI-powered ecommerce builder, enabling natural-language storefront generation through 25 typed tools and helping onboard 3 new B2B clients.",
      "Architected a propose-validate-approve pipeline so every agent change is schema-validated and merchant-approved before it applies, with optimistic concurrency and a 30-scenario eval harness.",
      "Architected a multi-tenant SEO intelligence layer integrating Google Search Console and DataForSEO via a self-hosted MCP server, with caching and spend caps, backed by 1,000+ tests.",
      "Designed a real-time Vision Intelligence Engine streaming multi-camera WebRTC/RTSP feeds for YOLO detection, VLM analysis and GPU-accelerated 3D reconstruction on a RunPod RTX 4090.",
      "Optimized the vision inference pipeline to cut time-to-first-result from 6.6s to 0.3s and lift throughput from 4.09 to 17.7 FPS using streaming inference and asynchronous workers.",
      "Shipped 15 production PRs across ERP inventory, reporting and operations, including costing improvements, authenticated REST APIs and automated stock alerts.",
    ],
    featured: {
      name: "Hyperion — AI Storefront Builder",
      kicker: "Featured",
      summary: [
        "An AI-assisted no-code ecommerce storefront builder. Merchants describe what they want in plain language and the system creates and edits multi-tenant storefronts on top of the catalogue, inventory and orders already held in the ERP — built with Next.js, TypeScript, the Vercel AI SDK and the Puck visual page editor.",
        "The engineering idea is that the model never touches merchant data. It reads, and it writes proposals. Every change moves through proposal, validation, merchant approval and verification before anything is applied, with optimistic locking and stale-read protection so a proposal built against an older version of a shop is refused rather than silently overwriting a newer edit.",
      ],
      contribution:
        "Worked on this as part of a team. My contribution is the architecture and the constraints it enforces, the technical decisions and implementation direction, and the debugging, browser acceptance testing and review that closed them out.",
      engineeringFocus: [
        "AI systems architecture",
        "Typed tool calling",
        "Proposal / apply safety model",
        "Multi-tenant systems",
        "Backend & API engineering",
        "Reliability & validation",
      ],
      technologies: [
        "Next.js",
        "React",
        "TypeScript",
        "Node.js",
        "Hono",
        "tRPC",
        "PostgreSQL",
        "Drizzle",
        "Puck",
        "Vercel AI SDK",
        "Zod",
        "Tailwind",
      ],
      architecture: [
        { value: "25", label: "AI tools" },
        { value: "11", label: "Read-only" },
        { value: "14", label: "Proposal-generating" },
        { value: "0", label: "Direct write tools" },
      ],
      architectureNote:
        "The zero is the design rather than an omission — the write path is unreachable from the model, so the guarantee is a property of the tool surface and not of a prompt.",
      proof: [
        { value: "1,628", label: "Passing tests" },
        { value: "45", label: "Dark-mode verification checks" },
        { value: "22", label: "Contrast tests" },
        { value: "30", label: "Benchmark scenarios" },
      ],
      proofNote:
        "Engineering figures, not business ones. Two bugs that every automated check passed were found by testing in the browser — a CSS specificity failure that left the theme attribute inert, and a hydration mismatch caused by correcting the theme before React hydrated. Both fixes were verified by removing them again and confirming the original failure returned.",
      /* The storefront only. The demo recording is of the vision engine and
         now sits with it, below. */
      links: [
        { label: "Storefront", href: "https://delivery.gudz.in/storefront" },
      ],
    },
    selectedWork: [
      {
        title: "AI harness",
        body: "Typed tool definitions over the Vercel AI SDK with per-turn step budgets, a staleness guard that refuses proposals built from an outdated read, and a durable proposal lifecycle kept out of the model's context. Fixed two accuracy failures: the model answering questions instead of acting, and claiming work it had not done.",
      },
      {
        title: "Theme architecture",
        body: "First-class light, dark and system theming delivered additively, driven by one attribute on the storefront root and resolved entirely through CSS custom properties — no per-component branching, and existing shops render unchanged. The system preference is handled in CSS rather than JavaScript so it stays valid under server rendering.",
      },
      {
        title: "SEO intelligence layer",
        body: "A multi-tenant service that hands the agent real search data instead of guesses — Google Search Console for what a shop already ranks for, DataForSEO for what it could. Both reached through a self-hosted MCP server with caching and per-tenant spend caps, so a chatty agent cannot run up someone else's API bill. Backed by 1,000+ tests.",
      },
      {
        title: "Structured data & content gates",
        body: "Sitemap coverage, canonical handling for paginated and sorted views, and Organization, WebSite, BreadcrumbList and ItemList JSON-LD emitted only from stored values. A content-quality gate rejects keyword stuffing, unverifiable claims and thin copy, so the generator cannot invent product facts to fill a field.",
      },
      {
        /*
          The row that answers "has he shipped against something he did not
          build?" — the storefronts read from this ERP, other teams were
          writing to it at the same time, and the work went through the same
          review and deploy path as theirs.
        */
        title: "Shipped into the production ERP",
        body: "15 merged pull requests across inventory, reporting and operations on the live ERP the storefronts read from — costing corrections, authenticated REST APIs feeding external dashboards, and automated stock alerts. Specification through review, QA and deploy, against a database other teams were working in at the same time.",
      },
      {
        title: "Validation & regression testing",
        body: "Schema validation that rejects unknown keys on write while staying lenient on read, plus a colour-contrast check that blocks unreadable palettes without punishing shops for problems they already had. Verification scripts fail loudly on missing fixtures rather than exiting green with nothing executed.",
      },
    ],
    spotlight: {
      /* The name it ships under internally, rather than a description of it.
         "Real-time warehouse monitoring" said what it watches; this says what
         it is, and it is the name the demo recording is filed under. */
      name: "Vision Intelligence Engine",
      kicker: "Also",
      summary: [
        "A real-time monitoring platform where mobile video is streamed to backend services and consumed three ways at once: object detection, vision-language analysis of on-screen text and unfamiliar objects, and live 3D reconstruction of the space being walked.",
        "I moved the media layer off a peer-to-peer mesh onto an SFU over WHIP and WHEP, so the phone uploads one copy regardless of how many viewers are watching, and rewrote reconstruction from a batch job into a streaming one.",
      ],
      headline: {
        value: "6.6s → 0.3s",
        label: "Time to first geometry",
        note: "Streaming inference in place of whole-clip reconstruction, with async workers keeping network I/O off the inference path.",
      },
      points: [
        "Throughput lifted from 4.09 to 17.7 FPS on the same RunPod RTX 4090, by removing the synchronous network I/O that was blocking the inference loop.",
        "Batch to streaming reconstruction — frame-by-frame inference with incremental fusion, validated as identical to the batch path before it replaced it.",
        "Bounded work queues with backpressure, so capture that outruns inference degrades predictably instead of collapsing throughput.",
        "Point-cloud results streamed to the browser as deltas while the walk is still happening, rather than after it finishes.",
        "Multi-viewer media architecture — publish once, fan out server-side, no per-viewer encode on the device.",
        "A three.js point-cloud viewer with camera trajectory, playback and fly-through navigation.",
      ],
      technologies: [
        "WebRTC",
        "WHIP / WHEP",
        "RTSP",
        "MediaMTX",
        "Socket.IO",
        "Node.js",
        "Python",
        "FastAPI",
        "YOLO",
        "VLM",
        "Three.js",
        "GPU inference",
        "RunPod",
      ],
      links: [{ label: "Watch demo", href: "https://youtu.be/Hon3lwqOFPg" }],
    },
    /*
      Delivery figures, kept separate from the featured project's engineering
      proof. These are the ones that answer whether the work reached anyone:
      merged into a shared codebase, used by named customers, running faster
      than it did.
    */
    metrics: [
      { value: "15", label: "Production PRs merged" },
      { value: "3", label: "B2B clients onboarded" },
      { value: "4.09 → 17.7", label: "Inference FPS" },
    ],
    links: [],
  },
  {
    slug: "founderscart",
    company: "FoundersCart",
    role: "Software Engineer Intern",
    location: "New Delhi, India",
    start: "Jun 2025",
    end: "Nov 2025",
    startISO: "2025-06",
    endISO: "2025-11",
    current: false,
    descriptor:
      "Production CRM extensions and a WebRTC softphone published to the Chrome Web Store — full-stack systems in Node.js, Express, React and GraphQL.",
    intro:
      "Production CRM integrations, communication tooling and scheduling systems — owning backend APIs and frontend integration end to end across four shipped surfaces.",
    technologies: [
      "Node.js",
      "Express",
      "React",
      "GraphQL",
      "WebRTC",
      "Chrome Extensions",
      "Google Calendar API",
      "Google Meet API",
      "Zoom API",
    ],
    highlights: [
      "Developed production monday.com CRM extensions using Node.js, Express, React and GraphQL.",
      "Architected IVR Solution, a WebRTC softphone with click-to-call, call management, automated call logging and real-time contact sync.",
      "Published the softphone to the Chrome Web Store.",
      "Built SensiBot, a real-time multilingual messaging platform.",
      "Built a timezone-aware scheduler integrating the Google Calendar, Google Meet and Zoom APIs.",
    ],
    projects: [
      {
        title: "IVR Solution",
        body: "Architected and built a WebRTC softphone integrated with the monday.com CRM: click-to-call, in-call management, automated call logging written back to the board, and real-time contact synchronisation. Lifted lead generation 15%.",
      },
      {
        title: "Chrome extension",
        body: "Designed, developed and published the IVR Solutions WebRTC softphone to the Chrome Web Store — browser-based dialing, call management and automatic call logging that works across CRM platforms without a native integration on each one. Drove a 20% uplift in qualified leads.",
        links: [
          {
            label: "Chrome Web Store",
            href: "https://chromewebstore.google.com/detail/ivr-solutions-webrtc-soft/keffpnadhppdelceioccednhjdghmbfi",
          },
        ],
      },
      {
        title: "SensiBot",
        body: "A real-time multilingual messaging platform with automated translation between participants, persistent conversation logging, and integration into monday.com workflows so a conversation lands beside the record it belongs to.",
      },
      {
        title: "Meeting scheduler",
        body: "Timezone-aware availability with Google Calendar, Google Meet and Zoom integration — the correct slot in the participant's own zone, and a conferencing link provisioned on whichever platform the invite asks for.",
      },
    ],
    metrics: [
      { value: "15%", label: "Increase in lead generation" },
      { value: "20%", label: "Uplift in qualified leads" },
    ],
    links: [],
  },
];

export type Education = {
  school: string;
  qualifier?: string;
  degree: string;
  start: string;
  end: string;
  /**
   * Label and value kept apart so the figure can be set in tabular figures.
   * Optional as a pair — an entry without one renders no result cell rather
   * than an empty column.
   */
  resultLabel?: string;
  result?: string;
  location: string;
};

export const education: Education[] = [
  {
    school: "Bharati Vidyapeeth's College of Engineering",
    qualifier: "GGSIPU",
    degree: "B.Tech, Information Technology",
    start: "Sep 2023",
    end: "Jun 2027",
    resultLabel: "CGPA",
    /* 8.95 on the current résumé — this said 8.93, from an earlier semester. */
    result: "8.95",
    location: "New Delhi, India",
  },
  {
    school: "Indian Institute of Technology Mandi",
    degree: "Minor in CSE & Advanced Technologies",
    start: "Apr 2025",
    end: "May 2026",
    /* No result shown for the minor. */
    location: "Online",
  },
];

/** Shown once under the record rather than as a list per entry. */
export const coursework = [
  "Data Structures & Algorithms",
  "Operating Systems",
  "DBMS",
  "Computer Networks",
  "System Design",
  "OOP",
];
