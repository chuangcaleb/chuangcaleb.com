import fetchFolderRecursive from "./fetchFolderRecursive";
import { write } from "./write";

// Save all Cloudinary image details with a single Admin API call each time the build begins
async function cache(folderName: string): Promise<void> {
  const resources = await fetchFolderRecursive(folderName);
  await write("cloud-cache", resources);
}

cache("chuangcaleb/upload");
