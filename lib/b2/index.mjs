import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import B2 from 'backblaze-b2';
import decompress from 'decompress';
import dotenv from 'dotenv';
import {streamToBuffer} from './stream-to-buffer.mjs';

dotenv.config();

const B2_DEST_DIR = 'src/content/obsidian-note';
const B2_REDIRECTS_FILEPATH = 'src/data/note-redirects.json';
const B2_BUCKET_PREFIX = 'notes';
const {B2_KEY_ID, B2_APP_KEY, B2_BUCKET_NAME, B2_BUCKET_ID} = process.env;

function getSafeB2Url(downloadUrl, fileName) {
	const encodedPath = encodeURIComponent(fileName);
	// Do we need to encode the path segments individually?
	// .split('/')
	// .map((segment) => encodeURIComponent(segment))
	// .join('/');

	return `${downloadUrl}/file/${B2_BUCKET_NAME}/${encodedPath}`;
}

const downloadFile = async (fileName, auth) => {
	try {
		const {authorizationToken: authToken, downloadUrl} = auth;
		const url = getSafeB2Url(downloadUrl, fileName);
		const response = await fetch(url, {headers: {Authorization: authToken}});

		// prefer not to use SDK to avoid Backblaze Class B token costs
		// nah, this still incurs Class B token costs...
		// const response = await b2.downloadFileById({
		// 	fileId: file.fileId,
		// 	responseType: 'text',
		// });

		const pathWithoutPrefix = fileName.startsWith(B2_BUCKET_PREFIX)
			? fileName.slice(B2_BUCKET_PREFIX.length)
			: fileName;

		if (pathWithoutPrefix === '/redirects.json') {
			await fs.mkdir(path.dirname(B2_REDIRECTS_FILEPATH), {recursive: true});
			await fs.writeFile(B2_REDIRECTS_FILEPATH, response.body);
			return;
		}

		if (pathWithoutPrefix === '/notes.zip') {
			await fs.mkdir(path.dirname(B2_DEST_DIR), {recursive: true});
			const buffer = await streamToBuffer(response.body);
			await decompress(buffer, B2_DEST_DIR);
			return;
		}

		console.log(`⚠️ Unidentified file ${pathWithoutPrefix}`);
	} catch (error) {
		throw new Error(
			`❌ Failed to download file "${fileName}": ${error.message}`,
		);
	}
};

const b2 = new B2({
	applicationKeyId: B2_KEY_ID,
	applicationKey: B2_APP_KEY,
});

async function main() {
	try {
		console.log('🔐 Authorizing B2...');
		const {data: authData} = await b2.authorize();

		// const {
		// 	data: {buckets},
		// } = await b2.getBucket({bucketName: B2_BUCKET_NAME});
		// const {bucketId} = buckets[0];

		console.log(`📂 Listing notes in bucket...`);
		const fileList = await b2.listFileNames({
			bucketId: B2_BUCKET_ID,
			prefix: B2_BUCKET_PREFIX,
		});
		const {files} = fileList.data;

		if (files.length === 0) {
			console.log('No notes found in the bucket.');
			return;
		}

		console.log(`⬇️ Downloading ${files.length} files to "${B2_DEST_DIR}"...`);

		await Promise.all(
			files.map((file) => downloadFile(file.fileName, authData)),
		);
		console.log('✅ All files downloaded successfully.');
	} catch (error) {
		throw new Error('❌ B2 sync failed:', error);
	}
}

await main();
