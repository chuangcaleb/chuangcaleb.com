import process from 'node:process';
import {google} from 'googleapis';
import dotenv from 'dotenv';
import jwt from '../jwt.js';

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

// main entry
const rootContent = await getFolderContents(rootId);

console.log('🚀 ~ rootContent:', rootContent);
