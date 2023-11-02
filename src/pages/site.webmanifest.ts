import type { APIContext } from "astro";

import android_chrome_192x192 from "/public/favicon/android-chrome-192x192.png";
import android_chrome_512x512 from "/public/favicon/android-chrome-512x512.png";
import site from "@data/site";

const icons = [
  {
    src: android_chrome_192x192.src,
    sizes: "192x192",
    type: "image/png",
  },
  {
    src: android_chrome_512x512.src,
    sizes: "512x512",
    type: "image/png",
  },
];

const manifestObj = {
  name: "Chuang Caleb",
  short_name: "Chuang Caleb",
  icons,
  theme_color: site.color.light,
  background_color: site.color.dark,
  display: "standalone",
};

const manifestStr = JSON.stringify(manifestObj);

export async function GET(_context: APIContext) {
  return new Response(manifestStr);
}
