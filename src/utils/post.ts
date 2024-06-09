import path from "path";
import {
  getCollection,
  getEntry,
  getEntryBySlug,
  type CollectionEntry,
} from "astro:content";
import { slugify } from "lib/markdown/string";

const DIR = "8 public";
// const SLUG_DIR = slugify(DIR);

// export function isPublic(note: CollectionEntry<"obsidian-note">) {
//   return note.id.startsWith(DIR);
// }

// function stripRootDir(string: string, rootDir: string) {
//   return string.substring(rootDir.length + 1, string.length);
// }

export function getPublicNotes() {
  return getCollection("obsidian-note");
  // return notes
  //   .filter((n) => isPublic(n))
  //   .map((n) => ({
  //     ...n,
  //     id: stripRootDir(n.id, DIR),
  //     slug: stripRootDir(n.slug, SLUG_DIR),
  //   }));
}

export function getNoteName(filepath: string) {
  const { dir, name } = path.parse(filepath);
  if (name === "index") return dir;
  return name;
}

function getNoteRoute(filepath: string) {
  const { dir, name } = path.parse(filepath);
  if (name === "index") return dir;
  return path.join(dir, name);
}

export async function getCollectionNotes(id: string) {
  const collection = await getEntry("obsidian-collection", getNoteName(id));
  if (!collection) return [];
  const notes = await Promise.all(
    collection.data.map((path) =>
      getEntryBySlug("obsidian-note", slugify(getNoteRoute(path))),
    ),
  );
  return notes.filter(Boolean);
}
