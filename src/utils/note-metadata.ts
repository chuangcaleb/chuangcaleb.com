import type {NoteMetadata} from 'lib/utils/types';
import {formatDisplayDate, getRelativeSince} from './time.ts';

// const metaMinDays = {
// 	freshModified: 7,
// 	newPublished: 45,
// };

export type NoteTag = {
	icon: string;
	key: string;
	label: string;
};

type Partial = Omit<NoteTag, 'key'>;

function wordsLabel(count: NoteMetadata['words']): Partial | undefined {
	if (count === 0) {
		// TODO: current `words` count always includes title
		return undefined;
	}

	if (count <= 200) {
		return {label: 'ATOM', icon: 'lucide:square-dot'};
	}

	if (count <= 500) {
		return {label: 'PAGE', icon: 'lucide:square-plus'};
	}

	return {label: `${(count / 1000).toFixed(1)}kW`, icon: 'lucide:square-asterisk'};
}

const STATUS_ICON_MAP: Record<NonNullable<NoteMetadata['status']>, string> = {
	stub: 'lucide:sprout',
	wip: 'lucide:construction',
	mvp: 'lucide:goal',
	aged: 'lucide:skull',
	clip: 'lucide:bookmark-plus',
};

export function noteToTags(meta: NoteMetadata): NoteTag[] {
	const tags: NoteTag[] = [];

	const wl = wordsLabel(meta.words);
	if (wl) {
		tags.push({key: 'words', label: wl.label, icon: wl.icon});
	}

	if (typeof meta.status === 'string') {
		tags.push({key: 'status', label: meta.status.toLocaleUpperCase(), icon: STATUS_ICON_MAP[meta.status]});
	}

	if (meta.published) {
		tags.push({
			key: 'published',
			label: formatDisplayDate(meta.published) ?? '',
			icon: 'lucide:book-open-check',
		});
	}

	if (meta.modified) {
		tags.push({
			key: 'modified',
			label: `${getRelativeSince(meta.modified)} ago`,
			icon: 'lucide:file-pen-line',
		});
	}

	return tags;
}
