import process from 'node:process';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import compressor from 'astro-compressor';
import robotsTxt from 'astro-robots-txt';
import {defineConfig, envField} from 'astro/config';
// Import { slugify } from "lib/markdown/slugify";
// import { remarkReadingTime } from "lib/remark/reading-time";
import og from 'astro-og';
import {remarkStripH1} from './lib/remark/strip-h1.js';
import remarkWikilinks from './lib/remark/remark-wikilinks.js';
import {remarkSimpleStripPercentComments} from './lib/remark/strip-obsidian-comments.js';
import {remarkStripObsidianUtilities} from './lib/remark/strip-obsidian-utilities.ts';

const productionIntegrations = [robotsTxt(), sitemap(), compressor()];

const integrations = [
	mdx(),
	react(),
	...(import.meta.env.DEV ? [og()] : []),
	...(import.meta.env.PROD ? productionIntegrations : []),
];

// https://astro.build/config
export default defineConfig({
	site: 'https://chuangcaleb.com',
	trailingSlash: 'never',
	prefetch: true,
	integrations,
	markdown: {
		shikiConfig: {theme: 'css-variables'},
		remarkPlugins: [
			remarkStripH1,
			// remarkReadingTime,
			remarkStripObsidianUtilities,
			remarkSimpleStripPercentComments,
			remarkWikilinks,
		],
	},
	// redirects: REDIRECTS,
	image: {
		// endpoint: ,
		domains: [process.env.IMAGE_DOMAIN!],
	},
	env: {
		schema: {
			GOOGLE_SERVICE_ACCOUNT_EMAIL: envField.string({
				access: 'secret',
				context: 'server',
			}),
			GOOGLE_PRIVATE_KEY: envField.string({
				access: 'secret',
				context: 'server',
			}),
			GUESTBOOK_GOOGLE_SHEET_ID: envField.string({
				access: 'secret',
				context: 'server',
			}),
			GOOGLE_DRIVE_CONTENT_FOLDER_ID: envField.string({
				access: 'secret',
				context: 'server',
			}),
		},
	},
});
