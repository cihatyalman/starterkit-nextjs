// npm i date-fns
import { tr } from "date-fns/locale/tr";
import { add, Duration, format } from "date-fns";

const DateList = {
  date1: "yyyy-MM-dd",
  date2: "dd.MM.yyyy",
  date3: "d MMMM yyyy HH:mm",
};
type DateFormat = keyof typeof DateList;

export function getFormatDate(
  date: Nullable<Date>,
  formatKey: DateFormat,
  forceDate: boolean = false,
): string | null {
  if (forceDate && !date) date = new Date();
  if (!(date instanceof Date) || isNaN(date.getTime())) return null;
  return format(date, DateList[formatKey], { locale: tr });
}

export function difDate(
  date: Date,
  type: "s" | "m" | "h" | "d" = "s",
  refDate: Date = new Date(),
) {
  let s = 1000;

  switch (type) {
    case "m":
      s = s * 60;
      break;
    case "h":
      s = s * 60 * 60;
      break;
    case "d":
      s = s * 60 * 60 * 24;
      break;
  }

  const dif = date.getTime() - refDate.getTime();
  return dif / s;
}

export function getOnlyDate(date?: Date): Date {
  if (!(date instanceof Date) || isNaN(date.getTime())) date = new Date();
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function addDate(date: Nullable<Date>, duration: Duration): Date {
  if (!(date instanceof Date) || isNaN(date.getTime())) date = new Date();
  return add(date, duration);
}

export function toStringFromDate(
  date?: Nullable<Date>,
  forceDate?: boolean,
): string | null {
  if (forceDate && !date) date = new Date();
  if (!(date instanceof Date) || isNaN(date.getTime())) return null;
  return date.toISOString(); // UTC formatında: "2025-05-21T06:33:10.000Z"
}

export function toDateFromString(
  value?: Nullable<string>,
  forceDate?: boolean,
): Date | null {
  if (forceDate && !value) return new Date();

  if (typeof value !== "string") return null;

  const trimmed = value.trim();

  if (trimmed.length === 10) {
    // "YYYY-MM-DD"
    const [year, month, day] = trimmed.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  if (trimmed.length >= 20) {
    // ISO-8601 format: "2025-05-21T06:33:10Z"
    const date = new Date(trimmed);
    if (isNaN(date.getTime())) return null;
    return date;
  }
  return null;
}

export function getNowString() {
  const date = new Date();
  return date.toISOString(); // UTC formatında: "2025-05-21T06:33:10.000Z"
}

export function getDateNowString() {
  const date = new Date();
  const newDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
  );
  return newDate.toISOString(); // UTC formatında: "2025-05-21T06:33:10.000Z"
}
