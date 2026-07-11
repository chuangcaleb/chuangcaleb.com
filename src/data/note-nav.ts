import type {NavigationLink} from './links.ts';

export const NOTE_NAV_LINKS: Record<string, NavigationLink> = {
	INDEX: {
		label: 'chuangcaleb.com',
		shortLabel: 'index',
		href: '/',
		enabled: ['footer'],
	},
	NOTES: {
		label: '/notes',
		shortLabel: 'notes',
		href: '/notes',
		enabled: ['header', 'footer'],
	},
GUESTBOOK: {
		label: '/guestbook',
		shortLabel: 'guestbook',
		href: '/guestbook',
		enabled: ['footer'],
	},
} satisfies Record<string, NavigationLink>;
