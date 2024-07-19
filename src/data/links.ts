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
	isInHeader?: true;
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
		href: 'https://docs.google.com/document/d/1qohsYe0w-Mq5yqIdNaHPuOHvs2lYvnGySULgR2Baqwk/edit?usp=sharing',
		ariaLabel: 'CV / Résumé of Chuang Caleb',
		icon: 'academicons:cv',
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
		// IsInHeader: true,
	},
} as const satisfies LinkGeneric<NavigationLink> as LinkGeneric<NavigationLink>;

export {SOCIALS, NAV_LINKS};
