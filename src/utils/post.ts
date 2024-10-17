import path from 'node:path';

export function getNoteName(filepath: string) {
	// TODO: get title from file metadata first
	const {dir, name} = path.parse(filepath);
	if (name === 'index') {
		return dir;
	}

	return name;
}

function getNoteRoute(slug: string) {
	return path.join('/note', slug);
}

// Shorter alias, like cn
export const gnr = getNoteRoute;
