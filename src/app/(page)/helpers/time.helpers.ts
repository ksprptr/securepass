import { TIMESTAMP_UNITS, TimestampUnit } from '../enums/tools.enums';

const RELATIVE_UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ['year', 31536000],
  ['month', 2592000],
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
  ['second', 1],
];

const isValidDate = (date: Date): boolean => !Number.isNaN(date.getTime());

/**
 * Function to format a date as `YYYY-MM-DD HH:mm:ss` in the given time zone
 **/
export const formatDateTime = (date: Date, timeZone?: string): string => {
  const parts = new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    // `hour12: false` still renders midnight as 24 in some engines.
    hourCycle: 'h23',
    timeZone,
  }).formatToParts(date);

  const value = Object.fromEntries(parts.map((part) => [part.type, part.value]));

  return `${value.year}-${value.month}-${value.day} ${value.hour}:${value.minute}:${value.second}`;
};

/**
 * Function to name the browser's time zone (`Europe/Prague`)
 **/
export const getLocalTimeZone = (): string => Intl.DateTimeFormat().resolvedOptions().timeZone;

/**
 * Function to describe how far a date is from now ("in 3 days", "2 hours ago")
 **/
export const formatRelative = (date: Date, now: number = Date.now()): string => {
  const seconds = Math.round((date.getTime() - now) / 1000);
  const formatter = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  for (const [unit, size] of RELATIVE_UNITS) {
    if (Math.abs(seconds) >= size) {
      return formatter.format(Math.trunc(seconds / size), unit);
    }
  }

  return formatter.format(0, 'second');
};

/**
 * Function to turn a raw timestamp input into a date
 **/
export const parseTimestamp = (value: string, unit: TimestampUnit): Date | null => {
  const trimmed = value.trim();
  if (!trimmed || !/^-?\d+$/.test(trimmed)) return null;

  const numeric = Number(trimmed);
  if (!Number.isFinite(numeric)) return null;

  const date = new Date(unit === TIMESTAMP_UNITS.SECONDS ? numeric * 1000 : numeric);

  return isValidDate(date) ? date : null;
};

/**
 * Function to render a date for a `datetime-local` input, which expects local wall-clock time
 **/
export const toDateTimeLocal = (date: Date): string => {
  const pad = (part: number) => String(part).padStart(2, '0');

  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
    `T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
  );
};

/**
 * Function to read a `datetime-local` value, which the browser expresses in local time
 **/
export const fromDateTimeLocal = (value: string): Date | null => {
  if (!value) return null;

  const date = new Date(value);

  return isValidDate(date) ? date : null;
};
