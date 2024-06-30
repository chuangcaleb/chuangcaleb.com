import path from 'node:path';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import {getPermalinks, remarkWikiLink} from '@portaljs/remark-wiki-link';
import compressor from 'astro-compressor';
import purgecss from 'astro-purgecss';
import robotsTxt from 'astro-robots-txt';
import {defineConfig, type AstroUserConfig} from 'astro/config';
// Import { slugify } from "lib/markdown/slugify";
// import { remarkReadingTime } from "lib/remark/reading-time";
// import { remarkStripH1 } from "lib/remark/strip-h1";
// import icons from "unplugin-icons/vite";
import LINKS from './src/data/links';
import {slugify} from './lib/markdown/string';

const NOTES_DIR = 'src/content/obsidian-note';

const productionIntegrations = [
	robotsTxt(),
	sitemap(),
	purgecss({
		keyframes: true,
		// Variables: true,
		safelist: {standard: [/^:[-a-z]+$/]},
	}),
	compressor(),
];

const integrations = [
	mdx(),
	react(),
	...(import.meta.env.PROD ? productionIntegrations : []),
];

const REDIRECTS = {
	'/linkedin': LINKS.LINKEDIN.href,
	'/github': LINKS.GITHUB.href,
	'/cv': LINKS.CV.href,
	'/resume': LINKS.CV.href,
	'/note': '/garden',
};

// Const redirects: AstroUserConfig["redirects"] = Object.entries(
//   REDIRECTS,
// ).reduce(
//   (acc, [k, v]) => ({ ...acc, [k]: { status: 307, destination: v } }),
//   {},
// );

// https://astro.build/config
export default defineConfig({
	site: 'https://chuangcaleb.com',
	trailingSlash: 'never',
	prefetch: true,
	integrations,
	markdown: {
		shikiConfig: {theme: 'css-variables'},
		remarkPlugins: [
			// RemarkStripH1,
			// remarkReadingTime,
			[
				// https://github.com/datopian/datahub/issues/1059
				remarkWikiLink,
				{
					pathFormat: 'obsidian-short',
					permalinks: getPermalinks(NOTES_DIR),
					hrefTemplate: (permalink: string) =>
						path.join('/note', slugify(permalink)),
				},
			],
		],
	},
	scopedStyleStrategy: 'attribute',
	redirects: REDIRECTS,
});
