import fs from 'node:fs';
import {composeErrorStr} from 'lib/utils/log';
import {JSON_FILE} from '../consts';
import type {CloudinaryResource} from '../types';

export async function write(resources: CloudinaryResource[]): Promise<void> {
	const contents = {
		date: new Date(),
		root: resources,
	};

	try {
		fs.writeFileSync(JSON_FILE, JSON.stringify(contents, null, 2));
		console.info(`📝 Updated ${JSON_FILE}`);
	} catch (error: unknown) {
		console.error(
			`🚨 Error updating ${JSON_FILE}:\n\n${composeErrorStr(error)}`,
		);
	}
}
