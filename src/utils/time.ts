import {
  differenceInDays,
  format,
  formatDuration,
  intervalToDuration,
  parseISO,
} from "date-fns";

export function getLongDurationSince(datetime: number) {
  const then = new Date(datetime);
  const days = differenceInDays(new Date(), then);
  const duration = intervalToDuration({ start: then, end: new Date() });

  if (days < 365) {
    const months = formatDuration({ months: duration?.months });
    return `${months} ago`;
  }

  const years = Number((days / 365).toFixed(1));
  return `${formatDuration({ years })} ago`;
}

export function formatISO(date: string, template: string) {
  return format(parseISO(date), template);
}
