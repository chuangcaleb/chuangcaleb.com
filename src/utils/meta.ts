import type { CollectionEntry } from "astro:content";
import type { Reference } from "~/components/layout/NoteLayout/components/metadata/MetadataValueItem.astro";

export function isMetaContains(
  value: string | string[] | undefined,
  query: string,
) {
  if (!value) return false;
  if (Array.isArray(value)) {
    return value.includes(query);
  }
  return value === "query";
}

export function isInCollection(
  note: Reference | Reference[] | undefined,
  query: string,
) {
  if (!note) return false;
  if (Array.isArray(note)) {
    return note.some((n) => n.slug === query);
  }

  return note.slug === query;
}
