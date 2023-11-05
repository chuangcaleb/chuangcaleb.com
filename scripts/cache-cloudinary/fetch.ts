import type { CloudinaryResource } from 'lib/cloudinary/types';
import cloudinary from 'lib/cloudinary';

async function fetchNextPage(
  folderName: string,
  nextCursor?: string,
): Promise<CloudinaryResource[]> {
  const response = await cloudinary.api
    .resources({
      // metadata: true,
      // context: true,
      // tags: true,
      prefix: folderName,
      type: 'upload',
      max_results: 500,
      next_cursor: nextCursor,
    })
    .catch((error: unknown) => {
      throw Error(
        `🚨 Error fetching Cloudinary resources by asset folder "${folderName}":\n\n${JSON.stringify(
          error,
        )}\n`,
      );
    });

  return response.resources;
}

async function fetchFolderRecursive(
  folderName: string,
): Promise<CloudinaryResource[]> {
  console.info(
    `📥 Fetching all Cloudinary resources from folder "${folderName}"`,
  );

  const fetchedResources: CloudinaryResource[] = [];

  let nextCursor;
  do {
    const resources = await fetchNextPage(folderName, nextCursor);

    fetchedResources.push(...resources);

    nextCursor = resources?.[0].next_cursor;
  } while (nextCursor);

  console.info(
    `✅ Fetched ${fetchedResources.length} Cloudinary resources from folder "${folderName}"`,
  );

  return fetchedResources;
}

export default fetchFolderRecursive;
