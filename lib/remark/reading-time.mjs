import { toString } from "mdast-util-to-string";
import getReadingTime from "reading-time";

// NOTE: "mdast-util-to-string".toString doesn't whitespace consecutive blocks
//    this causes word count to be very underestimated
// https://github.com/syntax-tree/mdast-util-to-string/issues/10

function getRoughWordCount(content) {
  if (!content) return;
  const clean = content.replace(/<\/?[^>]+(>|$)/g, "");
  const wordCount = clean.split(/\s/g).length;
  return Number(wordCount.toPrecision(3));
}

export function remarkReadingTime() {
  return function (tree, { data }) {
    const textOnPage = toString(tree);
    const impreciseWordCount = getRoughWordCount(textOnPage);
    data.astro.frontmatter.wordCount = impreciseWordCount;
    data.astro.frontmatter.minutesRead = getReadingTime(textOnPage).text;
  };
}
