import {ROOT_DIR} from '../consts.js';
import fetchFolderRecursive from './fetch.js';
import {write} from './write.js';

// Save all Cloudinary image details with a single Admin API call each time the build begins
async function cache(folderName: string): Promise<void> {
	const resources = await fetchFolderRecursive(folderName);
	await write(resources);
}

await cache(ROOT_DIR);
