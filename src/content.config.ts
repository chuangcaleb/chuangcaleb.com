import {file, glob} from 'astro/loaders';
import {defineCollection, reference, z} from 'astro:content';

const redirects = defineCollection({
	loader: file('src/data/redirects.yaml'),
	schema: z.object({
		id: z.string(),
		to: z.string(),
	}),
});

const projectCollection = defineCollection({
	loader: glob({pattern: '**/[^_]*.mdx', base: './src/content/project'}),
	schema: ({image}) =>
		z.object({
			sequence: z.number(),
			hidden: z.boolean().optional(),
			title: z.string(),
			kind: z.string(),
			image: image().optional(),
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

const baseObsidianNoteSchema = z.object({
	// meta - content
	tags: z.array(z.string()).nullable().optional(),
	description: z.string().optional(),
	// meta - time
	// created: z.date().optional(),
	published: z.date().optional(),
	modified: z.date().optional(),
	// misc
	emojip: z.string().optional(),
	resources: z.array(z.string()).optional(),
	featured: z.number().optional(),
	// epistemic
	words: z.number(),
	status: z.enum(['wip', 'stub']).optional(),
	fyi: z.string().optional(),
	// hierarchy
	up: z.array(reference('obsidian-note')).optional(),
	down: z.array(reference('obsidian-note')).optional(),
	series: z.array(reference('obsidian-note')).optional(),
	prev: reference('obsidian-note').optional(),
	next: reference('obsidian-note').optional(),
});

const obsidianNoteCollection = defineCollection({
	loader: glob({pattern: '**/[^_]*.md', base: './src/content/obsidian-note'}),
	schema: baseObsidianNoteSchema,
});

export const collections = {
	project: projectCollection,
	'obsidian-note': obsidianNoteCollection,
	redirects,
};
