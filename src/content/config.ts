import {defineCollection, reference, z} from 'astro:content';

// Two kinds of collections:
// astro collections
// obsidian collections, by caleb

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

/* ------------------------------------ - ----------------------------------- */

// const ma = z.discriminatedUnion('emojip', [
// 	z.object({
// 		emojip: z.string(),
// 		series: z.boolean(),
// 		collectionItems: z.array(reference('obsidian-note')),
// 	}),
// 	z.object({emojip: z.undefined()}),
// ]);

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
	type: 'content',
	schema: baseObsidianNoteSchema,
	// Schema: z.union([baseObsidianNoteSchema, ma]),
});

export const collections = {
	project: projectCollection,
	'obsidian-note': obsidianNoteCollection,
};

