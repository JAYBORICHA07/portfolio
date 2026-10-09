# AGENT.md — `src/lib/`

Small shared modules: site constants, one formatter, one remark plugin.

## `constants.ts` (31 lines)
Single source of truth for identity strings. Change values here, never inline in components.
```ts
export const SITE = {
  name: "Jay Boricha",
  url: "https://jayboricha.com",
  title: "Jay Boricha — Software Engineer, AI Systems",   // homepage <title>
  description: "Jay Boricha — software engineer building practical AI workflows (document extraction, RAG assistants, tool-calling agents) with production discipline from offline payments infrastructure at Petpooja, India.",  // default meta description
  ogImage: "/og-image.png",
  location: "India · IST",           // hero meta rail
};
export const EMAIL = "jayboricha707@gmail.com";
export const RESUME = "/resume.pdf";  // file not yet in public/ — TODO(jay)
export const LINKS = { github, linkedin, devto, petpooja };   // full URLs
export const SOCIALS = [              // rendered in hero, footer, contact card, post author card
  { label: "GitHub",   href: LINKS.github,   icon: "ri:github-fill" },
  { label: "LinkedIn", href: LINKS.linkedin, icon: "ri:linkedin-box-fill" },
  { label: "dev.to",   href: LINKS.devto,    icon: "ri:article-line" },
];
export const NAV = [                  // header order; labels differ from URLs on purpose
  { label: "Work",    href: "/projects" },
  { label: "Writing", href: "/blog" },
  { label: "About",   href: "/about" },
];
```
Discord was dropped from the socials on purpose (weakens the professional read). The previous `loaderAnimation` export (for the removed `motion` page loader) is gone.

## `helpers.ts` (7 lines)
```ts
export function formatDate(date: Date): string  // "en-US", { year: "numeric", month: "short", day: "numeric" } → "Mar 6, 2023"
```
Used by `components/Blog/PostRow.astro` and `layouts/PostLayout.astro`. The old Italy/IST clock helpers were deleted with the TimeZone card.

## `remark-reading-time.mjs` (12 lines)
Remark plugin registered in `astro.config.mjs` (`markdown.remarkPlugins`). Uses `mdast-util-to-string` to flatten the tree and `reading-time` to compute `"N min read"`, then writes `data.astro.frontmatter.minutesRead`.

**Important:** values written this way surface only through `remarkPluginFrontmatter` returned by `await entry.render()` — they are *not* on `entry.data`. Both `pages/blog/index.astro` and `pages/blog/[...slug].astro` call `render()` for this reason.

The file used to be named ` remark-reading-time.mjs` with a leading space (and imported that way); it was renamed on 2026-09-10.
