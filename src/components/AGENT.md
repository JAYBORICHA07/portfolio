# AGENT.md — `src/components/`

Ten `.astro` components (plus `Blog/PostRow.astro` in the subfolder). No framework runtime — interactivity is vanilla `<script>` blocks that Astro hoists and bundles once per site. Every component consumes design tokens via UnoCSS utilities (`bg-surface`, `text-muted`, …) and shortcuts from `uno.config.ts`; none contain hex colours.

Import path from pages: `../components/<Name>.astro`; from layouts: `../components/<Name>.astro`.

---

## `Header.astro` (44 lines)
Sticky site header used on every page via `BaseLayout`.
- Frontmatter: imports `ThemeToggle`, `NAV` and `SITE` from `../lib/constants`; computes `path = Astro.url.pathname`, `isHome`, and `isActive(href)` (exact match or `startsWith(href + "/")`).
- Markup: `<header class="site-header sticky top-0 z-40 bg-canvas/80 backdrop-blur-md">` → `container-page` flex row, `h-16 md:h-18`.
  - Wordmark: plain `<span>` on the homepage (no self-link), `<a href="/">` elsewhere. `text-small font-500 text-fg`.
  - `<nav aria-label="Primary">` with one `<a class="nav-link">` per `NAV` item; `aria-current="page"` when active (drives the persistent underline defined in `global.css`). Text `13px` on mobile, `text-small` from `sm`. No hamburger — three links fit at 360px.
  - `<ThemeToggle />` last.
- Script: toggles `.is-scrolled` on `.site-header` when `window.scrollY > 8` (passive scroll listener, runs once on load). `.is-scrolled` fades in the bottom hairline (CSS in `global.css`).

## `Footer.astro` (30 lines)
- Frontmatter: `Icon`, `SITE`, `SOCIALS`; `year = new Date().getFullYear()`.
- `<footer class="mt-16 border-t border-line md:mt-28">` → `container-page`, stacks on mobile, row on `sm`.
  - Left: `text-meta-mono` "Jay Boricha · © {year}".
  - Right: icon links for each `SOCIALS` entry (`icon-link` shortcut, `aria-label`) plus an RSS link to `/rss.xml` (`ri:rss-line`).
- No colophon by decision.

## `ThemeToggle.astro` (67 lines)
- Button `#theme-toggle`, 36×36, hairline border, `aria-label` starts as "Switch to dark theme".
- Two stacked icons (`ri:sun-line`, `ri:moon-line`) inside an `aria-hidden` span.
- `<style is:global>`: `.theme-icon` transitions opacity/transform 180 ms; `.theme-icon-moon` hidden by default; under `[data-theme="dark"]` sun hides and moon shows. (Pure CSS, driven by the `html` attribute.)
- Script: `apply(theme)` adds `html.theme-transition`, sets `data-theme` + `style.colorScheme`, updates the `aria-label`, removes the class after 280 ms. Click → flips theme and persists to `localStorage.theme` in try/catch. `storage` event listener syncs other tabs. Calls `label()` once on load so the label matches the pre-set theme.

## `StatusPill.astro` (13 lines)
Availability pill at the top of the hero. `<a href={LINKS.petpooja} target=_blank>` styled as a 999px-radius hairline pill on `bg-surface`; contains `<span class="status-dot">` (pulsing green dot from `global.css`) and the text **"Open to AI engineering roles · currently @ Petpooja"**. Change this text when availability changes.

## `CopyEmail.astro` (78 lines)
Clipboard button for the email address; used twice (hero, contact card).
- Props: `variant?: "ghost" | "block"`. `ghost` = `btn-ghost` shortcut (hero, sits beside the primary CTA). `block` = full-width row on `bg-canvas` with hairline border, larger text, hover to `accent-soft`.
- Markup: `<button data-copy-email aria-label="Copy {EMAIL} to clipboard">` containing a grid-stacked label pair (`.copy-label` = email, `.copy-done` = "Copied", `aria-hidden`), a stacked icon pair (`ri:file-copy-line` / `ri:check-line`), and a visually-hidden `[data-copy-status]` with `role="status" aria-live="polite"`.
- `<style is:global>`: 140 ms opacity/translate crossfades; `.is-copied` swaps label and icon.
- Script: for every `[data-copy-email]`, on click `navigator.clipboard.writeText(email)`; on success add `.is-copied`, set status text "Email address copied", clear both after 1600 ms (timer is reset on rapid clicks). On clipboard failure (insecure context / permission), falls back to `window.location.href = mailto:`.
- Note for testing: automation contexts often lack clipboard permission, so a scripted click hits the mailto fallback. Real user clicks work.

## `ContactCard.astro` (36 lines)
`<section aria-labelledby="contact-heading" class="card max-w-[720px] p-6 sm:p-8 lg:p-12">`.
- h2 "Let's build something." (`text-section font-650`).
- Lead paragraph: "Open to AI engineering roles — product or services — and to consulting on LLM workflows and automation. Email is fastest; I reply within a day."
- `<CopyEmail variant="block" />`.
- Link list: each `SOCIALS` entry + Resume (`RESUME` = `/resume.pdf`), with `ri:arrow-right-up-line` that nudges on hover (`group-hover:translate-x-px group-hover:-translate-y-px`).
Used at the bottom of `/` and `/about`. No form by decision (needs a backend, gets spam, converts worse than a copyable address).

## `SectionLabel.astro` (13 lines)
Props: `label: string`, `id?: string`, `class?: string`. Renders a flex row with `border-b border-line pb-3`: `<h2 id={id} class="label-mono">{label}</h2>` on the left and a `<slot />` on the right (used for "All projects →"). The `id` is what sections reference with `aria-labelledby`.

