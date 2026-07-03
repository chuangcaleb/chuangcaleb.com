/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call -- Legacy plugin using any-typed AST nodes. Typed rewrite deferred. */
import type {Code, Root} from 'mdast';
import {type Plugin} from 'unified';
import {visit} from 'unist-util-visit';

export const remarkStripObsidianUtilities: Plugin<void[], Root> =
	() => tree => {
		visit(tree, 'code', (node: any, index, parent: any) => {
			const isMetaBindEmbed =
				(node as Code).lang === 'meta-bind-embed'
				&& parent !== undefined
				&& typeof index === 'number'
				&& Array.isArray(parent.children);
			if (!isMetaBindEmbed) {
				return;
			}

			parent.children.splice(index, 1);
		});
	};
