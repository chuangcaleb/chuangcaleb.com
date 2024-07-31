import type {ResourceApiResponse} from 'cloudinary';
import type {CloudinaryResource} from '../types';
import cloudinary from '../instance';

async function fetchNextPage(
	folderName: string,
	nextCursor?: string,
) {
	try {
		const response = await cloudinary.api
			.resources({
			// Metadata: true,
			// context: true,
			// tags: true,
				prefix: folderName,
				type: 'upload',
				max_results: 500,
				next_cursor: nextCursor,
			}) as ResourceApiResponse;
		console.info(`📊 Rate limit remaining: ${response.rate_limit_remaining}`);
		return response.resources;
	} catch (error: unknown) {
		throw new Error(
			`🚨 Error fetching Cloudinary resources by asset folder "${folderName}":\n\n${JSON.stringify(
				error,
			)}\n`,
		);
	}
}

async function fetchFolderRecursive(
	folderName: string,
) {
	console.info(
		`📥 Fetching all Cloudinary resources from folder "${folderName}"`,
	);

	const fetchedResources: CloudinaryResource[] = [];

	let nextCursor;
	do {
		// We need to await page-per-page
		// eslint-disable-next-line no-await-in-loop
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
