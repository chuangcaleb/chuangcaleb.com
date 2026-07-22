import {file, glob} from 'astro/loaders';
import {defineCollection, reference} from 'astro:content';
import {z} from 'zod';

const redirects = defineCollection({
	loader: file('src/data/redirects.yaml'),
	schema: z.object({
		id: z.string(),
		to: z.string(),
	}),
});

const linkSchema = z.object({
	icon: z.string(),
	href: z.string(),
	label: z.string(),
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
			links: z.array(linkSchema).optional(),
		}),
});

const experienceCollection = defineCollection({
	loader: glob({pattern: '**/[^_]*.mdx', base: './src/content/experience'}),
	schema: ({image}) =>
		z.object({
			sequence: z.number(),
			hidden: z.boolean().optional(),
			role: z.string(),
			company: z.string(),
			startDate: z.string(),
			endDate: z.string().optional(),
			link: z.object({
				href: z.string(),
				label: z.string(),
			}),
			logo: image().optional(),
			isLogoAlpha: z.boolean().optional(),
			technologies: z.array(z.string()).optional(),
		}),
});

/* ------------------------------------ - ----------------------------------- */

const baseObsidianNoteSchema = z.object({
	// meta - content
	slug: z.string(),
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
	words: z.number(),
	// epistemic
	status: z.enum(['wip', 'stub', 'mvp', 'clip', 'aged']).optional(),
	fyi: z.string().optional(),
	// hierarchy
	up: z.array(reference('obsidian-note')).optional(),
	down: z.array(reference('obsidian-note')).optional(),
	series: z.boolean().optional(),
	prev: reference('obsidian-note').optional(),
	next: reference('obsidian-note').optional(),
	backlinks: z.array(reference('obsidian-note')).optional(),
});

const obsidianNoteCollection = defineCollection({
	loader: glob({pattern: '**/[^_]*.md', base: './src/content/obsidian-note'}),
	schema: baseObsidianNoteSchema,
});

export const collections = {
	project: projectCollection,
	experience: experienceCollection,
	'obsidian-note': obsidianNoteCollection,
	redirects,
};
