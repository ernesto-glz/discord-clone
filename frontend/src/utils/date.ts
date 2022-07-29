export const toTimestamp = (isoStr: string) => new Date(isoStr).getTime();

export const isYesterday = (date: Date) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  if (yesterday.toDateString() === date.toDateString()) {
    return true;
  }

  return false;
};

export const isToday = (date: Date) => {
  const today = new Date();

  if (today.toDateString() === date.toDateString()) {
    return true;
  }

  return false;
};

export const formatAMPM = (date: Date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours %= 12;
  hours = hours || 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? 0 + minutes : minutes;
  const strTime = `${hours}:${minutes < 10 ? `0${minutes}` : minutes} ${ampm}`;
  return strTime;
};

export const dateFormatted = (date: string) => {
  const actual = new Date(date);

  if (isToday(actual)) {
    return `Today at ${formatAMPM(actual)}`;
  }

  if (isYesterday(actual)) {
    return `Yesterday at ${formatAMPM(actual)}`;
  }

  return actual.toDateString();
};

export const getTime = (date: string) => {
  const actual = new Date(date);
  return formatAMPM(actual);
};

export const getDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return `
    ${date.toLocaleDateString('en-us', { month: 'long', day: 'numeric' })}, ${date.getFullYear()}
  `;
};

export const isExtraForTime = (prevDate: string, newDate: string) => {
  const newDate1 = new Date(prevDate);
  const newDate2 = new Date(newDate);
  
  const difference = newDate2.getMinutes() - newDate1.getMinutes()
  const isSameMonth = newDate1.getMonth() === newDate2.getMonth();
  const isSameDay = newDate1.getDay() === newDate2.getDay();
  const isSameHour = newDate1.getHours() === newDate2.getHours();
  const inTimeRange = difference >= 0 && difference <= 5;
  
  return isSameMonth && isSameDay && isSameHour && inTimeRange;
};

export function lessThan(prevDate: Date, newDate: Date, seconds: number) {
  const difference = newDate.getSeconds() - prevDate.getSeconds();
  return difference > seconds || newDate.getMinutes() !== prevDate.getMinutes();
}

export function isNewDay(prevDate: Date, newDate: Date) {
  if (prevDate.getMonth() !== newDate.getMonth()) return true;
  return prevDate.getDay() !== newDate.getDay();
}