interface Link {
  label: string;
  ariaLabel: string;
  href: string | null;
  appId?: string;
  icon?: string;
}

const LINKS: { [s: string]: Link } = {
  LINKEDIN: {
    label: "LinkedIn",
    href: "https://linkedin.com/in/chuangcaleb/",
    ariaLabel: "My LinkedIn profile, at the user ID of chuangcaleb",
    appId: 'chuangcaleb',
    icon: "mdi:linkedin",
  },
  GITHUB: {
    label: "GitHub",
    href: "https://github.com/chuangcaleb",
    ariaLabel: "My GitHub profile, at the user ID of chuangcaleb",
    appId: 'chuangcaleb',
    icon: "mdi:github",
  },
  CV: {
    label: "CV / Résumé",
    href: "https://docs.google.com/document/d/1qohsYe0w-Mq5yqIdNaHPuOHvs2lYvnGySULgR2Baqwk/edit?usp=sharing",
    ariaLabel: "CV / Résumé of Chuang Caleb",
    icon: "academicons:cv",
  },
  EMAIL: {
    label: "Email",
    href: null,
    appId: 'hello[at]chuangcaleb.com',
    ariaLabel: "Email address of Chuang Caleb",
    icon: "mdi:email-outline",
  },
} as const;

export default LINKS;
