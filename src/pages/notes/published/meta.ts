import type {SuperNote} from 'lib/utils/types';
import {pillVariants} from '~/utils/pill-variants.ts';

const title = 'Recently Published';

const fn = (notes: SuperNote[]) => {
	return notes
		.filter((n): n is SuperNote & {data: {published: Date}} =>
			Boolean(n.data.published),
		)
		.sort((a, b) => b.data.published.getTime() - a.data.published.getTime());
};

export const publishedMeta = {
	title,
	heading: `${pillVariants.new.emoji} ${title}`,
	description: "Caleb's recently published digital garden notes.",
	subtitle: 'Refined authored content.',
	linkMore: '/notes/public-digital-garden-metadata#-published-date',
	link: '/notes/published',
	fn,
};
