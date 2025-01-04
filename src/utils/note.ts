import path from 'node:path';
import {getCollection, getEntries, type CollectionEntry} from 'astro:content';
import type {CollectionItems, SuperNote} from 'lib/utils/types';
import {gnr} from '~/utils/note-route';

export function getNoteName(filepath: string | undefined) {
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
function gnm(entry: CollectionEntry<'obsidian-note'>): SuperNote {
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
	items?: CollectionItems,
): Promise<SuperNote[]> {
	if (!items) return [];
	const entries = await getEntries<'obsidian-note'>(items);
	return entries.map((n) => gnm(n));
}
