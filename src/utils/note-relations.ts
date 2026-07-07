import type {NoteMetadata, SuperNote} from 'lib/utils/types';
import {getNoteEntries} from './note.ts';

export type ParentSeriesContext = {
	parent: SuperNote;
	siblings: SuperNote[];
};

export type NoteRelations = {
	title: string;
	children: {
		isOrdered: boolean;
		items: SuperNote[];
	} | undefined;
	parents: SuperNote[];
	previousNote: SuperNote | undefined;
	nextNote: SuperNote | undefined;
	backlinks: SuperNote[];
	isSeries: boolean;
	parentSeriesContexts: ParentSeriesContext[];
};

function alphabetize(notes: SuperNote[]): SuperNote[] {
	return notes.toSorted((a, b) => a.title.localeCompare(b.title));
}

export async function formatNoteRelations({data, title}: SuperNote): Promise<NoteRelations> {
	const {
		down: children = [],
		up: parents = [],
		prev,
		next,
		series,
		backlinks = [],
	} = data;

	const [parentNotes, childrenNotes, backlinkNotes] = await Promise.all([
		getNoteEntries(parents),
		getNoteEntries(children),
		getNoteEntries(backlinks),
	]);

	const previousResolved = prev ? getNoteEntries([prev]) : [];
	const nextResolved = next ? getNoteEntries([next]) : [];
	const [previousEntries, nextEntries] = await Promise.all([previousResolved, nextResolved]);
	const previousNote = previousEntries[0];
	const nextNote = nextEntries[0];

	const isSeries = Array.isArray(series);

	// Compute parent series contexts:
	// For each parent that has `series`, resolve parent's `down` and alphabetize.
	const parentSeriesContexts: ParentSeriesContext[] = [];
	const parentSeriesSettled = parentNotes
		.filter(p => Array.isArray(p.data.series))
		.map(async p => {
			const siblings = await getNoteEntries(p.data.down ?? []);
			return {parent: p, siblings: alphabetize(siblings)};
		});

	for (const promise of parentSeriesSettled) {
		// eslint-disable-next-line no-await-in-loop
		const ctx = await promise;
		parentSeriesContexts.push(ctx);
	}

	return {
		title,
		children: childrenNotes.length > 0
			? {
				isOrdered: isSeries,
				items: alphabetize(childrenNotes),
			}
			: undefined,
		parents: alphabetize(parentNotes),
		previousNote,
		nextNote,
		backlinks: alphabetize(backlinkNotes),
		isSeries,
		parentSeriesContexts,
	};
}
