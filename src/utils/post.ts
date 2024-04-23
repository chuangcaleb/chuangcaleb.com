import { getCollection, type CollectionEntry } from "astro:content";

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
