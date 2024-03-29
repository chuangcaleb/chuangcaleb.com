import { getCollection, type CollectionEntry } from "astro:content";
import path from "path";
import { slugify } from "~/utils/text";

const DIR = "8 public";
const SLUG_DIR = slugify(DIR);

export function getParsedPath(string: string) {
  return path.parse(string);
}

export function isPublic(note: CollectionEntry<"obsidian-note">) {
  return note.id.startsWith(DIR);
}

function stripRootDir(string: string, rootDir: string) {
  return string.substring(rootDir.length + 1, string.length);
}

export async function getPublicNotes() {
  const notes = await getCollection("obsidian-note");
  return notes;
  // return notes
  //   .filter((n) => isPublic(n))
  //   .map((n) => ({
  //     ...n,
  //     id: stripRootDir(n.id, DIR),
  //     slug: stripRootDir(n.slug, SLUG_DIR),
  //   }));
}
