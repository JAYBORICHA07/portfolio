# AGENT.md — `public/fonts/`

Self-hosted **Satoshi** (Indian Type Foundry, via Fontshare's free licence) as variable TrueType files. Declared in `src/styles/global.css` (`@font-face`, family name `"Satoshi"`, weight range `100 1000`, `font-display: swap`) and used as `font-sans` everywhere. The roman face is preloaded from `src/layouts/BaseLayout.astro`.

## Files
| File | Size | Style | Declared | Preloaded |
|---|---|---|---|---|
| `Satoshi-Variable.ttf` | ~127 KB | normal | yes | yes |
| `Satoshi-VariableItalic.ttf` | ~130 KB | italic | yes (added in the revamp; `<em>` was faux-italic before) | no |

`CabinetGrotesk-Variable.ttf` was deleted — Cabinet Grotesk is the visual fingerprint of the template this site came from, and a single-family system reads more editorial. The Fontshare CDN `@import` (via UnoCSS `presetWebFonts`) was removed at the same time; fonts load only from here.

## TODO(jay): woff2
TTF is roughly 2–3× the bytes of woff2. Conversion wasn't done because the machine's Python lacked `brotli`. When convenient:
```bash
pip install fonttools brotli
pyftsubset public/fonts/Satoshi-Variable.ttf --flavor=woff2 --layout-features='*' \
  --unicodes="U+0000-00FF,U+0100-017F,U+2000-206F,U+2070-209F,U+20A0-20BF,U+2190-21BB,U+2212,U+2713" \
  --output-file=public/fonts/Satoshi-Variable.woff2
# repeat for Satoshi-VariableItalic.ttf
```
Then in `global.css` add `url("/fonts/Satoshi-Variable.woff2") format("woff2-variations"),` before the ttf `src` in each `@font-face`, and switch the preload in `BaseLayout.astro` to the woff2 (`type="font/woff2"`). Keep the ttf as a fallback or delete it once verified.

## Rules
- Don't rename the files without updating `global.css` and the preload link.
- No other font families should be added without a strong reason; the monospace voice is the system stack (`ui-monospace, SFMono-Regular, Menlo, Consolas`), deliberately zero-byte.
