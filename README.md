# jayboricha.com

Personal site — Astro 4 + UnoCSS, fully static, deployed on Netlify.

## Run it

```bash
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # static output in dist/
pnpm preview    # serve dist/
pnpm check      # astro type-check
```

## Where things live

| What | Where |
|---|---|
| Site name, URL, email, socials, nav | `src/lib/constants.ts` |
| Projects (order = display order; `featured` → homepage) | `src/data/projects.ts` |
| Project screenshots | `src/assets/projects/` (optimized by `<Image>` at build) |
| Blog posts | `src/content/blog/*.md` (frontmatter schema in `src/content/config.ts`) |
| Colors / tokens (light + dark) | `src/styles/global.css` (`--c-*` RGB triplets) |
| Utilities, type scale, shortcuts | `uno.config.ts` |
| Page shell, meta/OG, theme script | `src/layouts/BaseLayout.astro` |

The theme toggle stores `theme` in `localStorage`; first visit follows `prefers-color-scheme`.

## Before deploying — search the code for `TODO(jay)`

- **Hero:** replace `[X]` merchant count in `src/pages/index.astro` (or drop the clause).
- **About:** Petpooja start date and 2–3 specific bullets in `src/pages/about.astro`; model/API names and one measurable outcome in the "In production" paragraph.
- **Projects:** the five entries in `src/data/projects.ts` are placeholders for work in progress (`status: "building"`, no links). As each ships: add `repo`/`demo`, a screenshot in `src/assets/projects/` (`image`/`imageAlt`), flip `status` to `"live"`.
- **Resume:** drop your PDF at `public/resume.pdf` (linked from the hero and contact card).
- **Fonts:** optional — convert `public/fonts/*.ttf` to woff2 (`pip install fonttools brotli`, `pyftsubset … --flavor=woff2`) and add a woff2 `src` in `global.css`.
- **OG image:** `public/og-image.png` is from the old dark design; regenerate in the light theme (1200×630).
- **Netlify:** point the site at `jayboricha.com` — `astro.config.mjs` already uses it as `site` for canonical URLs, sitemap, and RSS.
