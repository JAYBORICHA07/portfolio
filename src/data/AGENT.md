# AGENT.md — `src/data/`

Typed, code-defined data that isn't markdown. Currently one module.

## `projects.ts` (123 lines)

### Type
```ts
export interface Project {
  slug: string;            // stable id, used as a key
  title: string;
  tag: string;             // the AI pattern shown on the cover + meta line, e.g. "RAG"
  audience: string;        // rendered as "For {audience}" — who buys this
  tagline: string;         // one sentence; homepage rows
  description: string;     // 2–3 sentences; projects page rows
  stack: string[];         // rendered joined with " · "
  year: number;
  status: "live" | "building" | "archived";   // anything but "live" is shown in the meta line
  proof?: string;          // the property the project exists to prove, e.g. "Cited answers · refusal path"
  image?: ImageMetadata;   // imported from ../assets/projects/…; absent → typographic cover
  imageAlt?: string;
  repo?: string;
  demo?: string;
  featured?: boolean;      // first three featured render on the homepage
}
export const projects: Project[]
export const featuredProjects = projects.filter(p => p.featured).slice(0, 3);
```
Optional `repo`/`demo` (not empty strings) so `{project.repo && …}` is a real presence check.

### Current entries — all `status: "building"`, no links, no images (placeholders Jay intends to build)
| # | slug | title | tag | audience | featured |
|---|---|---|---|---|---|
| 1 | `docs-to-data` | Docs to Data | Structured extraction | Finance, ops & compliance teams | ★ |
| 2 | `knowledge-assistant` | Knowledge Assistant | RAG | Support & internal teams | ★ |
| 3 | `ops-agent` | Ops Agent | Tool-calling agents | Ops teams & agencies | ★ |
| 4 | `inbox-to-actions` | Inbox to Actions | Workflow automation | Small businesses & service companies | |
| 5 | `recon` | Recon | AI in the loop | Finance & payments teams | |
| 6 | `evalkit` | Evalkit | Evals & observability | Any team shipping LLM features | |

Design intent: one entry per way a business actually wants to use an LLM — documents in, questions answered, actions taken, inbox automated, exceptions explained (payments-domain instance), quality measured. Each `description` states the mechanism (schema validation, confidence gates, citations + refusal path, idempotent tools + approval gates, corrections → eval set) rather than adjectives. Stacks are 3–6 real items.

**LangChain / LangGraph placement** — named only where the framework matches the shape of the work, not sprayed across all six: **LangChain** on `docs-to-data` (extraction chains) and `knowledge-assistant` (hybrid retrieval over pgvector); **LangGraph** on `ops-agent` and `inbox-to-actions` (stateful graphs with interrupts — the approval-gate / confidence-gate pattern both describe). Deliberately absent from `recon` (matching is rule-based; the model only drafts explanations) and `evalkit` (a harness you run *against* prompts, framework-light by design). Both also appear on the `/about` stack line.

### Rules
- Array order **is** display order (newest/most important first). No separate `order` field.
- Never set `status: "live"` or add `demo`/`repo` for something that isn't actually public.
- `proof` should become a measured number once one exists (e.g. "94% field accuracy on 300 invoices").
- Keep `tagline` under ~25 words; it must read well at `max-w-[52ch]` beside a 44%-width cover.
- When a project ships: add the screenshot to `src/assets/projects/`, `import` it at the top of this file, set `image`/`imageAlt`, add links, flip `status`. `ProjectRow.astro` handles the rest.

### Consumers
- `src/pages/index.astro` → `featuredProjects`, `<ProjectRow variant="compact">`.
- `src/pages/projects/index.astro` → `projects`, `<ProjectRow variant="full">`.

### Why not a content collection
No markdown body per project, ordering would need an extra field and a sort in each consumer, the featured subset is a synchronous filter, and `ImageMetadata` typing works directly with imports. The shape is deliberately collection-compatible if `/projects/<slug>` detail pages are ever wanted.
