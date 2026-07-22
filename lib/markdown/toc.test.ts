import type {MarkdownHeading} from 'astro';
import {describe, expect, it} from 'vitest';
import generateToc from './toc.ts';

function h(depth: number, text: string): MarkdownHeading {
	return {depth, text, slug: text.toLowerCase().replaceAll(/\s+/gv, '-')};
}

describe('generateToc', () => {
	it('drops h1 and h5+ headings', () => {
		const toc = generateToc([h(1, 'Title'), h(2, 'Kept'), h(5, 'Dropped')]);
		expect(toc).toHaveLength(1);
		expect(toc[0].text).toBe('Kept');
	});

	it('keeps same-depth headings as siblings', () => {
		const toc = generateToc([h(2, 'A'), h(2, 'B')]);
		expect(toc.map(t => t.text)).toEqual(['A', 'B']);
		expect(toc[0].children).toEqual([]);
	});

	it('nests deeper headings as children', () => {
		const toc = generateToc([h(2, 'Parent'), h(3, 'Child'), h(4, 'Grandchild')]);
		expect(toc).toHaveLength(1);
		expect(toc[0].children).toHaveLength(1);
		const child = toc[0].children.at(0)!;
		expect(child.text).toBe('Child');
		expect(child.children.at(0)!.text).toBe('Grandchild');
	});

	it('throws on an orphan heading', () => {
		expect(() => generateToc([h(3, 'Deep'), h(2, 'Shallow')])).toThrow(/Orphan heading/v);
	});
});
