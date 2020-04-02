import { format, parse, isValid } from 'date-fns';
import { nl } from 'date-fns/locale';

export const formatDate = (date: Date, formatString = 'dd/MM/yyyy'): string => {
  if (!isValid(date)) return null;
  return format(date, formatString, { locale: nl });
};

export const formatTime = (time: string | Date): string => {
  if (!time) return null;
  return formatDate(new Date(time), 'HH:mm');
};

export const dateFromString = (dateString: string, formatString = 'dd/MM/yyyy'): Date => {
  if (!dateString) return null;
  const date = parse(dateString, formatString, new Date(), { locale: nl });
  if (!isValid(date)) return null;
  return date;
};

export const dateTimeFromString = (dateTimeString: string, formatString = 'dd/MM/yyyy HH:mm'): Date => {
  const date = parse(dateTimeString, formatString, new Date(), { locale: nl });
  if (!isValid(date)) return null;
  return date;
};

export const dateFromTime = (timeString: string): Date => {
  return dateFromString(timeString, 'HH:mm');
};

export const dateFromISOString = (isoString?: string): Date => {
  if (!isoString) return null;
  return new Date(isoString);
};

export const ISOStringFromDate = (date?: Date): string => {
  if (!isValid(date)) return null;
  return date.toISOString();
};

export const dateStringFromISOString = (timeString: string): string => {
  const date = dateFromISOString(timeString);
  return date.toDateString();
};

export const getCombinedDateTimeString = (date: string, time: string): string => {
  return `${formatDate(new Date(date))} ${formatTime(time)}`;
};

export const getDateAndCustomTimeString = (date: string, time: string): string => {
  return `${formatDate(new Date(date))} ${time}`;
};
