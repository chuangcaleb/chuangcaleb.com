import process from 'node:process';
import dotenv from 'dotenv';
import {GoogleSpreadsheet} from 'google-spreadsheet';
import {auth} from '../jwt.js';
import type {GuestPost} from './types.js';

export async function getGuestbookPosts() {
	dotenv.config();

	const id = process.env.GUESTBOOK_GOOGLE_SHEET_ID;
	if (id === undefined || id === null) {
		throw new Error('Missing GUESTBOOK_GOOGLE_SHEET_ID in .env');
	}

	const document = new GoogleSpreadsheet(id, auth);

	await document.loadInfo();
	const sheet = document.sheetsByIndex[0];
	const rows = await sheet.getRows();

	return rows.map(r => r.toObject()) as GuestPost[];
}
