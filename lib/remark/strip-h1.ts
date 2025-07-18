import type {Root} from 'mdast';
import type {Plugin} from 'unified';
import {EXIT, visit} from 'unist-util-visit';

export const remarkStripH1: Plugin<void[], Root> = () => {
	return (tree: Root) => {
		visit(tree, 'heading', (node, index, parent) => {
			if (
				node.depth === 1 &&
				typeof index === 'number' &&
				parent &&
				Array.isArray(parent.children)
			) {
				parent.children.splice(index, 1);
				return EXIT;
			}
		});
	};
};
