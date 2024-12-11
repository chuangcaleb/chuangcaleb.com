import process from 'node:process';
import {google} from 'googleapis';
import dotenv from 'dotenv';
import jwt from '../jwt.js';

dotenv.config();

const drive = google.drive({version: 'v3', auth: jwt});

const id = process.env.GOOGLE_DRIVE_CONTENT_FOLDER_ID;
if (!id) throw new Error(`Missing env: GOOGLE_DRIVE_CONTENT_FOLDER_ID`);

const la = await drive.files.list({
	q: `'${id}' in parents and trashed = false`,
});

console.log(la.data.files);
