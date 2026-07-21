import {describe, expect, it} from 'vitest';
import {cn} from './css.ts';

describe('cn', () => {
	it('joins truthy class values', () => {
		expect(cn('a', 'b')).toBe('a b');
	});

	it('drops falsy values and merges conditionals', () => {
		expect(cn('a', false, undefined, null, 'b')).toBe('a b');
		expect(cn('base', {active: true, hidden: false})).toBe('base active');
	});
});
