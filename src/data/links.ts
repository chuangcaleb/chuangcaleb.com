interface Link {
  label: string;
  href: string | null;
  appId?: string;
  icon?: string;
}

const LINKS: { [s: string]: Link } = {
  LINKEDIN: {
    label: "LinkedIn",
    href: "https://linkedin.com/in/chuangcaleb/",
    appId: 'chuangcaleb',
    icon: "mdi:linkedin",
  },
  GITHUB: {
    label: "GitHub",
    href: "https://github.com/chuangcaleb",
    appId: 'chuangcaleb',
    icon: "mdi:github",
  },
  CV: {
    label: "CV / Résumé",
    href: "https://docs.google.com/document/d/1qohsYe0w-Mq5yqIdNaHPuOHvs2lYvnGySULgR2Baqwk/edit?usp=sharing",
    icon: "academicons:cv",
  },
  EMAIL: {
    label: "Email",
    href: 'mailto:ahoy@chuangcaleb.com',
    appId: 'ahoy@chuangcaleb.com',
    icon: "mdi:email-outline",
  },
} as const;

export default LINKS;
