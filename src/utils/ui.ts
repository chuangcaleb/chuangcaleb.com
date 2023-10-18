export function cn(...classStrings: (string | null | undefined)[]) {
  const classStr = classStrings.filter(Boolean);
  if (!classStr.length) return null;
  return classStr.join(" ");
}
