import { defineConfig, presetUno, presetTypography } from "unocss";

// Every color is an RGB triplet custom property so utilities like `bg-canvas/80`
// keep working. The triplets themselves (light + dark) live in src/styles/global.css.
const c = (v: string) => `rgb(var(${v}) / <alpha-value>)`;

export default defineConfig({
  presets: [
    presetUno({
      // Point the built-in `dark:` variant at the same attribute the inline theme
      // script writes, so tokens and variants can never disagree.
      dark: { light: '[data-theme="light"]', dark: '[data-theme="dark"]' },
    }),
    presetTypography({
      cssExtend: {
        "h2, h3, h4": { "letter-spacing": "-0.02em", "font-weight": "650", "scroll-margin-top": "6rem" },
        h2: { "font-size": "1.75rem", "line-height": "1.2", "margin-top": "3.5rem", "margin-bottom": "1rem" },
        h3: { "font-size": "1.25rem", "line-height": "1.35", "margin-top": "2.25rem", "margin-bottom": ".75rem" },
        p: { "margin-top": "0", "margin-bottom": "1.5rem" },
        a: {
          "text-decoration-thickness": "1px",
          "text-underline-offset": "3px",
          "font-weight": "500",
          transition: "color 160ms var(--ease-standard), text-decoration-thickness 160ms var(--ease-standard)",
        },
        "a:hover": { color: "rgb(var(--c-accent-hover))", "text-decoration-thickness": "2px" },
        "ul, ol": { "padding-left": "1.25rem" },
        li: { "margin-top": ".375rem", "margin-bottom": ".375rem" },
        "li::marker": { color: "rgb(var(--c-subtle))" },
        code: {
          background: "rgb(var(--c-accent-soft))",
          color: "rgb(var(--c-accent))",
          padding: ".125em .4em",
          "border-radius": "6px",
          "font-size": ".9em",
          "font-weight": "500",
        },
        "code::before": { content: "none" },
        "code::after": { content: "none" },
        pre: {
          border: "1px solid rgb(var(--c-line))",
          "border-radius": "10px",
          padding: "1.25rem",
          "font-size": ".875rem",
          "line-height": "1.7",
          "overscroll-behavior-x": "contain",
        },
        "pre code": { background: "transparent", color: "inherit", padding: "0", "font-size": "inherit", "font-weight": "400", "border-radius": "0" },
        blockquote: {
          "font-style": "normal",
          "border-left": "3px solid rgb(var(--c-accent-border))",
          "padding-left": "1.25rem",
          color: "rgb(var(--c-muted))",
          "font-weight": "400",
        },
        "blockquote p::before": { content: "none" },
        "blockquote p::after": { content: "none" },
        img: { "border-radius": "10px", border: "1px solid rgb(var(--c-line))", margin: "2rem 0" },
        hr: { margin: "3rem 0" },
        table: { "font-size": ".9375rem" },
        "thead th": {
          "font-family": "var(--font-mono)",
          "font-size": ".75rem",
          "text-transform": "uppercase",
          "letter-spacing": ".08em",
          "font-weight": "500",
          color: "rgb(var(--c-subtle))",
        },
      },
    }),
  ],
  theme: {
    colors: {
      canvas: c("--c-canvas"),
      surface: c("--c-surface"),
      raised: c("--c-raised"),
      sunken: c("--c-sunken"),
      fg: c("--c-fg"),
      muted: c("--c-muted"),
      subtle: c("--c-subtle"),
      line: { DEFAULT: c("--c-line"), strong: c("--c-line-strong") },
      accent: {
        DEFAULT: c("--c-accent"),
        hover: c("--c-accent-hover"),
        soft: c("--c-accent-soft"),
        border: c("--c-accent-border"),
        contrast: c("--c-accent-contrast"),
      },
      success: c("--c-success"),
    },
    fontFamily: {
      sans: 'Satoshi, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
      mono: 'ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace',
    },
    // Tuple form is required: a bare string makes UnoCSS emit line-height: 1.
    fontSize: {
      display: ["clamp(2.5rem, 4vw + 0.75rem, 3.75rem)", { "line-height": "1.06", "letter-spacing": "-0.03em" }],
      title: ["clamp(2rem, 3vw + 0.75rem, 2.75rem)", { "line-height": "1.1", "letter-spacing": "-0.028em" }],
      section: ["clamp(1.5rem, 1.3rem + 0.9vw, 1.75rem)", { "line-height": "1.2", "letter-spacing": "-0.02em" }],
      sub: ["1.25rem", { "line-height": "1.35", "letter-spacing": "-0.012em" }],
      lead: ["clamp(1.0625rem, 1rem + 0.35vw, 1.1875rem)", { "line-height": "1.6", "letter-spacing": "-0.005em" }],
      body: ["1.0625rem", { "line-height": "1.65" }],
      small: ["0.875rem", { "line-height": "1.55" }],
      label: ["0.75rem", { "line-height": "1.4", "letter-spacing": "0.08em" }],
      meta: ["0.8125rem", { "line-height": "1.5", "letter-spacing": "0.01em" }],
    },
    maxWidth: {
      page: "1120px",
      prose: "680px",
      text: "560px",
    },
    boxShadow: {
      card: "0 1px 2px rgb(var(--c-shadow) / 0.04), 0 1px 1px rgb(var(--c-shadow) / 0.03)",
      "card-lift": "0 4px 16px -4px rgb(var(--c-shadow) / 0.10), 0 2px 4px -2px rgb(var(--c-shadow) / 0.06)",
    },
    easing: {
      standard: "cubic-bezier(0.4, 0, 0.2, 1)",
      out: "cubic-bezier(0.22, 1, 0.36, 1)",
      "in-out": "cubic-bezier(0.65, 0, 0.35, 1)",
    },
  },
  shortcuts: {
    "container-page": "mx-auto w-full max-w-page px-5 sm:px-8 lg:px-12",
    "label-mono": "font-mono text-label uppercase font-500 text-subtle",
    "text-meta-mono": "font-mono text-meta text-subtle tabular-nums",
    btn: "inline-flex items-center justify-center gap-2 h-11 px-4 rounded-[10px] text-small font-500 whitespace-nowrap select-none transition-[background-color,border-color,color,transform] duration-160 ease-standard active:scale-98 active:duration-120",
    "btn-primary": "btn bg-accent text-accent-contrast hover:bg-accent-hover",
    "btn-ghost": "btn border border-line bg-surface text-fg hover:bg-accent-soft hover:border-accent-border",
    card: "rounded-[10px] border border-line bg-surface shadow-card dark:shadow-none",
    "link-accent": "text-accent underline decoration-1 underline-offset-3 hover:text-accent-hover hover:decoration-2 transition-[color,text-decoration-thickness] duration-160 ease-standard",
    "icon-link": "inline-flex items-center justify-center h-9 w-9 rounded-[6px] text-subtle hover:text-accent transition-colors duration-160 ease-standard",
  },
});
