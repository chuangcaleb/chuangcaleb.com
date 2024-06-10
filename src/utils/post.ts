import { getEntry, type CollectionKey } from "astro:content";
import path from "path";

export function getNoteName(filepath: string) {
  const { dir, name } = path.parse(filepath);
  if (name === "index") return dir;
  return name;
}

export async function getCollectionNotes(id: CollectionKey) {
  const collection = await getEntry("obsidian-collection", id);
  if (!collection) return [];
  const notes = await Promise.all(
    collection.data.map((file) => getEntry(file)),
  );
  return notes.filter(Boolean);
}
