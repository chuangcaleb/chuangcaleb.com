// Adapted from https://github.com/withastro/docs/blob/882e0b0a9d16d1c822cb8c230a62a4bfcd308605/src/util/generateToc.ts
// found at https://kld.dev/building-table-of-contents/
import type {MarkdownHeading} from 'astro';

export type TocItem = {
	children: TocItem[];
} & MarkdownHeading;

function diveChildren(item: TocItem, depth: number): TocItem[] {
	if (depth === 1) {
		return item.children;
	}

	// E.g., 2
	return diveChildren(item.children.at(-1), depth - 1);
}

export default function generateToc(
	headings: MarkdownHeading[],
	// Title = "Overview",
) {
	// Const overview = { depth: 2, slug: "overview", text: title };
	headings =
		// Overview,
		headings.filter(({depth}) => depth > 1 && depth < 5);
	const toc: TocItem[] = [];

	for (const heading of headings) {
		if (toc.length === 0) {
			toc.push({
				...heading,
				children: [],
			});
		} else {
			const lastItemInToc = toc.at(-1);
			if (heading.depth < lastItemInToc.depth) {
				throw new Error(`Orphan heading found: ${heading.text}.`);
			}

			if (heading.depth === lastItemInToc.depth) {
				// Same depth
				toc.push({
					...heading,
					children: [],
				});
			} else {
				// Higher depth
				// push into children, or children' children alike
				const gap = heading.depth - lastItemInToc.depth;
				const target = diveChildren(lastItemInToc, gap);
				target.push({
					...heading,
					children: [],
				});
			}
		}
	}

	return toc;
}
