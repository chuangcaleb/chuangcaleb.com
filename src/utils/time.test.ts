import {
	afterEach,
	describe,
	expect,
	it,
	vi,
} from 'vitest';
import {
	formatDateRange,
	formatDisplayDate,
	formatIso,
	formatRelativeDuration,
	getRelativeSince,
	isWithinDuration,
} from './time.ts';

describe('formatDisplayDate', () => {
	it('returns null for undefined', () => {
		expect(formatDisplayDate(undefined)).toBeNull();
	});

	it('formats a Date as "dd MMM yyyy"', () => {
		expect(formatDisplayDate(new Date('2024-07-05T00:00:00'))).toBe('05 Jul 2024');
	});
});

describe('formatIso', () => {
	it('parses an ISO string and formats with the template', () => {
		expect(formatIso('2024-01-09', 'MMM yyyy')).toBe('Jan 2024');
	});
});

describe('formatDateRange', () => {
	it('uses "Present" when there is no end date', () => {
		expect(formatDateRange('2024-07-01')).toBe('Jul 2024 — Present');
	});

	it('formats a closed range', () => {
		expect(formatDateRange('2022-10-01', '2024-07-01')).toBe('Oct 2022 — Jul 2024');
	});
});

describe('formatRelativeDuration', () => {
	it('formats years and months', () => {
		expect(formatRelativeDuration('2022-07-01', '2024-08-01')).toBe('2 yrs 1 mo');
	});

	it('uses singular year', () => {
		expect(formatRelativeDuration('2023-01-01', '2024-01-01')).toBe('1 yr');
	});

	it('falls back to "<1 mo" for sub-month spans', () => {
		expect(formatRelativeDuration('2024-01-01', '2024-01-10')).toBe('<1 mo');
	});
});

describe('now-relative helpers', () => {
	afterEach(() => {
		vi.useRealTimers();
	});

	it('getRelativeSince returns "<1d" for today', () => {
		vi.useFakeTimers();
		vi.setSystemTime(new Date('2024-07-10T12:00:00'));
		expect(getRelativeSince(new Date('2024-07-10T06:00:00'))).toBe('<1d');
	});

	it('getRelativeSince returns days within 91 days', () => {
		vi.useFakeTimers();
		vi.setSystemTime(new Date('2024-07-10T00:00:00'));
		expect(getRelativeSince(new Date('2024-07-01T00:00:00'))).toBe('9d');
	});

	it('getRelativeSince returns years beyond 91 days', () => {
		vi.useFakeTimers();
		vi.setSystemTime(new Date('2024-07-10T00:00:00'));
		expect(getRelativeSince(new Date('2023-07-10T00:00:00'))).toBe('1y');
	});

	it('isWithinDuration compares against the threshold', () => {
		vi.useFakeTimers();
		vi.setSystemTime(new Date('2024-07-10T00:00:00'));
		expect(isWithinDuration(new Date('2024-07-08T00:00:00'), 7)).toBe(true);
		expect(isWithinDuration(new Date('2024-06-01T00:00:00'), 7)).toBe(false);
	});
});
