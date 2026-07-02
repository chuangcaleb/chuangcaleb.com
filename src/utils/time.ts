import {differenceInDays, format, parseISO} from 'date-fns';

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
