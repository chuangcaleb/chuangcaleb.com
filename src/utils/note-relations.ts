import type {NoteMetadata} from 'lib/utils/types';
import {getNoteEntries} from './note.ts';

export async function formatNoteRelations(metadata: NoteMetadata) {
	// (childrenNotes || !!seriesesNotes.length) && (
	const {down: children = [], up: parents = [], series} = metadata;

	const parentNotes = await getNoteEntries(parents);

	const isParent = Boolean(children?.length);
	const childrenNotes = isParent && {
		isOrdered: Boolean(series),
		items: series ?? children,
	};

	// parents which are also series
	// type SeriesesNotes = Series[]; type Series = SeriesMember[]
	const seriesesNotes = parentNotes.filter((note) => Boolean(note.data.series));
	// const regularParentsNotes = parentNotes.filter((note) => !note.data.series);

	if (!childrenNotes || !seriesesNotes) return null;
	return {
		children: childrenNotes,
		serieses: seriesesNotes,
	};
}
