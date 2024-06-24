import path from "path";

export function getNoteName(filepath: string) {
  // TODO: get title from file metadata first
  const { dir, name } = path.parse(filepath);
  if (name === "index") return dir;
  return name;
}
