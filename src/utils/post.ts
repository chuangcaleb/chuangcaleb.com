import { getEntry, type CollectionKey } from "astro:content";
import path from "path";

export function getNoteName(filepath: string) {
  const { dir, name } = path.parse(filepath);
  if (name === "index") return dir;
  return name;
}
