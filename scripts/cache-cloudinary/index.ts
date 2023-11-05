import fetchFolderRecursive from './fetch';
import { write } from './write';

const ROOT_DIR = 'chuangcaleb/upload';

// Save all Cloudinary image details with a single Admin API call each time the build begins
async function cache(folderName: string): Promise<void> {
  const resources = await fetchFolderRecursive(folderName);
  await write(resources);
}

cache(ROOT_DIR);
