# AGENT.md — `src/layouts/`

Two layouts. `BaseLayout` is the only HTML shell; `PostLayout` composes it for blog posts. The three old layouts (`BasicLayout`, `Layout`, `LayoutBlogPost`) were deleted — the last one never actually ran because markdown `layout:` frontmatter is ignored for content-collection entries.

---

## `BaseLayout.astro` (98 lines)

### Frontmatter
- `import "../styles/global.css"` — the **only** place the global stylesheet is imported.
- Imports `Header`, `Footer`, `SITE`.
- Props: `title: string` (required, full `<title>` text — pages pass e.g. `About · Jay Boricha`), `description?` (defaults `SITE.description`), `image?` (defaults `SITE.ogImage` = `/og-image.png`), `type?: "website" | "article"` (default `website`).
- `canonical = new URL(Astro.url.pathname, Astro.site ?? SITE.url)`; `ogImage` likewise absolute.

### `<head>` (in order)
1. charset, viewport (`width=device-width, initial-scale=1`).
2. **Inline theme script** (`<script is:inline>`, must stay inline and synchronous — Astro would otherwise bundle/defer it and the page would flash). It: adds `html.js`; reads `localStorage.theme` (`"light"|"dark"` only), else `matchMedia("(prefers-color-scheme: dark)")`, else `"light"`; everything in try/catch; sets `data-theme` and `style.colorScheme`.
3. `<title>`, `<meta name="description">`, canonical `<link>`, favicon, RSS `<link rel="alternate" type="application/rss+xml">`, generator.
4. Open Graph: `og:type`, `og:site_name`, `og:title`, `og:description`, `og:url`, `og:image`. Twitter: `summary_large_image`, title, description, image.
5. `<link rel="preload" href="/fonts/Satoshi-Variable.ttf" as="font" type="font/ttf" crossorigin>` — roman face only; the italic is not preloaded. (`crossorigin` is required even same-origin or the font is fetched twice.)

### `<body class="flex min-h-screen flex-col bg-canvas font-sans text-body text-fg antialiased">`
- Skip link (`sr-only`, becomes visible on focus) → `#main`.
- `<Header />`, `<main id="main" class="flex-1"><slot /></main>`, `<Footer />`.
- **Scroll-reveal script** (hoisted, runs on every page): collects `.reveal` elements; if `prefers-reduced-motion: reduce` or no `IntersectionObserver`, adds `.is-visible` to all immediately; otherwise observes with `{ threshold: 0, rootMargin: "0px 0px -40px 0px" }` and adds `.is-visible` once, then unobserves. The CSS side (`html.js .reveal …`) lives in `global.css`. Stagger is done per element with inline `style="transition-delay: Nms"` in the page markup.

### Rules
- Never put `data-theme` in the markup — the script owns it.
- Adding `<ViewTransitions />` would require re-applying the theme on `astro:after-swap`; not currently used.

---

## `PostLayout.astro` (105 lines)

### Frontmatter
- Imports `Image`, `Icon`, `BaseLayout`, `ReadingProgress`, `formatDate`, `SITE`, `SOCIALS`, and `me` from `../assets/me.png`.
- Props: `title`, `description`, `pubDate: Date`, `minutesRead?`, `category?`, `prev?: { title, url }`, `next?: { title, url }`.

### Markup
- `<BaseLayout title={`${title} · ${SITE.name}`} description={description} type="article">`.
- `<ReadingProgress />` (fixed 2px accent bar).
- `container-page` → `mx-auto max-w-prose` (680px) column:
  1. `← Writing` back link to `/blog` (`text-subtle`, arrow nudges left on hover).
  2. `<header class="mt-8 border-b border-line pb-8">`: `category` as `label-mono text-accent`; `<h1 class="text-title font-700 max-w-[22ch]">`; meta line `<time datetime>` + ` · {minutesRead}`.
  3. `<article class="prose mt-10 max-w-none"><slot /></article>` — `max-w-none` overrides the preset's 65ch so the header and body share the 680px measure.
  4. Author card (`card`, 48px round avatar via `<Image width={96}>`, "Written by Jay Boricha", one-line role, social links with `↗`).
  5. Prev/next nav (`aria-label="Adjacent posts"`, 2-col from `sm`, titles truncate, right column right-aligned).

Used only by `src/pages/blog/[...slug].astro`, which supplies `minutesRead` from `remarkPluginFrontmatter` and computes the neighbours.
