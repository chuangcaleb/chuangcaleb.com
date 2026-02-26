type BaseLink = {
	label: string;
	href: string;
};

type SocialLink = BaseLink & {
	ariaLabel: string;
	userId?: string;
	icon: string;
};

export type NavigationLink = BaseLink & {
	shortLabel?: string;
	icon?: string;
	enabled: Array<'header' | 'footer' | 'sheet'>;
};

type LinkGeneric<T> = Record<string, T>;

const SOCIALS = {
	LINKEDIN: {
		label: 'LinkedIn',
		href: 'https://linkedin.com/in/chuangcaleb/',
		ariaLabel: 'LinkedIn profile of Chuang Caleb',
		userId: 'chuangcaleb',
		icon: 'mdi:linkedin',
	},
	GITHUB: {
		label: 'GitHub',
		href: 'https://github.com/chuangcaleb',
		ariaLabel: 'GitHub profile of Chuang Caleb',
		userId: 'chuangcaleb',
		icon: 'mdi:github',
	},
	CV: {
		label: 'CV / Résumé',
		href: 'https://assets.chuangcaleb.com/public/cv.pdf',
		ariaLabel: 'CV / Résumé of Chuang Caleb',
		icon: 'mdi:email-outline',
	},
	EMAIL: {
		label: 'Email',
		href: 'mailto:ahoy@chuangcaleb.com',
		userId: 'ahoy@chuangcaleb.com',
		ariaLabel: 'Email address of Chuang Caleb',
		icon: 'mdi:email-outline',
	},
} as const satisfies LinkGeneric<SocialLink> as LinkGeneric<SocialLink>;

export type LinkKey = keyof typeof SOCIALS;

const NAV_LINKS: LinkGeneric<NavigationLink> = {
	INDEX: {
		label: 'chuangcaleb.com',
		shortLabel: 'chuangcaleb',
		href: '/',
		enabled: ['header', 'sheet', 'footer'],
	},
	GARDEN: {
		label: '/notes',
		href: '/notes',
		icon: 'lucide:trees',
		enabled: ['header', 'sheet', 'footer'],
	},
	// NOW: {
	// 	label: '/now',
	// 	href: '/now',
	// 	icon: 'lucide:timer-reset',
	// 	enabled: ['sheet', 'footer'],
	// },
	GUESTBOOK: {
		label: '/guestbook',
		href: '/guestbook',
		icon: 'lucide:notebook-pen',
		enabled: ['sheet', 'footer'],
	},
	SEARCH: {
		label: 'search',
		href: '#search-container',
		icon: 'lucide:search',
		enabled: ['header', 'sheet'],
	},
} as const;

export {NAV_LINKS, SOCIALS};
