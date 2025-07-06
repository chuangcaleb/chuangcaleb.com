import type {Root, Element} from 'hast';
import type {Plugin} from 'unified';
import {visit} from 'unist-util-visit';

const rehypeWrapTables: Plugin<void[], Root> = () => {
	return (tree) => {
		visit(tree, 'element', (node, index, parent) => {
			if (
				node?.tagName === 'table' &&
				parent !== undefined &&
				// parent?.type === 'element' &&
				Array.isArray(parent.children) &&
				typeof index === 'number'
			) {
				const wrapper: Element = {
					type: 'element',
					tagName: 'div',
					properties: {className: ['table-wrapper']},
					children: [node],
				};

				parent.children[index] = wrapper;
			}
		});
	};
};

export default rehypeWrapTables;