## `ProjectRow.astro` (141 lines)
One project as a horizontal row. Used by the homepage (`variant="compact"`) and the projects page (`variant="full"`).
- Props: `project: Project`, `index: number`, `variant?`, `first?` (only affects image `loading="eager"`).
- Derived: `primaryHref = demo ?? repo`, `num` zero-padded, `hasLinks`, `statusLabel` (`live`→"Live", `building`→"In progress", `archived`→"Archived").
- `<li class="group border-b border-line py-8 md:py-10">` → `<article class="grid gap-6 md:grid-cols-[44fr_56fr] md:gap-10">`.
  - **Left cell:** if `project.image` → `<a>` (16:10, `overflow-hidden`, hairline, `bg-sunken`; hover strengthens border and adds `shadow-card-lift`, none in dark) wrapping `<Image widths=[480,800,1200] sizes=… class="object-cover object-top … group-hover:scale-[1.025]">`. Else → `<div class="project-cover …" aria-hidden>` typographic cover: `tag` top-left in mono, big `num` bottom-left in `text-line-strong` (turns `text-subtle` on hover) over a dotted grid (`radial-gradient` in the scoped global style).
  - **Right cell:** meta line (`num · tag [· year in full] [· STATUS if not live]`) → `<h3 class="text-sub font-600">` with the title as `<a class="draw-underline">` when a link exists, otherwise a `<span>` → paragraph (`description` in full, `tagline` in compact, `max-w-[52ch]`) → "For {audience}" (mono; "For" in `text-subtle`, audience in `text-fg`) → `proof` (mono, `text-fg`) → stack joined with ` · ` (mono, subtle) → link row: `Live ↗` / `Code ↗` (`link-row` + `link-arrow`), or "Links land when it ships." when there are none and status is building.
- `<style is:global>`: `.project-cover` dotted background; `.link-row` colour transition; `.link-arrow` 200 ms transform; hover-gated `translate(2px,-2px)` when the row or link is hovered.

## `HeroDiagram.astro` (190 lines)
Decorative SVG schematic in the hero's right column (`viewBox="0 0 356 410"`, `aria-hidden` + `focusable="false"` — it restates the hero paragraph, so it stays out of the a11y tree). Five stages down a spine at x=178: **INTAKE** (`pdf · email · webhook`), **EXTRACT** (`model · schema`, dashed rect edge = the probabilistic step), **VALIDATE** (`evals · confidence`), **REVIEW** (`human in the loop`, offset left to x=14 so it reads as a branch), **COMMIT** (`idempotent · logged`).
- **One continuous route path** threaded through every node centre, drawn *under* the opaque node rects so the travelling dash reads as a signal entering a stage and leaving it. Three copies of the same `d`: `.hd-route` (static hairline), `.hd-trail` (width 5, opacity .16), `.hd-packet` (width 2.25).
- `.hd-packet`/`.hd-trail` carry `pathLength="100"`, so the dash keyframes need no measuring: `stroke-dasharray: 7 93` with `stroke-dashoffset` 100→0 over one 9s linear loop (seamless — one full pattern period). The trail runs 114→14, i.e. shifted +14 so it sits *behind* the head rather than ahead of it.
- `.hd-bypass` is the dashed "high confidence" edge from VALIDATE's right side around to COMMIT, skipping the review gate. Both branches are labelled (`.hd-note`, the right one rotated 90°).
- **Stage pulses** (`hd-rect` on the rect, `hd-text` on the label) share the same 9s loop, with the flash at keyframes 50–58%. Each node's `animation-delay` places that flash where the dash actually is: `D = (f − 0.5) × 9s`, normalised negative. Route length is **564.9u**; f = .0496 / .1983 / .3470 / .6328 / .9186 → delays −4.05 / −2.72 / −1.38 / −7.81 / −5.23s. **Recompute these if you move a node** — the file header documents the method.
- Both line groups sit under `mask="url(#hd-mask)"`, a vertical white→transparent gradient that fades the wires out at the top and bottom edges so the stream reads as continuing off-canvas.
- Colours are all `rgb(var(--c-*))`, so light/dark come free. `prefers-reduced-motion: reduce` hides the packet and trail and stops the pulses — the schematic still reads statically.
- Carries **no numbers**: nothing in it is a claim (see `ARCHITECTURE.md` §copy discipline).
Nodes are 168×44 on an 84px pitch (compressed from 48/96 so the whole hero clears a ~790px laptop fold without scrolling — box and text sizes were left alone, only the gaps tightened). Rendered 340px wide → ~392px tall.
Used only by `src/pages/index.astro`, in a `hidden lg:block` wrapper.

## `ReadingProgress.astro` (28 lines)
Fixed 2px `bg-accent` bar at the top of the viewport, `origin-left scale-x-0`, `aria-hidden`. Script computes `scrollY / (scrollHeight − innerHeight)` inside `requestAnimationFrame` (throttled with a `ticking` flag) and sets `transform: scaleX(p)`. No CSS transition — it must track scroll 1:1. Used only by `PostLayout`.

## `Blog/`
See `Blog/AGENT.md` — `PostRow.astro`, the blog index row.

---

## Deleted in the revamp (do not resurrect)
`IntroCard`, `AboutMe`, `ContactsCard`, `Now`, `TimeZoneCard`, `Card/index` + `Card/Content`, `Button`, `Pulse`, `Span`, `Project/ProjectCard`, `Tooltip/` (Solid), `Globe.tsx`, `MyStack`, `playground/` (Rive + GSAP/Lenis Svelte). Their responsibilities are covered by the components above; `Pulse` became `.status-dot` CSS.
