import { getCollection, type CollectionEntry } from "astro:content";
import path from "path";

export function getParsedPath(string: string) {
  return path.parse(string);
}

export function isPublic(note: CollectionEntry<"obsidian-note">) {
  return note.id.startsWith("8 public");
}

export async function getPublicNotes() {
  const notes = await getCollection("obsidian-note");
  return notes.filter((n) => isPublic(n));
}
