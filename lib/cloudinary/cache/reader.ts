import fsExtra from 'fs-extra/esm';
import {composeErrorString} from 'lib/utils/log';
import {JSON_FILE} from '../consts.js';
import type {CloudinaryResource} from '../types.js';

let resources: CloudinaryResource[];

try {
	const json = await fsExtra.readJson(JSON_FILE) as {root: CloudinaryResource[]};
	resources = json.root;
} catch (error: unknown) {
	throw new Error(
		`🚨 Error reading ${JSON_FILE}:\n\n${composeErrorString(error)}`,
	);
}

export default function getCache(): CloudinaryResource[] {
	return resources;
}
