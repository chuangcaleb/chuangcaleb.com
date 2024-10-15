import process from 'node:process';
import dotenv from 'dotenv';
import {GoogleSpreadsheet} from 'google-spreadsheet';
import jwt from './jwt.js';
import type {GuestPost} from './types.js';

dotenv.config();

export async function getGuestbookPosts() {
	try {
		const id = process.env.GUESTBOOK_GOOGLE_SHEET_ID;
		if (!id) {
			throw new Error('Missing GUESTBOOK_GOOGLE_SHEET_ID in .env');
		}

		const document = new GoogleSpreadsheet(id, jwt);

		await document.loadInfo();
		const sheet = document.sheetsByIndex[0];
		const rows = await sheet.getRows();

		return rows.map(r => r.toObject()) as GuestPost[];
	} catch (error) {
		throw error;
	}
}
