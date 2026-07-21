import {fileURLToPath} from 'node:url';
import {defineConfig} from 'vitest/config';

// Mirror the tsconfig `paths` (`~/* -> src/*`) and the bare `lib/*`
// imports so unit tests resolve modules the same way the app does.
export default defineConfig({
	resolve: {
		alias: {
			'~': fileURLToPath(new URL('src', import.meta.url)),
			lib: fileURLToPath(new URL('lib', import.meta.url)),
		},
	},
	test: {
		environment: 'node',
		include: ['**/*.test.ts'],
	},
});
