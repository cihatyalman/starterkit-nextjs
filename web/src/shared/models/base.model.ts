import { z } from "zod";
import { dataSchemas } from "./_schema";

export const RawBaseSchema = z.object({
  id: dataSchemas.string,
  createdAt: dataSchemas.datetime,
  updatedAt: dataSchemas.datetime,
});

export const BaseSchema = RawBaseSchema.transform((raw) => ({
  id: raw.id,
  createdAt: raw.createdAt ? toDateFromString(raw.createdAt) : null,
  updatedAt: raw.updatedAt ? toDateFromString(raw.updatedAt) : null,
}));
export type BaseModel = z.infer<typeof BaseSchema>;

/* #region Helpers */
export function mapBase(raw: z.infer<typeof RawBaseSchema>) {
  return {
    id: raw.id,
    createdAt: raw.createdAt ? toDateFromString(raw.createdAt) : null,
    updatedAt: raw.updatedAt ? toDateFromString(raw.updatedAt) : null,
  };
}
/* #endregion */

/* #region Date Helpers */
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
/* #endregion */
