import process from 'node:process';
import {
	GoogleAuth,
	type GoogleAuth as GoogleAuthType,
} from 'google-auth-library';
import dotenv from 'dotenv';

function getGoogleAuth(): GoogleAuthType {
	dotenv.config();

	const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
	const key = process.env.GOOGLE_PRIVATE_KEY;
	if (
		email === undefined ||
		email === null ||
		key === undefined ||
		key === null
	) {
		throw new Error('Missing secret for Google service');
	}

	return new GoogleAuth({
		credentials: {
			client_email: email,
			private_key: key.replaceAll(String.raw`\\\\n`, '\n'),
		},
		scopes: [
			'https://www.googleapis.com/auth/spreadsheets',
			'https://www.googleapis.com/auth/drive.readonly',
		],
	});
}

export const auth = getGoogleAuth();
