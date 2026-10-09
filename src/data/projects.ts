import type { ImageMetadata } from "astro";

export interface Project {
  slug: string;
  title: string;
  /** The AI pattern this demonstrates. */
  tag: string;
  /** Who buys this. Product and service companies should each see themselves here. */
  audience: string;
  /** One sentence: what it does and why it matters. Shown everywhere. */
  tagline: string;
  /** Two or three sentences. Projects page only. */
  description: string;
  stack: string[];
  year: number;
  status: "live" | "building" | "archived";
  /** The property the project exists to prove. One short phrase. */
  proof?: string;
  /** Optional screenshot. Without one, the row renders a typographic cover. */
  image?: ImageMetadata;
  imageAlt?: string;
  repo?: string;
  demo?: string;
  featured?: boolean;
}

// PLACEHOLDERS — these are projects Jay is building, not shipped work.
// Each entry is honest about that via `status: "building"` and has no links.
// TODO(jay): as each one ships — add `repo`/`demo`, drop a screenshot into
// src/assets/projects/ and set `image`/`imageAlt`, flip `status` to "live",
// and replace `proof` with a real measured number if you have one.
//
// Array order is display order. The set is deliberate: every common way a
// business wants to use an LLM (documents in, questions answered, actions taken,
// exceptions explained, quality measured, inbox automated) — each with evals and
// a human in the loop where the stakes justify it.
export const projects: Project[] = [
  {
    slug: "docs-to-data",
    title: "Docs to Data",
    tag: "Structured extraction",
    audience: "Finance, ops & compliance teams",
    tagline:
      "Turns invoices, statements and KYC documents into validated, structured data — with a human in the loop where confidence is low.",
    description:
      "PDFs or images in, tool-calling extraction against a Zod schema, per-field confidence, and a review screen for the fields the model isn't sure about. Every correction becomes an eval case, so accuracy is measured instead of assumed. Same pipeline, different schemas: invoices, bank statements, ID documents.",
    stack: ["TypeScript", "Next.js", "LangChain", "Anthropic API", "Zod", "PostgreSQL"],
    year: 2026,
    status: "building",
    proof: "Schema-validated · confidence-gated · eval-driven",
    featured: true,
  },
  {
    slug: "knowledge-assistant",
    title: "Knowledge Assistant",
    tag: "RAG",
    audience: "Support & internal teams",
    tagline: "A support and internal-ops assistant that answers from your own docs and shows its sources.",
    description:
      "Ingests help-centre articles, runbooks and past tickets; hybrid keyword + vector retrieval; answers with citations and an explicit “not in the docs” path instead of a guess. A thumbs-down creates an eval case, and a small dashboard tracks answer quality, latency and cost per question over time.",
    stack: ["TypeScript", "Node.js", "LangChain", "pgvector", "Anthropic API", "React"],
    year: 2026,
    status: "building",
    proof: "Cited answers · refusal path · quality tracked",
    featured: true,
  },
  {
    slug: "ops-agent",
    title: "Ops Agent",
    tag: "Tool-calling agents",
    audience: "Ops teams & agencies",
    tagline: "Triages inbound requests and takes the routine actions — with approval gates for anything that matters.",
    description:
      "Reads tickets, emails and form submissions; classifies, enriches from the CRM, and drafts or executes the next step — assign, reply, create a task — through tools. Every side effect is idempotent and logged; anything risky waits for a one-click approval in Slack.",
    stack: ["TypeScript", "Node.js", "LangGraph", "Anthropic API", "Slack API", "PostgreSQL"],
    year: 2026,
    status: "building",
    proof: "Idempotent tools · approval gates · audit log",
    featured: true,
  },
  {
    slug: "inbox-to-actions",
    title: "Inbox to Actions",
    tag: "Workflow automation",
    audience: "Small businesses & service companies",
    tagline:
      "Turns orders, enquiries and complaints arriving by email and WhatsApp into structured records and next steps.",
    description:
      "Classifies each inbound message, extracts the order or enquiry into a schema, creates the record in the CRM or sheet, and drafts the reply — sent automatically above a confidence threshold, queued for review below it. Built for businesses where the inbox is the operations system.",
    stack: ["TypeScript", "Node.js", "LangGraph", "Anthropic API", "WhatsApp Cloud API", "Google Sheets API"],
    year: 2026,
    status: "building",
    proof: "Confidence-gated automation",
  },
  {
    slug: "recon",
    title: "Recon",
    tag: "AI in the loop",
    audience: "Finance & payments teams",
    tagline: "Matches processor settlement files against internal transactions and explains every mismatch.",
    description:
      "Ingests acquirer settlement reports, matches them to captured transactions with tolerance rules for fees and MDR, and produces an exceptions queue. An LLM drafts the explanation for each unmatched row; a human signs off before anything is written back. The payments-domain version of the same pattern as everything above.",
    stack: ["TypeScript", "Node.js", "PostgreSQL", "Anthropic API", "React"],
    year: 2026,
    status: "building",
    proof: "Fee-tolerant matching · human sign-off",
  },
  {
    slug: "evalkit",
    title: "Evalkit",
    tag: "Evals & observability",
    audience: "Any team shipping LLM features",
    tagline: "A small harness for proving an LLM feature got better, not just different.",
    description:
      "Versioned prompts, datasets built from real production corrections, graders (exact match, rubric, model-as-judge), and a regression report on every change with cost and latency per case. The thing to run before touching any prompt that's already in production.",
    stack: ["TypeScript", "Node.js", "SQLite", "Anthropic API"],
    year: 2026,
    status: "building",
    proof: "Regression reports · cost & latency per case",
  },
];

export const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
