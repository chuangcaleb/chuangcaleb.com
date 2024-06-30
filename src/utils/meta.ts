import {
	type ContentEntryMap,
	type ValidContentEntrySlug,
} from 'astro:content';

export type Reference<C extends keyof ContentEntryMap> = {
	collection: C;
	slug: ValidContentEntrySlug<C>;
};

export function isInCollection(
	note: Reference<'obsidian-note'> | Array<Reference<'obsidian-note'>> | undefined,
	query: string,
) {
	if (!note) {
		return false;
	}

	if (Array.isArray(note)) {
		return note.some(n => n.slug === query);
	}

	return note.slug === query;
}
