# _AGENT.md — `src/content/`

> Named `_AGENT.md` (underscore) on purpose: Astro treats every `.md` under `src/content/` as a collection entry unless the filename starts with `_`. A plain `AGENT.md` here breaks the build.

Astro content collections. One collection: `blog`.

## `config.ts` (16 lines)
```ts
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().default(""),
    pubDate: z.coerce.date(),          // required; "2023-03-06" → Date
    updatedDate: z.coerce.date().optional(),
    category: z.string().optional(),   // shown as a mono label, e.g. "DEV"
    tags: z.array(z.string()).default([]),   // not rendered yet
    draft: z.boolean().default(false),       // hidden in prod (index, static paths, RSS); visible in dev
  }),
});

export const collections = { blog };
```
Why a hand-written schema: the previous config used `@astrojs/rss`'s `rssSchema` directly, which made `pubDate` optional and stripped `category`, forcing `|| new Date()` fallbacks in every consumer. With this schema `post.data.pubDate` is always a `Date`.

Consumers: `src/pages/blog/index.astro`, `src/pages/blog/[...slug].astro`, `src/pages/rss.xml.js`. All three sort by `pubDate` descending and filter drafts with `!data.draft || import.meta.env.DEV` (RSS filters drafts unconditionally).

## `blog/`
The markdown posts. See `blog/_AGENT.md`.

## Adding a post
1. Create `src/content/blog/<Title>.md` (the filename becomes the slug via Astro's slugify — spaces/colons are fine, e.g. `What is tRPC and how can we use it in our Apps.md` → `/blog/what-is-trpc-and-how-can-we-use-it-in-our-apps`).
2. Frontmatter: at minimum `title`, `pubDate`, and a real `description` (it is the excerpt on `/blog` — an empty one leaves the row without an invitation).
3. Do **not** add `layout:` — it is ignored for collection entries and was the source of a long-standing rendering bug.
4. Reading time is computed automatically by the remark plugin.
5. Fenced code blocks get dual-theme Shiki highlighting; images get a hairline border and 10px radius from the prose preset.
