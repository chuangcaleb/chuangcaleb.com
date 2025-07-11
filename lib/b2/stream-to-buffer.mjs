import {Buffer} from 'node:buffer';

/**
 * Converts a WHATWG ReadableStream<Uint8Array> into a Node.js Buffer
 */
// export async function streamToBuffer(stream: ReadableStream<Uint8Array>): Promise<Buffer> {
export async function streamToBuffer(stream) {
	const reader = stream.getReader();
	// const chunks: Uint8Array[] = [];
	const chunks = [];

	while (true) {
		// eslint-disable-next-line no-await-in-loop
		const {done, value} = await reader.read();
		if (done) break;
		chunks.push(value);
	}

	return Buffer.concat(chunks.map((chunk) => Buffer.from(chunk)));
}
