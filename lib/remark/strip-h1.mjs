import path from 'node:path';

function getParsedPath(string) {
	return path.parse(string);
}

export function remarkStripH1() {
	return function (tree, file) {
		// // So we can't modify the value
		// const segments = /#.*\n*([\s\S]*)/.exec(file.value);
		// if (!segments) return;
		// file.value = segments[1];

		const filepath = file.history[0];

		if (!filepath.includes('/obsidian-note')) {
			return;
		}

		const first = tree.children[0];
		const hasH1 = first && first.type === 'heading' && first.depth === 1;
		if (hasH1) {
			tree.children.shift();
		}

		// Don't overwrite if `title` already exists in frontmatter
		if (file.data.astro.frontmatter.title) {
			return;
		}

		// Naively extract the text. This means no formatting in H1 titles allowed
		if (hasH1) {
			file.data.astro.frontmatter.title = first.children[0].value;
			return;
		}

		// All else fails, use file name
		file.data.astro.frontmatter.title = getParsedPath(filepath).name;
	};
}
