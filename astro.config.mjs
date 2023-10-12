import sitemap from "@astrojs/sitemap";
import compressor from "astro-compressor";
import purgecss from "astro-purgecss";
import { defineConfig } from "astro/config";

const prodIntegrations = [
  sitemap(),
  compressor(),
  purgecss({
    keyframes: true,
    variables: false,
    safelist: { standard: [/^\:[-a-z]+$/] },
  }),
];

const integrations = [...(import.meta.env.PROD ? prodIntegrations : [])];

// https://astro.build/config
export default defineConfig({
  site: "https://www.chuangcaleb.com",
  trailingSlash: "never",
  integrations,
});
