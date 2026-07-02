import {toString} from 'mdast-util-to-string';
import getReadingTime from 'reading-time';

// NOTE: "mdast-util-to-string".toString doesn't whitespace consecutive blocks
//    this causes word count to be very underestimated
// https://github.com/syntax-tree/mdast-util-to-string/issues/10

function getRoughWordCount(content) {
	if (content === undefined || content === null) {
		return 0;
	}

	// eslint-disable-next-line require-unicode-regexp, regexp/no-super-linear-move, regexp/prefer-named-capture-group
	const clean = content.replaceAll(/<[^>]+(>|$)/g, '');
	/* eslint-disable-next-line require-unicode-regexp -- \s regex in legacy plugin */
	const wordCount = clean.split(/\s/g).length;
	return Number(wordCount.toPrecision(3));
}

export function remarkReadingTime() {
	return function (tree, {data}) {
		const textOnPage = toString(tree);
		const impreciseWordCount = getRoughWordCount(textOnPage);
		data.astro.frontmatter.wordCount = impreciseWordCount;
		data.astro.frontmatter.minutesRead = getReadingTime(textOnPage).text;
	};
}
