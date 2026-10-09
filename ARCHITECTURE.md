# Architecture & Decisions — jayboricha.com

Personal portfolio for Jay Boricha. Astro 4, UnoCSS, fully static, deployed on Netlify at `https://jayboricha.com`.
This file records **why** things are the way they are. Each folder has an `AGENT.md` describing **what** is in it, file by file.

Last major revision: 2026-09-14 (complete revamp from the dark "astro-bento-portfolio" template).

---

## 1. Purpose and positioning

The site has one job: make a hiring manager at a **product company** or a **service company** believe Jay can ship AI features and automations that survive production.

- **Headline claim:** "I build AI workflows that hold up in production."
- **Credibility source:** his day job on offline payments infrastructure at Petpooja (card terminals, QR, settlement, reconciliation). Payments discipline — idempotency, "a retried request can't move money twice", human sign-off — is the *proof* of engineering seriousness, not the headline.
- **Openness:** the hero status pill says "Open to AI engineering roles · currently @ Petpooja". Contact copy says product *or* services roles and LLM-workflow consulting.
- **Order of emphasis everywhere:** AI systems → payments & systems → tech stack (stack is deliberately the quietest thing on the site; frameworks are the most replaceable part of an engineer).

### What the site must never do
- Claim shipped AI work with specifics Jay hasn't confirmed. The "In production" paragraph on `/about` stays category-level (assistants, retrieval, extraction, agents) with `TODO(jay)` markers until he supplies model names and outcomes.
- Show fake project screenshots or links. Projects are `status: "building"` placeholders with typographic covers until they ship.
- Publish invented numbers. Any metric on the site must be one Jay can defend.
- Use AI-hype vocabulary ("AI-powered", "leveraging", "cutting-edge", "passionate about AI", sparkle emoji). Credibility comes from naming failure modes ("Where it doesn't help") and production requirements (evals, confidence gates, idempotent side effects).

---

## 2. Site map

| Route | Source | Content |
|---|---|---|
| `/` | `src/pages/index.astro` | Hero → "What I do" (3 blocks) → Selected work (3 featured projects) → Contact card |
| `/about` | `src/pages/about.astro` | Lead → portrait → Bio → Expertise (AI systems / Payments & systems / Stack) → How I build with AI → Experience → Outside work → Contact |
| `/projects` | `src/pages/projects/index.astro` | All six projects, full variant (description + year + status) |
| `/blog` | `src/pages/blog/index.astro` | Post rows with excerpt, date, reading time; dev.to link |
| `/blog/<slug>` | `src/pages/blog/[...slug].astro` → `PostLayout` | Post with reading-progress bar, prose, author card, prev/next |
| `/rss.xml` | `src/pages/rss.xml.js` | RSS feed (prerendered) |
| `/sitemap-index.xml`, `/robots.txt` | integrations | Generated at build |

Nav labels differ from URLs on purpose: **Work** → `/projects`, **Writing** → `/blog`, **About** → `/about`. URLs were kept stable to avoid redirect debt.

---

## 3. Stack and why

| Choice | Decision | Why |
|---|---|---|
| Framework | **Astro 4.16** (`astro@^4.9.2`) | Already in place; static output is ideal for a portfolio. Not upgraded to Astro 5 during the revamp to limit blast radius. |
| Output | **`output: "static"`, no adapter** | Nothing needs a server. The old config was `output: "server"` + `@astrojs/netlify` (function cold starts for a brochure site) and also carried a `vercel.json` SPA rewrite that would have served the homepage for every route. Netlify serves a static Astro build with zero config. |
| Styling | **UnoCSS 0.60** (`presetUno` + `presetTypography`) | Already installed. `presetTypography` ships inside the `unocss` meta-package, so proper blog prose cost zero new dependencies. |
| Client JS | **None from frameworks.** Solid and Svelte integrations removed. | The only interactive pieces (theme toggle, copy-email, scroll reveal, header border, reading progress) are ~1 KB of vanilla `<script>` blocks hoisted by Astro. "Modern yet simple" in practice. |
| Images | `astro:assets` `<Image>` + `sharp` | Project screenshots (when they exist) and the portrait live in `src/assets/` and are emitted as sized WebP. `sharp` is a direct dependency because it used to arrive transitively via the removed Netlify adapter. |
| Icons | `astro-icon` + `@iconify-json/ri` (Remix Icon) | Inline SVG, tree-shaken, no icon font. `src/icons/` exists (empty) only to silence astro-icon's missing-dir warning. |
| Content | Astro content collection for blog (`src/content/blog`) with a real Zod schema | The old config used `rssSchema` directly, which made `pubDate` optional and forced `|| new Date()` fallbacks everywhere. |
| Projects data | Typed TS module `src/data/projects.ts`, **not** a content collection | No markdown body per project, array order = display order, `featured` subset is a synchronous filter, `ImageMetadata` typing works with imports. Shape is collection-compatible if detail pages are ever wanted. |
| Fonts | Self-hosted **Satoshi** variable (roman + italic) as `.ttf`; system monospace stack | Cabinet Grotesk was dropped — it is the fingerprint of the template the site came from. Fontshare `@import` (render-blocking) was removed. `.ttf` is kept only because `brotli` isn't installed for `pyftsubset`; converting to woff2 is a listed TODO. |
| Package manager | pnpm 10 with `onlyBuiltDependencies: ["esbuild","sharp"]` | pnpm 10 blocks postinstall scripts by default; those two need theirs. |

