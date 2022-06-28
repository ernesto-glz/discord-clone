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

export const compareDates = (prevDate: string, newDate: string) => {
  const newDate1 = new Date(prevDate);
  const newDate2 = new Date(newDate);
  return (
    `${newDate1.getDay()} ${newDate1.getHours()} ${newDate1.getMinutes()}` ===
    `${newDate2.getDay()} ${newDate2.getHours()} ${newDate2.getMinutes()}`
  );
};
