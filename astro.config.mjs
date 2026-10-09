import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import UnoCSS from "@unocss/astro";
import icon from "astro-icon";
import { remarkReadingTime } from "./src/lib/remark-reading-time.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://jayboricha.com",
  output: "static",
  // Work section is hidden while it's under development
  redirects: {
    "/projects": "/",
  },
  integrations: [sitemap(), robotsTxt(), UnoCSS({ injectReset: true }), icon()],
  markdown: {
    remarkPlugins: [remarkReadingTime],
    shikiConfig: {
      // Both themes are emitted as CSS variables; global.css picks one per [data-theme].
      themes: { light: "github-light", dark: "github-dark-dimmed" },
      defaultColor: false,
      wrap: true,
    },
  },
});
