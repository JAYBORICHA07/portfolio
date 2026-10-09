# AGENT.md — `src/styles/`

One file. Imported exactly once, in `src/layouts/BaseLayout.astro`. Everything that cannot be a UnoCSS utility lives here: token values, `@font-face`, base element styles, pseudo-element components, the prose/Shiki bridges, and reduced-motion handling.

## `global.css` (308 lines), section by section

### 1. Fonts (`@font-face`)
Two faces of **Satoshi** (variable, `font-weight: 100 1000`, `font-display: swap`): roman from `/fonts/Satoshi-Variable.ttf`, italic from `/fonts/Satoshi-VariableItalic.ttf` (the italic was never declared before the revamp — prose `<em>` used to be faux-italic). Format `truetype-variations`. A comment marks the TODO to add woff2 sources ahead of the ttf once `fonttools`+`brotli` are available.

### 2. Design tokens
`:root` — light theme, RGB triplets (space-separated, no `rgb()` wrapper, so `uno.config.ts` can compose `rgb(var(--c-x) / alpha)`):
```
--c-canvas 250 248 245   --c-surface 255 255 255   --c-raised 255 255 255   --c-sunken 244 241 234
--c-fg 26 24 21          --c-muted 87 81 75        --c-subtle 115 108 100
--c-line 231 226 218     --c-line-strong 214 207 196
--c-accent 180 69 31     --c-accent-hover 143 51 18   --c-accent-soft 251 238 232   --c-accent-border 239 211 198
--c-accent-contrast 255 255 255   --c-success 30 138 95   --c-shadow 26 24 21
--ease-standard / --ease-out / --ease-in-out   (cubic-beziers)
--font-mono   (system monospace stack, used by prose table headers/captions)
color-scheme: light
```
`[data-theme="dark"]` — same names, warm-dark values (`--c-canvas 19 18 16`, `--c-surface 28 26 23`, `--c-raised 33 30 26`, `--c-sunken 14 13 12`, `--c-fg 245 242 237`, `--c-muted 168 161 154`, `--c-subtle 138 130 121`, `--c-line 51 47 41`, `--c-line-strong 68 63 56`, `--c-accent 242 112 60`, `--c-accent-hover 255 138 91`, `--c-accent-soft 42 26 18`, `--c-accent-border 74 46 31`, `--c-accent-contrast 19 18 16`, `--c-success 63 207 142`, `--c-shadow 0 0 0`), `color-scheme: dark`.

`@media (prefers-color-scheme: dark) { :root:not([data-theme]) {…} }` — a duplicate of the dark block that only applies when JS is disabled (the inline script always sets the attribute otherwise). Keep the three blocks in sync when changing a token.

### 3. Base
`html` text-size-adjust + `optimizeLegibility`; `body` background/colour from tokens + font smoothing; `::selection` accent at 18% alpha; `time, .tabular { font-variant-numeric: tabular-nums }`; global `:focus-visible` = 2px accent outline, 3px offset, 4px radius (instant — never animated); `html.theme-transition *` transitions background/border/color/fill 240 ms — only present for 280 ms after a toggle click.

### 4. Pseudo-element components
- `.nav-link` — muted → fg on hover; `::after` 1px accent underline at `bottom: -6px`, `scaleX(0)` with `transform-origin: right` (160 ms leave), on hover `scaleX(1)` from the left (200 ms `--ease-out`); `[aria-current="page"]` keeps it visible. Hover rules are inside `@media (hover: hover) and (pointer: fine)`.
- `.draw-underline` — background-image gradient underline, `background-size: 0% 1px → 100% 1px` on `.group:hover` (240 ms). Used for project titles.
- `.status-dot` — 8px success-coloured circle; `::after` ring animates `status-ring` (scale 1→2.2, opacity .4→0, 2400 ms, infinite).
- `html.js .reveal` — `opacity: 0; translateY(8px)` with 420 ms transitions; `.is-visible` resets. Gated on `html.js` so no-JS renders visible.
- `.site-header` — transparent bottom border that becomes `line` when `.is-scrolled` (180 ms).

### 5. Prose bridge
`.prose { --un-prose-body: rgb(var(--c-muted)); --un-prose-headings: fg; --un-prose-links: accent; --un-prose-lists: subtle; --un-prose-hr: line; --un-prose-captions: subtle; --un-prose-code: fg; --un-prose-borders: line; --un-prose-bg-soft: sunken; font-size 1.125rem; line-height 1.75 }` — written once, valid in both themes because the `--c-*` triplets underneath flip. So markup is just `class="prose"`; never `prose-invert`. Also: `.prose strong` in fg; `.prose img + em` styled as a centred mono caption; ≤639px prose drops to 1.0625rem/1.7.

### 6. Shiki bridge
`.astro-code, .astro-code span { color: var(--shiki-light); background-color: var(--shiki-light-bg) }` and the `[data-theme="dark"]` counterpart using `--shiki-dark`. Requires `shikiConfig.defaultColor: false` in `astro.config.mjs`. `.astro-code` background is then forced to `--c-sunken` so code blocks match the card system.

### 7. Reduced motion
`@media (prefers-reduced-motion: reduce)` zeroes all animation/transition durations globally, removes the status-dot ring, and forces `.reveal` visible. Focus rings and the reading-progress bar are unaffected (they carry no transition). JS-side, `BaseLayout` also skips the IntersectionObserver entirely under this preference.

## Rules
- Add a token → three places (`:root`, `[data-theme="dark"]`, the no-JS fallback) + `uno.config.ts` `theme.colors`.
- No component-specific rules here unless they need pseudo-elements or keyframes; otherwise use utilities/shortcuts.
- No hex colours anywhere except as comments.
