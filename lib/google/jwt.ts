import process from 'node:process';
import {JWT, type JWTOptions} from 'google-auth-library';
import dotenv from 'dotenv';

dotenv.config();

const {GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY} = process.env;
if (!GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) {
	throw new Error('Missing secret for Google service');
}

const jwtOptions: JWTOptions = {
	email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
	key: GOOGLE_PRIVATE_KEY.replaceAll(String.raw`\n`, '\n'),
	scopes: [
		'https://www.googleapis.com/auth/spreadsheets',
		'https://www.googleapis.com/auth/drive.readonly',
	],
};

const jwt = new JWT(jwtOptions);

export default jwt;
