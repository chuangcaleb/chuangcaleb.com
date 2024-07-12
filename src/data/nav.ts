type Link = {
	label: string;
	href: string;
	icon?: string;
};

type Links = Record<string, Link>;

const NAV_LINKS = {
	INDEX: {
		label: 'chuangcaleb.com',
		href: '/',
	},
	GARDEN: {
		label: '/garden',
		href: '/garden',
		icon: 'lucide:trees',
	},
	NOW: {
		label: '/now',
		href: '/now',
		icon: 'lucide:timer-reset',
	},
	GUESTBOOK: {
		label: '/guestbook',
		href: '/guestbook',
		icon: 'lucide:notebook-pen',
	},
} as const satisfies Links;

export default NAV_LINKS as Links;
