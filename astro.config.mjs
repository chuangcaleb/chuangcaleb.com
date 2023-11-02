import sitemap from "@astrojs/sitemap";
import compressor from "astro-compressor";
import purgecss from "astro-purgecss";
import robotsTxt from "astro-robots-txt";
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

const prodIntegrations = [
  robotsTxt(),
  sitemap(),
  compressor(),
  purgecss({
    keyframes: true,
    variables: true,
    safelist: { standard: [/^\:[-a-z]+$/] },
  }),
];

const integrations = [mdx(), ...(import.meta.env.PROD ? prodIntegrations : [])];

// https://astro.build/config
export default defineConfig({
  site: "https://www.chuangcaleb.com",
  trailingSlash: "never",
  integrations,
});
