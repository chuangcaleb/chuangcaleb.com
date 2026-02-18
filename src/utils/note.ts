import path from 'node:path';
import {getCollection, getEntries, getEntry} from 'astro:content';
import type {Note, NoteReference, SuperNote} from 'lib/utils/types';
import {gnr} from '~/utils/note-route.ts';

function getNoteName(filepath: string | undefined) {
	if (!filepath) return 'UNKNOWN NAME';
	return path.parse(filepath).name;
}

// get note meta
function gnm(entry: Note): SuperNote | undefined {
	if (!entry) return undefined;
	return {
		...entry,
		name: getNoteName(entry.filePath),
		route: gnr(entry.id),
	};
}

export async function getAllNotes(): Promise<SuperNote[]> {
	const notes = await getCollection('obsidian-note');
	return notes
		.map((n) => gnm(n))
		.filter((n): n is SuperNote => n !== undefined);
}

export async function getNoteEntries(
	noteChildren?: NoteReference[],
): Promise<SuperNote[]> {
	if (!noteChildren) return [];
	const entries = await getEntries<'obsidian-note'>(noteChildren);

	return entries
		.map((n) => gnm(n))
		.filter((n): n is SuperNote => n !== undefined);
}

export async function getNoteEntry(
	item: NoteReference,
): Promise<SuperNote | undefined> {
	const entry = await getEntry(item);
	if (!entry) return undefined;
	return gnm(entry);
}
