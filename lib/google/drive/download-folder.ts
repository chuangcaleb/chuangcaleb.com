// UNUSED, since migration to B2 Bucket
import process from 'node:process';
import path from 'node:path';
import {pipeline} from 'node:stream/promises';
import {type drive_v3, google} from 'googleapis';
import dotenv from 'dotenv';
import fs from 'fs-extra';
import jwt from '../jwt.js';

dotenv.config();

type DriveFile = drive_v3.Schema$File;

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

async function downloadFile(file: DriveFile, destination: string) {
	if (typeof file.name !== 'string' || typeof file.id !== 'string') {
		return;
	}

	const filePath = path.join(destination, file.name);
	const response = await drive.files.get(
		{fileId: file.id, alt: 'media'},
		{responseType: 'stream'},
	);
	const writeStream = fs.createWriteStream(filePath);
	await pipeline(response.data, writeStream);
	console.info(`  ✅ ${filePath}`);
}

function isFolder(file: DriveFile) {
	return file.mimeType === 'application/vnd.google-apps.folder';
}

async function recursiveDownloadFolder(folder: DriveFile, destination: string) {
	if (!folder.id || !folder.name) return false;
	return downloadFolder(folder.id, path.join(destination, folder.name));
}

// main function
async function downloadFolder(folderId: string, destination: string) {
	try {
		// 1. Ensure the destination folder exists
		if (!fs.existsSync(destination)) {
			fs.mkdirSync(destination, {recursive: true});
		}

		// 2a. Get files in folder
		const folderContents = await getFolderContents(folderId);
		// 2b. Handle empty folder
		if (!folderContents || folderContents.length === 0) return;

		// 3. Iterate over folder children
		// 3a. handle files
		const files = folderContents.filter((item) => !isFolder(item));
		// 3b. handle folders
		const folders = folderContents.filter((item) => isFolder(item));

		// 3c. compile and use async parallel Promise
		await Promise.all([
			...files.map(async (file) => downloadFile(file, destination)),
			...folders
				.map(async (folder) => recursiveDownloadFolder(folder, destination))
				.filter(Boolean),
		]);
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
