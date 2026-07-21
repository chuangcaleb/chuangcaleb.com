import type {Root} from 'mdast';
import type {Transformer} from 'unified';
import {describe, expect, it} from 'vitest';
import {remarkStripH1} from './strip-h1.ts';

function heading(depth: 1 | 2, value: string) {
	return {
		type: 'heading' as const,
		depth,
		children: [{type: 'text' as const, value}],
	};
}

function run(tree: Root): Root {
	// The attacher takes no options and returns a synchronous transformer;
	// invoke it directly rather than through a unified processor.
	const transform = (remarkStripH1 as () => Transformer<Root, Root>)();
	void transform(tree, {} as never, () => undefined);
	return tree;
}

describe('remarkStripH1', () => {
	it('removes the first h1 heading', () => {
		const tree: Root = {
			type: 'root',
			children: [
				heading(1, 'Title'),
				{type: 'paragraph', children: [{type: 'text', value: 'body'}]},
				heading(2, 'Section'),
			],
		};

		run(tree);

		const depths = tree.children
			.filter(node => node.type === 'heading')
			.map(node => (node as {depth: number}).depth);
		expect(depths).toEqual([2]);
		expect(tree.children).toHaveLength(2);
	});

	it('leaves a tree without an h1 untouched', () => {
		const tree: Root = {
			type: 'root',
			children: [heading(2, 'Section')],
		};

		run(tree);

		expect(tree.children).toHaveLength(1);
	});
});
