import {differenceInDays, format, parseISO} from 'date-fns';

export function formatDisplayDate(datetime?: string | Date) {
	if (!datetime) {
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
		return {short: `<1d`, long: `less than 1 day`};
	}

	return {
		short: `${daysCount}d`,
		long: `${daysCount} day${daysCount === 1 ? '' : 's'}`,
	};
	// const interval = intervalToDuration({start: then, end: new Date()});

	// if (interval?.years) {
	// 	const value = Number(
	// 		(
	// 			interval.years + (interval?.months ? interval.months / 12 : 0)
	// 		).toPrecision(2),
	// 	);
	// 	return `${value} ${value === 1 ? 'year' : 'years'} ago`;
	// }

	// if (interval?.months) {
	// 	const value = Number(
	// 		(interval.months + (interval?.days ? interval.days / 28 : 0)).toPrecision(
	// 			2,
	// 		),
	// 	);
	// 	return `${value} ${value === 1 ? 'month' : 'months'} ago`;
	// }

	// if (interval?.days) {
	// 	const value = interval?.days ?? 1;
	// 	return `${value} ${value === 1 ? 'day' : 'days'} ago`;
	// }

	// return `<1 day ago`;
}

export function isWithinDuration(datetime: Date, days: number) {
	const daysCount = differenceInDays(new Date(), datetime);
	return daysCount < days;
}

export function formatIso(date: string, template: string) {
	return format(parseISO(date), template);
}
