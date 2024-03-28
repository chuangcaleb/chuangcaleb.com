import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { getPermalinks, remarkWikiLink } from "@portaljs/remark-wiki-link";
import compressor from "astro-compressor";
import purgecss from "astro-purgecss";
import robotsTxt from "astro-robots-txt";
import { defineConfig, type AstroUserConfig } from "astro/config";
import icons from "unplugin-icons/vite";
import { slugify } from "./lib/markdown/slugify";
import { remarkReadingTime } from "./lib/remark/reading-time.mjs";
import { remarkStripH1 } from "./lib/remark/strip-h1.mjs";
import LINKS from "./src/data/links";

const NOTES_DIR = "src/content/obsidian-note";

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

const REDIRECTS = {
  "/linkedin": LINKS.LINKEDIN.href,
  "/github": LINKS.GITHUB.href,
  "/cv": LINKS.CV.href,
  "/resume": LINKS.CV.href,
};

const redirects: AstroUserConfig["redirects"] = Object.entries(
  REDIRECTS,
).reduce(
  (acc, [k, v]) => ({ ...acc, [k]: { status: 307, destination: v } }),
  {},
);

// https://astro.build/config
export default defineConfig({
  site: "https://www.chuangcaleb.com",
  trailingSlash: "never",
  prefetch: true,
  integrations,
  markdown: {
    shikiConfig: { theme: "css-variables" },
    remarkPlugins: [
      remarkStripH1,
      remarkReadingTime,
      [
        remarkWikiLink,
        {
          pathFormat: "obsidian-short",
          permalinks: getPermalinks(NOTES_DIR),
          hrefTemplate: (permalink: string) =>
            `/garden/note${slugify(permalink)}`,
        },
      ],
    ],
  },
  vite: {
    plugins: [icons({ compiler: "jsx", jsx: "react" })],
  },
  scopedStyleStrategy: "class",
  redirects,
});
