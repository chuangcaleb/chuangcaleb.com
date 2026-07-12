import type {SuperNote} from './types';
import {getAllNotes} from '~/utils/note.ts';

export async function getFeaturedNotes(): Promise<SuperNote[]> {
	const notes = await getAllNotes();

	return notes
		.filter(n => n.data.featured !== undefined)
		.toSorted((a, b) => (a.data.featured ?? 999) - (b.data.featured ?? 999))
		.toSorted((a, b) => (typeof a.data.emojip === 'string' ? 0 : 1) - (typeof b.data.emojip === 'string' ? 0 : 1));
}

export async function getTopLevelNotes(): Promise<SuperNote[]> {
	const notes = await getAllNotes();

	return notes
		.filter(n => {
			const hasNoParents = !n.data.up || n.data.up.length === 0;
			const hasChildren = n.data.down && n.data.down.length > 0;
			return hasNoParents && hasChildren;
		})
		.toSorted((a, b) => a.title.localeCompare(b.title));
}

type NoteFilterOptions = {
	exclude?: Set<string>;
	limit?: number;
};

export async function getModifiedNotes(options?: NoteFilterOptions): Promise<SuperNote[]> {
	const notes = await getAllNotes();

	const filtered = options?.exclude
		? notes.filter(n => n.data.modified && !options.exclude!.has(n.id))
		: notes.filter(n => n.data.modified);

	const sorted = filtered.toSorted((a, b) => b.data.modified!.getTime() - a.data.modified!.getTime());

	return options?.limit === undefined ? sorted : sorted.slice(0, options.limit);
}

export async function getPublishedNotes(options?: NoteFilterOptions): Promise<SuperNote[]> {
	const notes = await getAllNotes();

	const filtered = options?.exclude
		? notes.filter(n => n.data.published && !options.exclude!.has(n.id))
		: notes.filter(n => n.data.published);

	const sorted = filtered.toSorted((a, b) => b.data.published!.getTime() - a.data.published!.getTime());

	return options?.limit === undefined ? sorted : sorted.slice(0, options.limit);
}
