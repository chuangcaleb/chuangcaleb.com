import {Buffer} from 'node:buffer';
import {mkdir, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {Readable} from 'node:stream';
import {Parse as parse} from 'unzipper';

/**
 * Convert a WHATWG ReadableStream<Uint8Array> to a Node.js Readable stream.
 */
// function readableWebToNode(webStream: ReadableStream<Uint8Array>): Readable {
function readableWebToNode(webStream) {
	const reader = webStream.getReader();

	return new Readable({
		async read() {
			const {done, value} = await reader.read();
			if (done) return this.push(null);
			this.push(Buffer.from(value));
		},
	});
}

/**
 * Extract a web ReadableStream<Uint8Array> ZIP into the given output directory.
 *
 * @param zipWebStream The ReadableStream<Uint8Array> containing the ZIP archive
 * @param outDir Absolute or relative path to output directory
 */
export async function extractZipStreamToDir(
	// zipWebStream: ReadableStream<Uint8Array>,
	// outDir: string
	zipWebStream,
	outDir,
	// ): Promise<void> {
) {
	const nodeStream = readableWebToNode(zipWebStream);
	const zipEntries = nodeStream.pipe(parse());

	for await (const entry of zipEntries) {
		const rawPath = entry.path;

		// 🛡️ Normalize and reject unsafe paths (e.g. ../../)
		const safePath = path.normalize(rawPath).replace(/^(\.\.(\/|\\|$))+/, '');
		const destPath = path.join(outDir, safePath);

		if (entry.type === 'File') {
			await mkdir(path.dirname(destPath), {recursive: true});
			const chunks = [];

			for await (const chunk of entry) {
				chunks.push(chunk);
			}

			await writeFile(destPath, Buffer.concat(chunks));
			console.log('✅ Extracted:', safePath);
		} else {
			entry.autodrain(); // Skip directories and others
		}
	}
}
