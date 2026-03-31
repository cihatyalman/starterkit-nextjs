import { z } from "zod";
import { dataSchemes } from "./_schema";
import { toDateFromString } from "@/core/helpers/date";

export const RawBaseSchema = z.object({
  id: z.string().optional(),
  createdDatetime: dataSchemes.datetime,
  updatedDatetime: dataSchemes.datetime,
});

export const BaseSchema = RawBaseSchema.transform((raw) => ({
  id: raw.id,
  createdDatetime: raw.createdDatetime
    ? toDateFromString(raw.createdDatetime)
    : null,
  updatedDatetime: raw.updatedDatetime
    ? toDateFromString(raw.updatedDatetime)
    : null,
}));
export type BaseModel = z.infer<typeof BaseSchema>;

/* #region Helpers */
export function mapBase(raw: z.infer<typeof RawBaseSchema>) {
  return {
    id: raw.id,
    createdDatetime: raw.createdDatetime
      ? toDateFromString(raw.createdDatetime)
      : null,
    updatedDatetime: raw.updatedDatetime
      ? toDateFromString(raw.updatedDatetime)
      : null,
  };
}
/* #endregion */
