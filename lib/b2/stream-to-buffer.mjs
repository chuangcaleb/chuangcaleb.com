import {Buffer} from 'node:buffer';

/**
 Converts a WHATWG ReadableStream<Uint8Array> into a Node.js Buffer.
 @param {ReadableStream<Uint8Array>} stream - The WHATWG ReadableStream to convert.
 */
export async function streamToBuffer(stream) {
	const reader = stream.getReader();
	const chunks = [];

	while (true) {
		// eslint-disable-next-line no-await-in-loop
		const {done, value} = await reader.read();
		if (done) {
			break;
		}

		chunks.push(value);
	}

	return Buffer.concat(chunks.map(chunk => Buffer.from(chunk)));
}
