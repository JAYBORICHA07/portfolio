# AGENT.md — repository root

Read `ARCHITECTURE.md` first for the *why*. This file describes the root folder file by file and the conventions for working in this repo. Every subfolder has its own `AGENT.md` with the same level of detail — except under `src/content/`, where the files are named `_AGENT.md` because Astro would otherwise parse them as collection entries and fail the build.

## What this repo is
Jay Boricha's personal portfolio (`https://jayboricha.com`). Astro 4 + UnoCSS, fully static, deployed on Netlify, pnpm-managed. No client-side framework; a handful of vanilla `<script>` blocks.

## Commands
```bash
pnpm install        # pnpm 10; esbuild + sharp postinstall scripts are allow-listed in package.json
pnpm dev            # http://localhost:4321 (hot reload, drafts visible)
pnpm build          # static build → dist/  (also emits sitemap-index.xml, sitemap-0.xml, robots.txt)
pnpm preview        # serve dist/
pnpm check          # `astro check` (needs @astrojs/check + typescript installed if you want to run it)
```

## Root files

### `astro.config.mjs` (22 lines)
- Imports: `defineConfig`, `sitemap` (`@astrojs/sitemap`), `robotsTxt` (`astro-robots-txt`), `UnoCSS` (`@unocss/astro`), `icon` (`astro-icon`), and `remarkReadingTime` from `./src/lib/remark-reading-time.mjs`.
- `site: "https://jayboricha.com"` — required by sitemap and RSS; also used for canonical/OG URLs in `BaseLayout`.
- `output: "static"` — no adapter. (Was `"server"` + Netlify adapter before the revamp.)
- `integrations: [sitemap(), robotsTxt(), UnoCSS({ injectReset: true }), icon()]` — `injectReset` pulls `@unocss/reset/tailwind.css`.
- `markdown.remarkPlugins: [remarkReadingTime]` and `markdown.shikiConfig: { themes: { light: "github-light", dark: "github-dark-dimmed" }, defaultColor: false, wrap: true }` — dual-theme code highlighting; `global.css` picks the theme via `[data-theme]`.

### `uno.config.ts` (133 lines)
The design system in code. See `ARCHITECTURE.md` §4.
- `const c = (v) => \`rgb(var(${v}) / <alpha-value>)\`` — helper that turns a CSS-variable triplet into an alpha-capable colour.
- `presetUno({ dark: { light: '[data-theme="light"]', dark: '[data-theme="dark"]' } })`.
- `presetTypography({ cssExtend })` — prose overrides: h2/h3 sizes and margins, paragraph spacing, link underline behaviour, list markers, inline `code` on `accent-soft` bg, `pre` with hairline border and 10px radius, blockquote with 3px `accent-border` rule and no italics/quotes, images with border and margin, table header in mono uppercase, `scroll-margin-top: 6rem` on headings (offset for the sticky header). **Do not** use `:where(...)` keys here — it broke the preset's selector nesting and produced invalid CSS.
- `theme.colors`: `canvas, surface, raised, sunken, fg, muted, subtle, line{DEFAULT,strong}, accent{DEFAULT,hover,soft,border,contrast}, success`.
- `theme.fontFamily`: `sans` = Satoshi + system stack; `mono` = system monospace stack.
- `theme.fontSize` (tuples only): `display, title, section, sub, lead, body, small, label, meta`.
- `theme.maxWidth`: `page` 1120px, `prose` 680px, `text` 560px.
- `theme.boxShadow`: `card`, `card-lift` (ink-tinted, light mode only in practice).
- `theme.easing`: `standard, out, in-out` → utilities `ease-standard` etc.
- `shortcuts`: `container-page`, `label-mono`, `text-meta-mono`, `btn`, `btn-primary`, `btn-ghost`, `card`, `link-accent`, `icon-link`. Use these before inventing new class strings.
- Variant note: UnoCSS's `@hover:` already appends `:hover` **and** wraps in `@media (hover: hover) and (pointer: fine)`. Write `@hover:text-fg`, never `@hover:hover:text-fg`. For group hover use plain `group-hover:`.

### `package.json` (38 lines)
- `name: jayboricha-portfolio`, `version: 1.0.0`, `type: module`.
- Scripts: `dev`, `start`, `build`, `preview`, `check`, `astro`.
- `dependencies`: `@astrojs/rss`, `@astrojs/sitemap` (**pinned ^3.2.1 — see ARCHITECTURE §3**), `@iconify-json/ri`, `astro`, `astro-icon`, `astro-robots-txt`, `markdown-it`, `mdast-util-to-string`, `reading-time`, `sanitize-html`, `sharp`.
- `devDependencies`: `@unocss/astro`, `@unocss/reset`, `unocss`.
- `pnpm.onlyBuiltDependencies: ["esbuild", "sharp"]` — pnpm 10 blocks install scripts otherwise and the build fails with "Could not find Sharp".

### `pnpm-lock.yaml`
Lockfile. Commit it. Regenerate only via `pnpm install`.

### `tsconfig.json` (3 lines)
`{ "extends": "astro/tsconfigs/strict" }`. The old `jsx`/`jsxImportSource: solid-js` settings were removed with Solid.

### `README.md` (37 lines)
Human quick-start: commands, "where things live" table, and the **before-deploy TODO list** (`TODO(jay)` items). Keep it in sync when TODOs are resolved.

### `ARCHITECTURE.md`
All architectural decisions and their reasoning. Update it when a decision changes, not when a file changes.

### `.gitignore`
`node_modules`, `dist`, `.astro` (generated types — was wrongly tracked before), `.netlify`, `.DS_Store`.

### Generated / not committed
- `.astro/` — Astro's generated content-collection types (`types.d.ts`, `icon.d.ts`, `settings.json`). Regenerated by `astro dev`/`astro sync`.
- `dist/` — build output.
- `.netlify/` — leftover from an old adapter build; safe to delete.
- `node_modules/`.

## Folders
| Folder | Purpose | Details |
|---|---|---|
| `public/` | Files copied verbatim to the site root: favicon, fonts, OG image (and, once added, `resume.pdf`) | `public/AGENT.md` |
| `src/` | All source | `src/AGENT.md` |

## Conventions for anyone (human or agent) editing this repo
1. **Copy discipline.** No invented metrics, no unconfirmed production claims, no AI-hype vocabulary. Placeholders are marked `TODO(jay)` in code and listed in `README.md`.
2. **Tokens, not colours.** Never write a hex colour in a component. Use `bg-canvas / bg-surface / text-fg / text-muted / text-subtle / border-line / text-accent …`. Add new tokens in `src/styles/global.css` (both themes) and `uno.config.ts`.
3. **Both themes, always.** Anything new must be checked in light and dark. Dark mode has no shadows.
4. **Motion budget.** Reuse the existing patterns (`.reveal`, `.draw-underline`, `btn*`, `link-row`). Nothing over 600 ms, nothing on page load except the hero being visible.
5. **Type scale.** Use `text-display/title/section/sub/lead/body/small/label/meta`; don't add ad-hoc `text-[…]` sizes unless it's a one-off in a cover or illustration.
6. **Verify.** `pnpm build` must exit 0. Then check every route in `pnpm dev`.
7. Keep every `AGENT.md` current when you add, remove, or materially change a file in its folder.
