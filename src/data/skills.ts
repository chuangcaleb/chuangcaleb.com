export interface SkillGroup {
  icon: string;
  skills: string[];
}

interface SkillGroups {
  [group: string]: SkillGroup;
}

const SKILLS: SkillGroups = {
  Web: {
    icon: "lucide:globe",
    skills: [
      "semantic-html",
      "a11y",
      "seo",
      "browser-compat",
      "web-perf",
      "domain-mgmt",
    ],
  },

  "UI & Styles": {
    icon: "lucide:palette",
    skills: [
      "raw-css",
      "design-system",
      "responsive-ui",
      "preprocessing",
      "color-theory",
      "ux",
    ],
  },

  Network: {
    icon: "lucide:arrow-down-up",
    skills: ["rest-ful", "async-program", "caching", "rendering-strats"],
  },

  Optimization: {
    icon: "lucide:zap",
    skills: [
      "prpl",
      "perf-metrics",
      "minification",
      "code-splitting",
      "image-optim",
    ],
  },

  Code: {
    icon: "lucide:code",
    skills: [
      "reusable-modules",
      "code-conventions",
      "prog-principles",
      "experimental-features",
    ],
  },

  Development: {
    icon: "lucide:boxes",
    skills: [
      "bundling",
      "version-control",
      "infrastructure",
      "ci-cd-automation",
      "releasing",
      "oss-mgmt",
    ],
  },

  Text: {
    icon: "lucide:pilcrow",
    skills: ["markdown", "md-flavors", "mdx", "regex", "nlp"],
  },

  "Non-Technical": {
    icon: "lucide:badge-plus",
    skills: ["english-proficient", "storytelling", "game-design", "game-dev"],
  },
};

export default SKILLS;