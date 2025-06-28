import type {NoteMetadata} from 'lib/utils/types';
import {getNoteEntries} from './note.ts';

export async function formatNoteRelations(metadata: NoteMetadata) {
	const {down: children = [], up: parents = [], series} = metadata;

	const parentNotes = await getNoteEntries(parents);

	const isParent = Boolean(children?.length);
	const childrenNotes = isParent
		? {
				isOrdered: Boolean(series),
				items: series ?? children,
			}
		: null;

	const type = (() => {
		if (metadata.series) return 'topic/series';
		if (metadata.emojip) return 'topic';
		return 'regular';
	})();

	if (!childrenNotes && !parentNotes) return null;
	return {
		children: childrenNotes,
		parents: parentNotes,
		type,
	} as const;
}
