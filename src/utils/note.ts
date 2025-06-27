import path from 'node:path';
import {
	getCollection,
	getEntries,
	getEntry,
	type CollectionEntry,
} from 'astro:content';
import type {Note, NoteReference, SuperNote} from 'lib/utils/types';
import {gnr} from '~/utils/note-route.ts';

function getNoteName(filepath: string | undefined) {
	if (!filepath) {
		return 'UNKNOWN NAME';
	}

	// TODO: get title from file metadata first
	const {dir, name} = path.parse(filepath);

	if (name === 'index') {
		return dir.split('/').at(-1) ?? name;
	}

	return name;
}

// get note meta
function gnm(entry: Note): SuperNote {
	return {
		...entry,
		name: getNoteName(entry.filePath),
		route: gnr(entry.id),
	};
}

export async function getAllNotes(): Promise<SuperNote[]> {
	const notes = await getCollection('obsidian-note');
	return notes.map((n) => gnm(n));
}

export async function getNoteEntries(
	noteChildren?: NoteReference[],
): Promise<SuperNote[]> {
	if (!noteChildren) return [];
	const entries = await getEntries<'obsidian-note'>(noteChildren);
	return entries.map((n) => gnm(n));
}

export async function getNoteEntry(
	item: NoteReference,
): Promise<SuperNote | undefined> {
	const entry = await getEntry(item);
	if (!entry) return undefined;
	return gnm(entry);
}
