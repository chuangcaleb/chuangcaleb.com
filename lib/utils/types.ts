import type {CollectionEntry} from 'astro:content';

export type CollectionItems =
	CollectionEntry<'obsidian-note'>['data']['collectionItems'];

export type SuperNote = CollectionEntry<'obsidian-note'> & {
	name: string;
	route: string;
};
export type SuperNotes = SuperNote[];
