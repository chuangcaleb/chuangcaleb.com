import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import dotenv from 'dotenv';
import B2 from 'backblaze-b2';

dotenv.config();

const B2_DEST_DIR = 'src/content/obsidian-note';
const B2_BUCKET_PREFIX = 'notes';
const {B2_KEY_ID, B2_APP_KEY, B2_BUCKET_NAME} = process.env;

const downloadFile = async (file) => {
	try {
		const response = await b2.downloadFileById({
			fileId: file.fileId,
			responseType: 'text',
		});

		const pathWithoutPrefix = file.fileName.startsWith(B2_BUCKET_PREFIX)
			? file.fileName.slice(B2_BUCKET_PREFIX.length)
			: file.fileName;
		const filePath = path.join(B2_DEST_DIR, pathWithoutPrefix);

		await fs.mkdir(path.dirname(filePath), {recursive: true});
		await fs.writeFile(filePath, response.data);

		console.log(`✓ Downloaded: ${file.fileName}`);
		return file.fileName;
	} catch (error) {
		throw new Error(
			`❌ Failed to download file "${file.fileName}": ${error.message}`,
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
		await b2.authorize();

		const {
			data: {buckets},
		} = await b2.getBucket({bucketName: B2_BUCKET_NAME});
		const {bucketId} = buckets[0];

		console.log(`📂 Listing notes in bucket...`);
		const fileList = await b2.listFileNames({
			bucketId,
			prefix: B2_BUCKET_PREFIX,
		});
		const {files} = fileList.data;

		if (files.length === 0) {
			console.log('No notes found in the bucket.');
			return;
		}

		console.log(`⬇️ Downloading ${files.length} notes to "${B2_DEST_DIR}"...`);
		await Promise.all(files.map((file) => downloadFile(file)));

		console.log('✅ All files downloaded successfully.');
	} catch (error) {
		throw new Error('❌ B2 sync failed:', error);
	}
}

await main();
