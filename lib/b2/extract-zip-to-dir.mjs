import {Readable} from 'node:stream';
import {Buffer} from 'node:buffer';
import {Extract as extract} from 'unzipper';

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
	await nodeStream.pipe(extract({path: outDir})).promise();
}
