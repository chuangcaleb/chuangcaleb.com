import {describe, expect, it} from 'vitest';
import {getGeneratedAvatarUrl} from './avatar.ts';

describe('getGeneratedAvatarUrl', () => {
	it('builds a DiceBear notionists-neutral URL seeded with the given string', () => {
		const url = getGeneratedAvatarUrl('Jane Doe');

		expect(url).toBe('https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Jane+Doe&backgroundColor=e8e6dc');
	});

	it('URL-encodes special characters in the seed', () => {
		const url = getGeneratedAvatarUrl('a&b=c');

		expect(url).toContain('seed=a%26b%3Dc');
	});
});
