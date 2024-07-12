import process from 'node:process';
import {JWT, type JWTOptions} from 'google-auth-library';
import dotenv from 'dotenv';

dotenv.config();

const jwtOptions: JWTOptions = {
	email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
	key: process.env.GOOGLE_PRIVATE_KEY,
	scopes: ['https://www.googleapis.com/auth/spreadsheets'],
};
const jwt = new JWT(jwtOptions);

export {jwt as default};
