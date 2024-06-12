import { format, formatDuration, intervalToDuration, parseISO } from "date-fns";

export function formatDisplayDate(datetime?: string | Date) {
  if (!datetime) return null;
  return format(datetime, "dd MMMM yyyy");
}

export function getLongDurationSince(datetime: string | Date) {
  const then = new Date(datetime);
  const interval = intervalToDuration({ start: then, end: new Date() });

  if (interval?.years) {
    const years = formatDuration(interval, { format: ["years", "months"] });
    return `${years} ago`;
  }

  if (interval?.months) {
    const months = formatDuration(interval, { format: ["months"] });
    return `${months} ago`;
  }

  const days = formatDuration(interval, { format: ["days"] });
  return `${days} ago`;
}

export function formatISO(date: string, template: string) {
  return format(parseISO(date), template);
}
