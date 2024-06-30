export function removeConsecHyphens(string: string) {
	return string.replaceAll(/-+/g, '-');
}

// https://byby.dev/js-slugify-string
export function slugify(string_: string) {
	return String(string_)
		.normalize('NFKD') // Split accented characters into their base characters and diacritical marks
		.replaceAll(/[\u0300-\u036F]/g, '') // Remove all the accents, which happen to be all in the \u03xx UNICODE block.
		.trim() // Trim leading or trailing whitespace
		.toLowerCase() // Convert to lowercase
		.replaceAll(/[^a-z\d -/]/g, '') // Remove non-alphanumeric characters
		.replaceAll(/\s+/g, '-') // Replace spaces with hyphens
		.replaceAll(/-+/g, '-'); // Remove consecutive hyphens
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
