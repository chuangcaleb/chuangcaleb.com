import type {SuperNote} from 'lib/utils/types';
import {pillVariants} from '~/utils/pill-variants.ts';

const title = 'Recently Modified';

const fn = (notes: SuperNote[]) => {
	return notes
		.filter(
			(n): n is SuperNote & {data: {modified: Date}} =>
				Boolean(n.data.modified) && !n.data.emojip,
		)
		.sort((a, b) => b.data.modified.getTime() - a.data.modified.getTime());
};

export const modifiedMeta = {
	head: {
		title,
		description: "Caleb's recently modified digital garden notes.",
	},
	heading: `${pillVariants.fresh.emoji} ${title}`,
	subtitle: 'Recent interests and developments.',
	linkMore: '/notes/public-digital-garden-metadata#-modified-date',
	link: '/notes/modified',
	fn,
};