### Pinned versions that matter
- `@astrojs/sitemap` **3.2.1** — 3.3+ targets Astro 5's build hooks and crashes Astro 4 at `astro:build:done` (`Cannot read properties of undefined (reading 'reduce')`). Do not bump without upgrading Astro.
- `sharp` **0.33.x** — matches Astro 4's expected range.

---

## 4. Theming system

### Tokens
All colour is expressed as **RGB triplets in CSS custom properties** (`--c-canvas: 250 248 245`) defined in `src/styles/global.css`, and mapped into UnoCSS theme colours via `rgb(var(--c-x) / <alpha-value>)` in `uno.config.ts`. Consequences:
- One class name (`bg-surface`, `text-muted`, `border-line`) is correct in both themes — no `dark:` pairs to keep in sync.
- Alpha modifiers work (`bg-canvas/80` on the sticky header, `bg-accent-soft/40` on blog-row hover).
- Non-utility CSS (prose variables, Shiki bridge, `::selection`) reads the same variables.

Semantic set: `canvas, surface, raised, sunken, fg, muted, subtle, line, line-strong, accent, accent-hover, accent-soft, accent-border, accent-contrast, success, shadow`.

### Palette — "ink on warm paper"
Light: warm off-white canvas `#FAF8F5`, white surfaces, warm near-black ink `#1A1815`, rust accent `#B4451F`. Dark: warm charcoal `#131210`, surface `#1C1A17`, ember accent `#F2703C`. Body text is ~16.7:1 in both themes; `muted` ~7.3:1; `subtle` ~4.9:1; accent-on-canvas 5.2:1 light / 6.4:1 dark. Everything clears WCAG AA.

**Dark mode uses no box-shadows.** Elevation is surface-over-canvas plus the hairline border. Light mode has exactly two shadows (`shadow-card`, `shadow-card-lift`), both tinted with ink, never pure black.

### Switching
- `<html data-theme="light|dark">` is the single source of truth. Written by an **inline, synchronous `<script is:inline>`** in `BaseLayout` `<head>` before first paint: `localStorage.theme` → else `prefers-color-scheme` → default light. Wrapped in try/catch because `localStorage` throws in Safari private mode. Also sets `style.colorScheme` so scrollbars and form controls match, and adds `html.js` (used to gate scroll-reveal so no-JS renders visible).
- UnoCSS's `dark:` variant is configured to the same attribute (`dark: { light: '[data-theme="light"]', dark: '[data-theme="dark"]' }`) and is used only for the toggle-icon swap and `dark:shadow-none`.
- `@media (prefers-color-scheme: dark) { :root:not([data-theme]) … }` in `global.css` is a **no-JS-only** fallback; with JS the attribute always exists.
- `ThemeToggle.astro` flips the attribute, persists to `localStorage`, syncs other tabs via the `storage` event, updates its own `aria-label`, and adds `html.theme-transition` for 280 ms so colours cross-fade only during a toggle (never on page load).
- No `<ViewTransitions />`. If ever added, re-assert the theme on `astro:after-swap`.

### Typography
Single family (Satoshi) with hard weight/size contrast; monospace (system stack) as the second voice for labels, dates, stack lists, tags. Fluid `clamp()` sizes live in `theme.fontSize` as **tuples** — a bare string would make UnoCSS emit `line-height: 1`. Keys contain no digits (`text-title`, not `text-h1`) because UnoCSS's colour parser splits letter/digit boundaries.

