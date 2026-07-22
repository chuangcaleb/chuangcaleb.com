import {describe, expect, it} from 'vitest';
import {gnr} from './note-route.ts';

describe('gnr (getNoteRoute)', () => {
	it('prefixes a slug with /notes', () => {
		expect(gnr('my-note')).toBe('/notes/my-note');
	});

	it('joins nested slugs', () => {
		expect(gnr('folder/my-note')).toBe('/notes/folder/my-note');
	});
});
