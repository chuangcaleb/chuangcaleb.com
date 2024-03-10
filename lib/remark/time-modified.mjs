import { execSync } from "child_process";

export function remarkModifiedTime() {
  return function (tree, file) {
    // if not in the obsidian-note collection, then early exit
    if (file.history[0].indexOf("/obsidian-note") === -1) return;
    const filepath = file.history[0];
    const result = execSync(
      `cd src/content/obsidian-note && git log -1 --pretty="format:%cI" "${filepath}"`,
    );
    file.data.astro.frontmatter.lastModified = result.toString();
  };
}
