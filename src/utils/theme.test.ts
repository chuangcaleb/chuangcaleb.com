import {describe, expect, it} from 'vitest';
import {isThemePreference, resolveTheme} from './theme.ts';

describe('isThemePreference', () => {
	it('accepts light, dark, and system', () => {
		expect(isThemePreference('light')).toBe(true);
		expect(isThemePreference('dark')).toBe(true);
		expect(isThemePreference('system')).toBe(true);
	});

	it('rejects anything else', () => {
		expect(isThemePreference('auto')).toBe(false);
		expect(isThemePreference(null)).toBe(false);
		expect(isThemePreference(undefined)).toBe(false);
	});
});

describe('resolveTheme', () => {
	it('returns the explicit preference when not system', () => {
		expect(resolveTheme('light', 'dark')).toBe('light');
		expect(resolveTheme('dark', 'light')).toBe('dark');
	});

	it('falls back to the system theme when preference is system', () => {
		expect(resolveTheme('system', 'dark')).toBe('dark');
		expect(resolveTheme('system', 'light')).toBe('light');
	});
});
