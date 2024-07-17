type Link = {
	label: string;
	shortLabel?: string;
	href: string;
	icon?: string;
	isInHeader?: true;
};

type Links = Record<string, Link>;

const NAV_LINKS = {
	INDEX: {
		label: 'chuangcaleb.com',
		shortLabel: 'chuangcaleb',
		href: '/',
	},
	GARDEN: {
		label: '/garden',
		href: '/garden',
		icon: 'lucide:trees',
		isInHeader: true,
	},
	NOW: {
		label: '/now',
		href: '/now',
		icon: 'lucide:timer-reset',
		isInHeader: true,
	},
	GUESTBOOK: {
		label: '/guestbook',
		href: '/guestbook',
		icon: 'lucide:notebook-pen',
	},
} as const satisfies Links;

export default NAV_LINKS as Links;
