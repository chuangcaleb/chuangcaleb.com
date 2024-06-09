import path from "path";

export function removeConsecHyphens(string: string) {
  return string.replace(/-+/g, "-");
}

// https://byby.dev/js-slugify-string
export function slugify(str: string) {
  return String(str)
    .normalize("NFKD") // split accented characters into their base characters and diacritical marks
    .replace(/[\u0300-\u036f]/g, "") // remove all the accents, which happen to be all in the \u03xx UNICODE block.
    .trim() // trim leading or trailing whitespace
    .toLowerCase() // convert to lowercase
    .replace(/[^a-z0-9 -/]/g, "") // remove non-alphanumeric characters
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/-+/g, "-"); // remove consecutive hyphens
}

// https://dev.to/bybydev/how-to-slugify-a-string-in-javascript-4o9n
// export function slugify(str: string) {
//   str = str.replace(/^\s+|\s+$/g, ""); // trim leading/trailing white space
//   str = str.toLowerCase(); // convert string to lowercase
//   str = str
//     .replace(/[^a-z0-9 -]/g, "") // remove any non-alphanumeric characters
//     .replace(/\s+/g, "-") // replace spaces with hyphens
//     .replace(/-+/g, "-"); // remove consecutive hyphens
//   return str;
// }
