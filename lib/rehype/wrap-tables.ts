import type {Root, Element} from 'hast';
import type {Plugin} from 'unified';
import {visit} from 'unist-util-visit';

const rehypeWrapTables: Plugin<void[], Root> = () => tree => {
	visit(tree, 'element', (node, index, parent) => {
		const isTable =
			node?.tagName === 'table'
			&& parent !== undefined
			&& Array.isArray(parent.children)
			&& typeof index === 'number';
		if (!isTable) {
			return;
		}

		const wrapper: Element = {
			type: 'element',
			tagName: 'div',
			properties: {className: ['table-wrapper']},
			children: [node],
		};

		parent.children[index] = wrapper;
	});
};

export default rehypeWrapTables;
