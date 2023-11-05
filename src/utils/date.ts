import { formatDistanceToNowStrict, format, parseISO } from 'date-fns';

export function getMonthsSince(epoch: number) {
  const then = new Date(epoch);
  return formatDistanceToNowStrict(then, { unit: 'month' });
}

export function formatISO(date: string, template: string) {
  return format(parseISO(date), template);
}
