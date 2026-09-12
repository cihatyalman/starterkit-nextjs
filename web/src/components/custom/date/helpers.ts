import { DateRange } from "react-day-picker";
import { DatePickerType } from "./types";

export function toDate<T extends DatePickerType>(
  value?: string | MyAny,
): T | null {
  if (typeof value !== "string") return null;

  const trimmed = value.trim();

  if (trimmed.length === 10) {
    // "DD.MM.YYYY"
    const [day, month, year] = trimmed.split(".").map(Number);
    const date = new Date(year, month - 1, day);
    return isNaN(date.getTime()) ? null : (date as T);
  }

  if (trimmed.length === 23) {
    // "DD.MM.YYYY - DD.MM.YYYY"
    const dateList = trimmed.split("-").map((e) => e.trim());
    const dateRange = {} as DateRange;
    for (const d of dateList) {
      const [day, month, year] = d.split(".").map(Number);
      const date = new Date(year, month - 1, day);
      if (isNaN(date.getTime())) return null;
      if (dateRange.from == null) {
        dateRange.from = date;
      } else {
        dateRange.to = date;
      }
    }
    return dateRange as T;
  }

  return null;
}

export function toDateString(date: DatePickerType | null | undefined): string {
  if (!date) return "";

  if (isDateRange(date)) {
    return `${dateToString((date as DateRange).from)} - ${dateToString(
      (date as DateRange).to,
    )}`;
  } else if (Array.isArray(date) && date.every((d) => d instanceof Date)) {
    return (date as Date[]).map((e) => dateToString(e)).join(" - ");
  } else if (date instanceof Date) {
    return dateToString(date);
  }
  return "";
}

function isDateRange(date: MyAny): date is DateRange {
  return date && typeof date === "object" && "from" in date && "to" in date;
}

function dateToString(date: Date | undefined): string {
  return (
    date?.toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }) ?? ""
  );
}
