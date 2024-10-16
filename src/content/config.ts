import {defineCollection, reference, z} from 'astro:content';

const projectCollection = defineCollection({
	type: 'content',
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

const obsidianCollectionsCollection = defineCollection({
	type: 'data',
	schema: z.array(reference('obsidian-note')),
});

const obsidianNoteCollection = defineCollection({
	type: 'content',
	schema: z
		.object({
			title: z.string(),
			tags: z.array(z.string()).nullable(),
			collection: z.union([
				reference('obsidian-note'), // FIXME: should be obsidian-collections
				z.array(reference('obsidian-note')),
			]),
			prev: reference('obsidian-note'),
			next: reference('obsidian-note'),
			created: z.string(),
			modified: z.string(),
			published: z.string(),
			series: z.boolean(),
			collectionItems: z.array(reference('obsidian-note')),
			emojip: z.string(),
		})
		.partial(),
});
// Tags: z.array(z.string()).optional(),

export const collections = {
	project: projectCollection,
	'obsidian-note': obsidianNoteCollection,
	'obsidian-collection': obsidianCollectionsCollection,
};
