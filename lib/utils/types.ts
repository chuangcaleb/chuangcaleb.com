import type {CollectionEntry, ReferenceDataEntry} from 'astro:content';

export type NoteReference = ReferenceDataEntry<'obsidian-note'>;
export type Note = CollectionEntry<'obsidian-note'>;
export type NoteMetadata = Note['data'];

export type SuperNote = CollectionEntry<'obsidian-note'> & {
	name: string;
	route: string;
};
export type SuperNotes = SuperNote[];
