# AGENT.md — `src/components/Blog/`

Blog-specific components. Currently one file.

## `PostRow.astro` (30 lines)
One row in the `/blog` index.
- Props: `title: string`, `description: string`, `date: Date`, `url: string`, `category?: string`, `minutesRead?: string`.
- Imports `formatDate` from `../../lib/helpers` (renders e.g. "Mar 6, 2023").
- Markup: `<li class="border-b border-line">` → a single `<a href={url}>` that is the whole click target. The anchor uses `-mx-4 px-4` negative-margin bleed so its hover tint (`@hover:bg-accent-soft/40`, 160 ms) extends past the text, `py-7 sm:py-8`, `rounded-[10px]`, and `group`.
  - `category` (if present) as `label-mono text-accent` (e.g. "DEV").
  - `<h3 class="… text-sub font-600 text-fg group-hover:text-accent">` title, `max-w-[28ch]`.
  - `description` (if non-empty) as `text-body text-muted line-clamp-2`, `max-w-[60ch]`.
  - Meta line in `text-meta-mono`: `<time datetime={ISO}>{formatDate(date)}</time>` and ` · {minutesRead}` when provided.
- Nothing moves on hover — only colour, by design.

Rendered by `src/pages/blog/index.astro`, which supplies `minutesRead` from `remarkPluginFrontmatter` after calling `post.render()` (reading time is not on `post.data`).
