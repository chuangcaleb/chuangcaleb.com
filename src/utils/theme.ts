export type ThemePreference = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'theme-preference';

const THEME_PREFERENCES = new Set<unknown>(['light', 'dark', 'system']);

export function isThemePreference(value: unknown): value is ThemePreference {
	return THEME_PREFERENCES.has(value);
}

export function resolveTheme(preference: ThemePreference, systemTheme: ResolvedTheme): ResolvedTheme {
	return preference === 'system' ? systemTheme : preference;
}

export function getSystemTheme(): ResolvedTheme {
	return globalThis.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
