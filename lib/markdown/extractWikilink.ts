export function extractWikilink(string: string) {
  const filter = /\[\[([^|\]\^#]+)(?:[|\^#][^|\]]+)?\]\]/;
  return string.match(filter)?.[1] ?? "";
}
