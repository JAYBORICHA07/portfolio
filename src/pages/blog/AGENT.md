# AGENT.md — `src/pages/blog/`

Blog routes: the index and the dynamic post page.

## `index.astro` (50 lines) — `/blog`
### Frontmatter
```ts
const entries = (await getCollection("blog", ({ data }) => !data.draft || import.meta.env.DEV))
  .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
// Reading time only exists on remarkPluginFrontmatter, so render() each entry:
const posts = await Promise.all(entries.map(async (post) => {
  const { remarkPluginFrontmatter } = await post.render();
  return { post, minutesRead: remarkPluginFrontmatter.minutesRead as string | undefined };
}));
```
### Markup
`<BaseLayout title="Writing · Jay Boricha" description=…>` → `container-page` → `max-w-[720px]`:
- H1 "Writing" (`text-title font-700`), lead "Notes on TypeScript, APIs and the tools I build with."
- `<ul class="mt-10 border-t border-line md:mt-14">` of `<PostRow title description date url=/blog/{slug} category minutesRead />`.
- Trailing line "I also post on dev.to ↗" (`link-accent`) — honest about the small archive.

## `[...slug].astro` (40 lines) — `/blog/<slug>`
### `getStaticPaths()`
Fetches and sorts the collection the same way (drafts visible in dev only), then returns one path per post with **props** `{ post, next: posts[i-1], prev: posts[i+1] }`. Because the array is newest-first, "next" is the newer post and "prev" the older one. Passing the entry via props avoids the old pattern of re-fetching, sorting and `.find()`-ing on every page and makes a missing entry impossible by construction.

### Render
```ts
const { post, prev, next } = Astro.props;
const { Content, remarkPluginFrontmatter } = await post.render();
const toNeighbour = (p) => p ? { title: p.data.title, url: `/blog/${p.slug}` } : undefined;
```
`<PostLayout title description pubDate minutesRead={remarkPluginFrontmatter.minutesRead} category prev next><Content /></PostLayout>`.

### History
Before the revamp this file emitted a bare `<Content />` with **no HTML shell** (the intended `LayoutBlogPost` never ran because `layout:` frontmatter is inert for collections) plus an unscoped `<style is:global>` block with hard-coded light-mode hex colours. Both are gone; prose styling now comes from `presetTypography` + the `--un-prose-*` bridge in `global.css`.

### Verification quirk
Chrome (in the owner's profile) tends to auto-open Reader Mode on these pages, which replaces the DOM. If a screenshot shows a "View original" link and no site header, that's the browser, not the site — check with `curl http://localhost:4321/blog/<slug> | grep site-header`.
