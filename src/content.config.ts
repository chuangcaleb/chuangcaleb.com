import {file, glob} from 'astro/loaders';
import {defineCollection, reference, z} from 'astro:content';

const redirects = defineCollection({
	loader: file('src/data/redirects.yaml'),
	schema: z.object({
		id: z.string(),
		redirect: z.string(),
	}),
});

const projectCollection = defineCollection({
	loader: glob({pattern: '**/[^_]*.mdx', base: './src/content/project'}),
	schema: z.object({
		sequence: z.number(),
		hidden: z.boolean().optional(),
		title: z.string(),
		kind: z.string(),
		links: z
			.array(
				z.object({
					icon: z.string(),
					href: z.string(),
					label: z.string(),
				}),
			)
			.optional(),
	}),
});

/* ------------------------------------ - ----------------------------------- */

const baseObsidianNoteSchema = z
	.object({
		title: z.string(),
		tags: z.array(z.string()).nullable(),
		collection: z.array(reference('obsidian-note')),
		prev: reference('obsidian-note'),
		next: reference('obsidian-note'),
		created: z.string(),
		modified: z.string(),
		published: z.string(),
		featured: z.number(),
		emojip: z.string(),
		series: z.boolean(),
		collectionItems: z.array(reference('obsidian-note')),
	})
	.partial();

const obsidianNoteCollection = defineCollection({
	loader: glob({pattern: '**/[^_]*.md', base: './src/content/obsidian-note'}),
	schema: baseObsidianNoteSchema,
});

export const collections = {
	project: projectCollection,
	'obsidian-note': obsidianNoteCollection,
	redirects,
};
