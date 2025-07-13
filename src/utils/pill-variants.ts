// TODO: style with color
export const pillVariants = {
	wip: {
		emoji: '🚧',
		short: 'wip',
		label: 'This note is a work-in-progress.',
		ariaLabel: 'This note is a work in progress.',
	},
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
		ariaLabel: 'This note is a stub.',
	},
	fresh: {
		emoji: '🥬',
		short: 'fresh',
		label: 'This note was recently modified.',
		ariaLabel: 'This note was recently modified.',
	},
	new: {
		emoji: '🐣',
		short: 'new',
		label: 'This note was newly published.',
		ariaLabel: 'This note was newly published.',
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
