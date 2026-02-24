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
	title,
	heading: `${pillVariants.fresh.emoji} ${title}`,
	description: "Caleb's recently modified digital garden notes.",
	fn,
};
