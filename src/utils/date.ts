import { formatDistanceToNowStrict } from "date-fns";

export function getYearsSince(epoch: number) {
  const then = new Date(epoch);
  return formatDistanceToNowStrict(then, { unit: "month" });
}
