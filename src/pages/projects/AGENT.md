# AGENT.md — `src/pages/projects/`

## `index.astro` (24 lines) — `/projects`
- Frontmatter: imports `BaseLayout`, `ProjectRow`, `projects` (the full array from `../../data/projects`), `SITE`.
- `<BaseLayout title="Projects · Jay Boricha" description="What Jay Boricha is building — practical AI workflows: document extraction, a RAG assistant with citations, a tool-calling ops agent, inbox automation, LLM-assisted reconciliation, and an eval harness.">`
- `container-page`:
  - H1 "Projects".
  - Lead (`text-lead text-muted`, `max-w-text`): "Six practical AI workflows — one for each way a business actually wants to use a model — each with evals and a human in the loop where the stakes justify it."
  - Honesty line (`text-small text-subtle`): "Work in progress — code and demos appear here as each one ships."
  - `<ul class="mt-10 border-t border-line md:mt-14">` mapping every project to `<ProjectRow project index variant="full" first={i === 0} />`.

The `full` variant shows the 2–3 sentence `description`, the year, and the status token; the homepage uses `compact` (tagline only). List, not grid, on purpose — wide covers/screenshots need the width, and a scannable left edge beats alternating layouts.

When the placeholder set changes, update the lead sentence's count ("Six …") and the meta description here.
