// Unused; cloned files have its own metadata
import {execSync} from 'node:child_process';

export function remarkModifiedTime() {
	return function (tree, file) {
		// If not in the obsidian-note collection, then early exit
		if (!file.history[0].includes('/obsidian-note')) {
			return;
		}

		const filepath = file.history[0];
		const result = execSync(
			`cd src/content/obsidian-note && git log -1 --pretty="format:%cI" "${filepath}"`,
		);
		file.data.astro.frontmatter.lastModified = result.toString();
	};
}
