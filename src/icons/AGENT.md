# AGENT.md — `src/icons/`

Intentionally empty (only `.gitkeep`).

`astro-icon` scans `src/icons/` for **local** custom SVG icons and logs a warning at build time if the directory doesn't exist. The site uses only Remix Icon glyphs from the `@iconify-json/ri` package (`ri:sun-line`, `ri:moon-line`, `ri:github-fill`, `ri:linkedin-box-fill`, `ri:article-line`, `ri:rss-line`, `ri:arrow-right-line`, `ri:arrow-right-up-line`, `ri:arrow-left-line`, `ri:file-copy-line`, `ri:check-line`), so nothing is stored here.

To add a custom icon: drop `name.svg` here and use `<Icon name="name" />`. Keep it single-colour with `fill="currentColor"` so it inherits the token colours.
