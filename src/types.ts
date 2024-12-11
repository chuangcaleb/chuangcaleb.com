import type {getCollection} from 'astro:content';

export type Note = Awaited<
	ReturnType<typeof getCollection<'obsidian-note'>>
>[number];
