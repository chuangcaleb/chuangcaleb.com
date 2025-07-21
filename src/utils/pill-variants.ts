type PillVariant = {
	emoji: string;
	short: string;
	label: string;
	ariaLabel?: string;
};

// TODO: style with color
export const pillVariants: Record<string, PillVariant> = {
	fyi: {
		emoji: '🚨',
		short: 'fyi',
		label: 'For Your Information',
		ariaLabel: 'This note has a disclaimer.',
	},
	stub: {
		emoji: '🌱',
		short: 'stub',
		label: 'This note is a stub.',
	},
	wip: {
		emoji: '🚧',
		short: 'wip',
		label: 'This note is a work-in-progress.',
	},
	mvp: {
		emoji: '🏁',
		short: 'mvp',
		label: 'This note lacks refinement, but it has been completed “enough”.',
	},
	fresh: {
		emoji: '🥬',
		short: 'fresh',
		label: 'This note was recently modified.',
	},
	new: {
		emoji: '🐣',
		short: 'new',
		label: 'This note was newly published.',
	},
};

export function getWordCountPill(count: number) {
	if (count <= 200) {
		return {emoji: '⊙', short: 'ATOMIC'};
	}

	if (count <= 500) {
		return {emoji: '▯', short: '1PAGE'};
	}

	if (count <= 1000) {
		return {emoji: '◨', short: '2PAGES'};
	}

	return {emoji: '◆', short: 'LONGFORM'};
}
