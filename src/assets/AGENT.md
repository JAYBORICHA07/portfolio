# AGENT.md — `src/assets/`

Images that go through Astro's image pipeline (`astro:assets` `<Image>` + `sharp`). Anything here is imported in code, resized, converted to WebP at build, and emitted to `dist/_astro/<name>.<hash>.webp` with intrinsic width/height (no layout shift). Files that must be served verbatim (favicon, fonts, OG image, resume) belong in `public/`, not here.

## Files

### `me.png` (433×577, ~300 KB source)
Jay's portrait — a cutout with a transparent background (dark cap, denim jacket). Imported as `me` in:
- `src/pages/index.astro` — hero meta rail, `width={112}`, `densities={[1,2]}`, rendered as a 56px circle (`h-14 w-14 rounded-full object-cover object-top`), `loading="eager"`.
- `src/pages/about.astro` — `width={320}`, rendered 96/128/160px square with 14px radius.
- `src/layouts/PostLayout.astro` — author card, `width={96}`, 48px circle.
`object-top` matters: the source isn't square, so the crop keeps the face.

## `projects/` (currently absent)
Was deleted when the old projects were retired. Recreate it when a project ships:
```ts
// src/data/projects.ts
import docsToData from "../assets/projects/docs-to-data.png";
…
image: docsToData,
imageAlt: "Docs to Data review screen showing low-confidence fields highlighted",
```
`ProjectRow.astro` renders imported images with `widths={[480, 800, 1200]}` and `sizes="(min-width: 768px) 44vw, 100vw"` inside a fixed 16:10 frame (`object-cover object-top`), so any reasonably wide screenshot works. Prefer PNG/WebP sources ≥ 1200px wide.

## Rules
- Import, never reference by string path — string paths skip optimization and require manual width/height.
- Keep sources reasonably sized (< 2 MB); sharp handles resizing but large sources slow the build.
- `sharp` must be installed and built (`pnpm.onlyBuiltDependencies` in `package.json`) or the build fails with "Could not find Sharp".
