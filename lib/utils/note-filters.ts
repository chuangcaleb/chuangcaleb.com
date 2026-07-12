import type {SuperNote} from './types';

export function getFeaturedNotes(notes: SuperNote[]): SuperNote[] {
	return notes
		.filter(n => n.data.featured !== undefined)
		.toSorted((a, b) => (a.data.featured ?? 999) - (b.data.featured ?? 999))
		.toSorted((a, b) => (typeof a.data.emojip === 'string' ? 0 : 1) - (typeof b.data.emojip === 'string' ? 0 : 1));
}

export function getTopLevelNotes(notes: SuperNote[]): SuperNote[] {
	return notes
		.filter(n => {
			const hasNoParents = !n.data.up || n.data.up.length === 0;
			const hasChildren = n.data.down && n.data.down.length > 0;
			return hasNoParents && hasChildren;
		})
		.toSorted((a, b) => a.title.localeCompare(b.title));
}

export function getRecentlyModified(
	notes: SuperNote[],
	exclude: Set<string>,
	limit = 5,
): SuperNote[] {
	return notes
		.filter(n => n.data.modified && !exclude.has(n.id))
		.toSorted((a, b) => b.data.modified!.getTime() - a.data.modified!.getTime())
		.slice(0, limit);
}

export function getRecentlyPublished(
	notes: SuperNote[],
	exclude: Set<string>,
	limit = 3,
): SuperNote[] {
	return notes
		.filter(n => n.data.published && !exclude.has(n.id))
		.toSorted((a, b) => b.data.published!.getTime() - a.data.published!.getTime())
		.slice(0, limit);
}
