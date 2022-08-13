import {
  format,
  differenceInMinutes,
  differenceInDays,
  differenceInSeconds,
  isToday,
  isYesterday,
} from 'date-fns';

export const formatDate = (date: string | Date) => {
  date = new Date(date);
  if (isToday(date)) return `Today at ${format(date, 'hh:mm a')}`;
  if (isYesterday(date)) return `Yesterday at ${format(date, 'hh:mm a')}`;
  return format(date, 'MM/dd/yyy');
};

export const getTime = (date: string) => format(new Date(date), 'h:mm a');

export function getDiffInDays(dateLeft: string, dateRight: string) {
  return differenceInDays(new Date(dateLeft), new Date(dateRight));
}

export function getDiffInMinutes(dateLeft: string, dateRight: string) {
  return differenceInMinutes(new Date(dateLeft), new Date(dateRight));
}

export function getDiffInSeconds(dateLeft: Date, dateRight: Date) {
  return differenceInSeconds(new Date(dateLeft), new Date(dateRight));
}

export function lessThan(prevDate: Date, newDate: Date, seconds: number) {
  const difference = newDate.getSeconds() - prevDate.getSeconds();
  return difference > seconds || newDate.getMinutes() !== prevDate.getMinutes();
}