Scale: `display` (hero only) · `title` (page/post h1) · `section` (h2) · `sub` (h3/card titles) · `lead` · `body` · `small` · `label` (mono uppercase) · `meta` (mono).

---

## 5. Motion policy

Subtle, feedback-only. Defined once as easing tokens (`--ease-standard`, `--ease-out`, `--ease-in-out`), no springs, nothing over 600 ms, never `transition: all`.

| Interaction | Where |
|---|---|
| Nav underline draws left→right on hover, leaves to the right; persists on active page | `.nav-link` in `global.css` |
| Project title underline draws on row hover | `.draw-underline` |
| Project image `scale(1.025)` / cover border strengthens; `↗` nudges 2px | `ProjectRow.astro` |
| Buttons: bg change 160 ms, `scale(.98)` on press | `btn*` shortcuts in `uno.config.ts` |
| Theme toggle: icon crossfade 180 ms, page colours 240 ms only during toggle | `ThemeToggle.astro` + `.theme-transition` |
| Copy-email: label/icon crossfade to "Copied ✓", reverts after 1600 ms, `aria-live` status | `CopyEmail.astro` |
| Header bottom hairline fades in once `scrollY > 8` | `Header.astro` + `.site-header.is-scrolled` |
| Scroll reveal: opacity + **8px** settle, 420 ms, once, section containers only, ≤3 staggered children at 60 ms; hero never reveals | `.reveal` + IntersectionObserver in `BaseLayout` (`threshold: 0, rootMargin: -40px`) |
| Reading-progress bar (posts): 2px accent, `scaleX` in rAF, no transition | `ReadingProgress.astro` |
| Status dot ring pulse 2400 ms | `.status-dot::after` |

`prefers-reduced-motion: reduce` zeroes every animation/transition globally **and** explicitly: the reveal observer is skipped in JS (elements render visible), the status-dot ring is removed, focus rings and the "Copied" state are kept because they are information, not decoration. Hover effects are gated behind `@media (hover: hover) and (pointer: fine)` (UnoCSS `@hover:` variant, or explicit media queries in CSS) so touch devices never get stuck hover states.

Explicitly banned: page loaders, parallax, typewriter/letter reveals, 3D tilt, gradient text, cursor followers, marquees, count-ups, view-transition wipes.

---

## 6. Layout system

- **`BaseLayout.astro`** is the only HTML shell. It owns `<head>` (title, description, canonical, OG/Twitter, RSS alternate, font preload, the inline theme script), the skip link, `<Header/>`, `<main id="main">`, `<Footer/>`, and the scroll-reveal script. Every page uses it, so chrome consistency is structural.
- **`PostLayout.astro`** wraps BaseLayout for blog posts (adds the progress bar, post header, `article.prose`, author card, prev/next).
- The old three-layout arrangement (`BasicLayout`/`Layout`/`LayoutBlogPost`) was deleted. Notably `LayoutBlogPost` **never ran** — markdown `layout:` frontmatter is inert for content-collection entries, which is why blog posts previously rendered with no `<html>` at all.
- Width tokens: `max-w-page` 1120px shell, `max-w-prose` 680px, `max-w-text` 560px. Gutters 20/32/48px via the `container-page` shortcut. Section rhythm 64/80/112px.
- Radius: 10px default, 6px small (chips, toggle), 14px media/portrait, 999px only for the pill and avatar.
- Borders lead, shadows follow: every card/button/media has a 1px `line` hairline; hover → `line-strong`.

---

## 7. Blog pipeline

1. Markdown in `src/content/blog/*.md` with frontmatter validated by `src/content/config.ts` (`title`, `description` default `""`, `pubDate` coerced to Date, optional `updatedDate`/`category`, `tags[]`, `draft`).
2. `remarkReadingTime` (`src/lib/remark-reading-time.mjs`) writes `minutesRead` into `data.astro.frontmatter`. **This only surfaces via `remarkPluginFrontmatter` from `await post.render()`**, never on `post.data` — the blog index and `[...slug].astro` both call `render()` for that reason.
3. `[...slug].astro` passes the entry plus prev/next neighbours through `getStaticPaths` props (no re-fetch/sort/find per page).
4. Prose styling: `presetTypography` with `cssExtend` in `uno.config.ts`; `--un-prose-*` variables are mapped once to `--c-*` tokens in `global.css`, so `class="prose"` is theme-aware with no `prose-invert`.
5. Code blocks: Astro Shiki configured with `themes: { light: "github-light", dark: "github-dark-dimmed" }, defaultColor: false`; `global.css` bridges `--shiki-light/--shiki-dark` per `[data-theme]`. (Current posts use images for code, so this is untested visually but wired.)
6. Drafts (`draft: true`) are hidden from the index, static paths, and RSS in production, visible in dev.
7. RSS is prerendered; `markdown-it` + `sanitize-html` render full post bodies into the feed.

