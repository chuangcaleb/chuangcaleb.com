import {formatDisplayDate, getRelativeSince} from './time.ts';
import type {NoteMetadata} from 'lib/utils/types';

// const metaMinDays = {
// 	freshModified: 7,
// 	newPublished: 45,
// };

const ALL_TAG_KEYS = ['words', 'status', 'fyi', 'published', 'modified'];
type NoteTagKey = (typeof ALL_TAG_KEYS)[number];

type NoteTagBase = {
	icon: string;
	label: string;
};
export type NoteTag = NoteTagBase & {key: string};

function wordsLabel(count: NoteMetadata['words']): NoteTagBase | undefined {
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

type TagBuilder = (meta: NoteMetadata) => NoteTagBase | undefined;

export const NOTE_TAG_BUILDERS: Record<string, TagBuilder> = {
	words(meta: NoteMetadata) {
		const wl = wordsLabel(meta.words);
		if (!wl) {
			return undefined;
		}

		return {label: wl.label, icon: wl.icon};
	},

	status(meta: NoteMetadata) {
		return typeof meta.status === 'string'
			? {label: meta.status.toLocaleUpperCase(), icon: STATUS_ICON_MAP[meta.status]}
			: undefined;
	},

	fyi(meta: NoteMetadata) {
		return typeof meta.fyi === 'string'
			? {label: 'FYI', icon: 'lucide:message-circle-warning'}
			: undefined;
	},

	published(meta: NoteMetadata) {
		return meta.published
			? {label: formatDisplayDate(meta.published) ?? '', icon: 'lucide:book-open-check'}
			: undefined;
	},

	modified(meta: NoteMetadata) {
		return meta.modified
			? {label: `${getRelativeSince(meta.modified)} ago`, icon: 'lucide:file-pen-line'}
			: undefined;
	},
} as const;

export function noteToTags(meta: NoteMetadata, omit?: NoteTagKey[]): NoteTag[] {
	const keys = omit ? ALL_TAG_KEYS.filter(k => !omit.includes(k)) : ALL_TAG_KEYS;

	return keys
		.map(key => {
			const tag = NOTE_TAG_BUILDERS[key](meta);
			return tag ? {...tag, key} : undefined;
		})
		.filter((t): t is NoteTag => t !== undefined);
}
