import path from 'node:path';

function getNoteRoute(slug: string) {
	return path.join('/notes', slug);
}

// Shorter alias, like cn
export const gnr = getNoteRoute;