Known content gap: post images are hot-linked to their original dev.to CDN URLs inside the markdown.

---

## 8. Projects model

`src/data/projects.ts` exports `Project[]` and `featuredProjects` (first three with `featured: true`). Fields: `slug, title, tag, audience, tagline, description, stack[], year, status ("live"|"building"|"archived"), proof?, image?, imageAlt?, repo?, demo?, featured?`.

Design intent of the current six: one entry per way a business actually wants to use an LLM — documents in (Docs to Data), questions answered (Knowledge Assistant), actions taken (Ops Agent), inbox automated (Inbox to Actions), exceptions explained (Recon, the payments-domain instance), quality measured (Evalkit). Each has an `audience` so product and service companies both see themselves, and a `proof` phrase naming the property it exists to demonstrate.

`ProjectRow.astro` renders one row in `compact` (homepage) or `full` (projects page) variant. With no `image` it renders a **typographic cover** (tag + big index on a dotted grid) — no fake screenshots. With no links it prints "Links land when it ships." Status other than `live` is shown in the meta line.

**Shipping a project:** add `repo`/`demo`, put a screenshot in `src/assets/projects/`, import it and set `image`/`imageAlt`, flip `status` to `"live"`. The row switches layout automatically.

---

## 9. SEO / meta

`BaseLayout` emits description, canonical (from `Astro.site` + pathname), OG (`type`, `site_name`, `title`, `description`, `url`, `image`), Twitter `summary_large_image`, and the RSS alternate link. `SITE` in `src/lib/constants.ts` holds the defaults. `public/og-image.png` is still from the old dark design and should be regenerated in the light theme (1200×630).

---

## 10. Accessibility commitments

- Skip link to `#main`; `<main>` landmark; nav has `aria-label="Primary"`; active link uses `aria-current="page"`.
- Global `:focus-visible` ring (2px accent, 3px offset), never animated.
- Theme toggle and copy-email buttons have real `aria-label`s; copy status announced via `role="status" aria-live="polite"`.
- Decorative covers/images are `aria-hidden`; the avatar has alt text.
- All text ≥ AA contrast in both themes (see §4).

---

## 11. Repo hygiene decisions

- `.astro/` (generated types) is untracked as of this revision; `dist/`, `.netlify/`, `.DS_Store` ignored.
- Deleted during the revamp: Rive demo, GSAP+Lenis Svelte playground, `Globe.tsx`, `MyStack.astro`, `world.json`, nine unused tech-logo SVGs, preview PNGs, the old bento components, `vercel.json`, `postcss.config.cjs`, `svelte.config.js`, and 12 unused packages.
- `src/lib/ remark-reading-time.mjs` (with a leading space in the filename) was renamed to `remark-reading-time.mjs`.

---

## 12. Open TODOs (search `TODO(jay)`)

- `/about`: Petpooja start date; 2–4 specific experience bullets; model/API names and one measurable outcome for "In production".
- Projects: everything is a placeholder until shipped (see §8).
- `public/resume.pdf` is linked from the hero and contact card but not present.
- Fonts to woff2; OG image regeneration; Netlify custom domain pointed at `jayboricha.com`.

---

## 13. Verification checklist used after every change

```bash
pnpm build            # must exit 0; emits sitemap-index.xml + robots.txt
pnpm dev              # walk /, /about, /projects, /blog, both posts, /rss.xml
```
Then in a browser: both themes; hard reload in dark (no flash); toggle persists and syncs across tabs; keyboard-tab through header/hero/contact (focus rings); copy-email shows "Copied"; ~400px width (nav fits in one row, no hamburger). Note: Chrome may auto-open reader mode on post pages — verify post HTML with `curl` if screenshots look wrong.
