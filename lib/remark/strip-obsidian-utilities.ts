import type {Code, Root} from 'mdast';
import {type Plugin} from 'unified';
import {visit} from 'unist-util-visit';

export const remarkStripObsidianUtilities: Plugin<void[], Root> = () => {
	return (tree) => {
		visit(tree, 'code', (node: any, index, parent: any) => {
			if (
				(node as Code).lang === 'meta-bind-embed' &&
				parent &&
				typeof index === 'number' &&
				Array.isArray(parent.children)
			) {
				(parent.children as unknown as Node[]).splice(index, 1);
			}
		});
	};
};
