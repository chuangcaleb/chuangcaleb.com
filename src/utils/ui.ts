import { parse } from "node-html-parser";

export function cn(...classStrings: (string | null | undefined)[]) {
  const classes = classStrings.filter(Boolean);
  if (!classes.length) return null;
  return classes.join(" ");
}

export async function hs(htmlString: string, className: string | null) {
  const root = parse(htmlString);
  className && root.querySelector(":parent")?.classList.add(className);
  // set yo own attributes
  // we could iterate through each prop and set it manually, if it ever comes to that
  return root.toString();
}
