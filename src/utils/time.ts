import {
	differenceInDays,
	differenceInMonths,
	format,
	parseISO,
} from 'date-fns';

export function formatDisplayDate(datetime?: string | Date) {
	if (datetime === undefined || datetime === null) {
		return null;
	}

	return format(datetime, 'dd MMM yyyy');
}

export function getLongDurationSince(then: Date) {
	const daysCount = differenceInDays(new Date(), then);
	// rounding
	if (daysCount >= 350) {
		const years = Number((daysCount / 365).toPrecision(2));
		return {
			short: `${years}y`,
			long: `about ${years} year${years === 1 ? '' : 's'}`,
		};
	}

	if (daysCount === 0) {
		return {short: '<1d', long: 'some hours'};
	}

	return {
		short: `${daysCount}d`,
		long: `${daysCount} day${daysCount === 1 ? '' : 's'}`,
	};
}

export function isWithinDuration(datetime: Date, days: number) {
	const daysCount = differenceInDays(new Date(), datetime);
	return daysCount < days;
}

export function formatIso(date: string, template: string) {
	return format(parseISO(date), template);
}

/** "Jul 2024 — Present" or "Oct 2022 — Jul 2024" */
export function formatDateRange(start: string, end?: string) {
	const startDate = parseISO(start);
	const hasEnd = end !== undefined;
	const startString = format(startDate, 'MMM yyyy');
	const endString = hasEnd ? format(parseISO(end), 'MMM yyyy') : 'Present';
	return `${startString} — ${endString}`;
}

/** "2 yrs 1 mo" from start to end (or now if no end) */
export function formatRelativeDuration(start: string, end?: string) {
	const startDate = parseISO(start);
	const hasEnd = end !== undefined;
	const endDate = hasEnd ? parseISO(end) : new Date();
	const totalMonths = differenceInMonths(endDate, startDate);
	const years = Math.floor(totalMonths / 12);
	const months = totalMonths % 12;

	const parts: string[] = [];
	if (years > 0) {
		parts.push(`${years} yr${years > 1 ? 's' : ''}`);
	}

	if (months > 0) {
		parts.push(`${months} mo`);
	}

	return parts.length > 0 ? parts.join(' ') : '<1 mo';
}
