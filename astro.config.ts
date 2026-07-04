import process from 'node:process';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import compressor from 'astro-compressor';
import robotsTxt from 'astro-robots-txt';
import {defineConfig, envField, fontProviders} from 'astro/config';
// Import { slugify } from "lib/markdown/slugify";
// import { remarkReadingTime } from "lib/remark/reading-time";
import icon from 'astro-icon';
import og from 'astro-og';
import rehypeExternalLinks from 'rehype-external-links';
// import cloudflare from '@astrojs/cloudflare';
import rehypeWrapTables from './lib/rehype/wrap-tables.js';
import remarkWikilinks from './lib/remark/remark-wikilinks.js';
import {remarkStripH1} from './lib/remark/strip-h1.js';
import {remarkSimpleStripPercentComments} from './lib/remark/strip-obsidian-comments.js';
import {remarkStripObsidianUtilities} from './lib/remark/strip-obsidian-utilities.ts';

const productionIntegrations = [robotsTxt(), sitemap(), compressor()];

const integrations = [
	mdx(),
	react(),
	icon({
		include: {
			lucide: ['*'],
			mdi: ['*'],
			'simple-icons': ['obsidian'],
		},
	}),
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
			// remarkGfm,
			remarkStripH1,
			// remarkReadingTime,
			remarkStripObsidianUtilities,
			remarkSimpleStripPercentComments,
			remarkWikilinks,
		],
		rehypePlugins: [
			rehypeWrapTables,
			[
				rehypeExternalLinks,
				{
					host: ['chuangcaleb.com'],
					content: {type: 'text', value: ' ↗'},
					contentProperties: {
						class: ['external-arrow'],
						'aria-hidden': true,
					},
					properties: {target: '_blank'},
					rel: ['noopener'],
				},
			],
		],
	},

	experimental: {
		fonts: [
			{
				provider: fontProviders.fontsource(),
				name: 'Courier Prime',
				cssVariable: '--font-mono',
				weights: [400],
				// styles: ['normal'],
				fallbacks: [
					'Courier Prime',
					'Courier New',
					'Nimbus Mono PS',
					'Courier',
					'ui-monospace',
					'monospace',
				],
			},
			{
				provider: fontProviders.google(),
				name: 'Asap',
				cssVariable: '--font-body',
				weights: [400, 600],
				fallbacks: [
					'-apple-system',
					'BlinkMacSystemFont',
					'Inter',
					'IBM Plex Sans',
					'Segoe UI',
					'Helvetica',
					'Arial',
					'sans-serif',
				],
			},
		],
	},
	image: {
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
	// adapter: cloudflare({
	// 	platformProxy: {
	// 		enabled: true,
	// 	},
	// }),
});
