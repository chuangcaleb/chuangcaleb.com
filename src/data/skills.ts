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
    skills: ["semantic-html", "a11y", "seo", "browser-compat", "domain-mgmt"],
  },

  "UI & Styles": {
    icon: "lucide:palette",
    skills: [
      "gestalt",
      "design-system",
      "component-lib",
      "responsive-design",
      "css-preprocess",
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
      "perf-tools",
      "minification",
      "code-splitting",
      "image-optim",
    ],
  },

  Code: {
    icon: "lucide:code",
    skills: ["reusable-modules", "coding-conventions", "directory-mgmt"],
  },

  Development: {
    icon: "lucide:boxes",
    skills: [
      "bundling",
      "version-control",
      "ci-cd-automation",
      "infrastructure",
    ],
  },

  Text: { icon: "lucide:pilcrow", skills: ["markdown", "regex", "nlp"] },

  "Non-Technical": {
    icon: "lucide:badge-plus",
    skills: ["english-proficient", "storytelling", "game-design", "game-dev"],
  },
};

export default SKILLS;
