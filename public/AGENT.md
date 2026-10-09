# AGENT.md — `public/`

Static files copied **verbatim** to the site root at build (`public/x.png` → `https://jayboricha.com/x.png`). Nothing here is processed, hashed, or optimized. Images that should be optimized belong in `src/assets/` instead.

## Files

### `favicon.ico`
Browser tab icon, referenced by `<link rel="icon" type="image/x-icon" href="/favicon.ico">` in `src/layouts/BaseLayout.astro`. Carried over from the old site; not redesigned.

### `og-image.png` (1200×630)
Social share image, referenced absolutely as `og:image` / `twitter:image` by `BaseLayout` (default from `SITE.ogImage`). **Still the old dark-template design** — TODO(jay): regenerate in the light theme (warm paper `#FAF8F5`, name in Satoshi 700, one mono line such as `SOFTWARE ENGINEER · AI SYSTEMS · INDIA`, a 4px rust rule, small avatar). Keep the filename so no code changes are needed.

### `fonts/`
Self-hosted Satoshi variable fonts. See `fonts/AGENT.md`.

## Expected but not yet present

### `resume.pdf`
Linked as `/resume.pdf` (`RESUME` in `src/lib/constants.ts`) from the hero meta rail and the contact card. Until the file is added those links 404. Drop the PDF here with exactly that name.

## Generated at build (not in this folder, but end up beside these in `dist/`)
`sitemap-index.xml`, `sitemap-0.xml` (`@astrojs/sitemap`), `robots.txt` (`astro-robots-txt`, allows all and points at the sitemap), `rss.xml` (from `src/pages/rss.xml.js`).

## Removed during the revamp
Nine tech-logo SVGs (`express.svg`, `github.svg`, `nextjs.svg`, `reactjs.svg`, `tailwindcss.svg`, `typescript.svg`, `prisma.svg`, `postgresql-svgrepo-com.svg`, `vercel.svg`), `globe_preview.png`, `preview.png`, `me.webp`, the four project screenshots (`fsa.png`, `pdm.png`, `us.png`, `rqg.png`), and `me.png` (moved to `src/assets/`).
