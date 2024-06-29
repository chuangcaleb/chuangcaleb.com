interface Link {
  label: string;
  href: string;
  icon?: string;
}

type Links = { [s: string]: Link };

const NAV_LINKS = {
  INDEX: {
    label: "chuangcaleb.com",
    href: "/",
  },
  GARDEN: {
    label: "/garden",
    href: "/garden",
    icon: "lucide:trees",
  },
  NOW: {
    label: "/now",
    href: "/now",
    icon: "lucide:timer-reset",
  },
} as const satisfies Links;

export default NAV_LINKS as Links;
