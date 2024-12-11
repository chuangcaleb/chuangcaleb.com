import process from 'node:process';
import path from 'node:path';
import {pipeline} from 'node:stream/promises';
import {google} from 'googleapis';
import dotenv from 'dotenv';
import fs from 'fs-extra';
import jwt from '../jwt.js';

// TODO: conver to Promise.all

dotenv.config();

// initialize + authorize drive client
const drive = google.drive({version: 'v3', auth: jwt});

// get root id
const rootId = process.env.GOOGLE_DRIVE_CONTENT_FOLDER_ID;
if (!rootId) throw new Error(`Missing env: GOOGLE_DRIVE_CONTENT_FOLDER_ID`);

// helper functions
async function getFolderContents(id: string) {
	const response = await drive.files.list({
		q: `'${id}' in parents and trashed = false`,
	});
	return response.data.files;
}

async function downloadFile(
	fileName: string,
	fileId: string,
	filePath: string,
) {
	const response = await drive.files.get(
		{fileId, alt: 'media'},
		{responseType: 'stream'},
	);
	const destination = fs.createWriteStream(filePath);
	await pipeline(response.data, destination);
	console.info(`  ✅ ${fileName}`);
}

// main function
async function downloadFolder(folderId: string, destination: string) {
	try {
		// 1. Ensure the destination folder exists
		if (!fs.existsSync(destination)) {
			fs.mkdirSync(destination, {recursive: true});
		}

		// 2a. Get files in folder
		const files = await getFolderContents(folderId);
		// 2b. Handle empty folder
		if (!files || files.length === 0) return;

		// 3. Iterate over folder children
		for await (const file of files) {
			if (typeof file.name !== 'string' || typeof file.id !== 'string') {
				continue;
			}

			const filePath = path.join(destination, file.name);

			// 3a. If subfolder, recurse
			if (file.mimeType === 'application/vnd.google-apps.folder') {
				// If it's a subfolder, recursively download it
				await downloadFolder(file.id, filePath);
				continue;
			}

			// 3b. If file, then download
			await downloadFile(file.name, file.id, filePath);
		}
	} catch (error) {
		if (error instanceof Error) {
			console.error('🚨 Error:', error.message);
			return;
		}

		console.error('🚨 Error', error);
	}
}

// entry
const destination = 'src/content/obsidian-note';
console.info(
	`📥 Beginning to download Google Drive folder "${rootId}" to "${destination}"`,
);
await downloadFolder(rootId, destination);
