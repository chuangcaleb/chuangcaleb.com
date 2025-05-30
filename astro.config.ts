import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import compressor from 'astro-compressor';
import robotsTxt from 'astro-robots-txt';
import {defineConfig, envField} from 'astro/config';
// Import { slugify } from "lib/markdown/slugify";
// import { remarkReadingTime } from "lib/remark/reading-time";
// import { remarkStripH1 } from "lib/remark/strip-h1";
import og from 'astro-og';
import remarkWikilinks from './lib/remark/remark-wikilinks.js';
import {remarkSimpleStripPercentComments} from './lib/remark/strip-obsidian-comments.js';

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
			// RemarkStripH1,
			// remarkReadingTime,
			remarkSimpleStripPercentComments,
			remarkWikilinks,
		],
	},
	scopedStyleStrategy: 'attribute',
	// redirects: REDIRECTS,
	image: {
		// endpoint: ,
		domains: ['assets.chuangcaleb.com'],
	},
	env: {
		schema: {
			CLOUDINARY_API_KEY: envField.string({
				access: 'secret',
				context: 'server',
			}),
			CLOUDINARY_API_SECRET: envField.string({
				access: 'secret',
				context: 'server',
			}),
			CLOUDINARY_CLOUD_NAME: envField.string({
				access: 'secret',
				context: 'server',
			}),
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
