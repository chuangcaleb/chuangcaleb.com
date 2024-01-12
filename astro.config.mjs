import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import compressor from "astro-compressor";
import purgecss from "astro-purgecss";
import robotsTxt from "astro-robots-txt";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";

const prodIntegrations = [
  robotsTxt(),
  sitemap(),
  compressor(),
  purgecss({
    keyframes: true,
    // variables: true,
    safelist: { standard: [/^\:[-a-z]+$/] },
  }),
];

const integrations = [
  mdx(),
  react(),
  ...(import.meta.env.PROD ? prodIntegrations : []),
];

// https://astro.build/config
export default defineConfig({
  site: "https://www.chuangcaleb.com",
  trailingSlash: "never",
  integrations,
  markdown: { shikiConfig: { theme: "css-variables" } },
});
