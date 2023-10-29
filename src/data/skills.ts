export type Skills = {
  name: string;
  icon: string;
}[];

interface SkillGroups {
  [group: string]: Skills;
}

const SKILLS: SkillGroups = {
  Web: [
    { name: "semantic-html", icon: "" },
    { name: "a11y", icon: "" },
    { name: "seo", icon: "" },
    { name: "browser-compat", icon: "" },
  ],

  "UI & Styles": [
    { name: "gestalt", icon: "" },
    { name: "design-system", icon: "" },
    { name: "component-lib", icon: "" },
    { name: "responsive-design", icon: "" },
    { name: "css-preprocess", icon: "" },
  ],

  Network: [
    { name: "rest-ful", icon: "" },
    { name: "async-program", icon: "" },
    { name: "caching", icon: "" },
    { name: "rendering-strats", icon: "" },
  ],

  Optimization: [
    { name: "prpl", icon: "" },
    { name: "perf-tools", icon: "" },
    { name: "minification", icon: "" },
    { name: "code-splitting", icon: "" },
    { name: "image-optim", icon: "" },
    { name: "bundling", icon: "" },
  ],

  Development: [
    { name: "bundling", icon: "" },
    { name: "version-control", icon: "" },
    { name: "ci-cd-automation", icon: "" },
    { name: "domain-mgmt", icon: "" },
    { name: "infrastructure", icon: "" },
  ],

  Text: [
    { name: "markdown", icon: "" },
    { name: "regex", icon: "" },
  ],

  Code: [
    { name: "reusable-modules", icon: "" },
    { name: "coding-conventions", icon: "" },
    { name: "directory-mgmt", icon: "" },
  ],

  "Non-Technical": [
    { name: "english-proficient", icon: "" },
    { name: "storytelling", icon: "" },
    { name: "game-design", icon: "" },
    { name: "game-dev", icon: "" },
  ],
};

export default SKILLS;
