import { z } from "zod";
import { dataSchemes } from "./_schema";
import { toDateFromString } from "@/core/helpers/date";

export const RawBaseSchema = z.object({
  Id: z.string().optional(),
  CreatedDatetime: dataSchemes.datetime,
  UpdatedDatetime: dataSchemes.datetime,
});

export const BaseSchema = RawBaseSchema.transform((raw) => ({
  id: raw.Id,
  createdDatetime: raw.CreatedDatetime
    ? toDateFromString(raw.CreatedDatetime)
    : null,
  updatedDatetime: raw.UpdatedDatetime
    ? toDateFromString(raw.UpdatedDatetime)
    : null,
}));
export type BaseModel = z.infer<typeof BaseSchema>;

/* #region Helpers */
export function mapBase(raw: z.infer<typeof RawBaseSchema>) {
  return {
    id: raw.Id,
    createdDatetime: raw.CreatedDatetime
      ? toDateFromString(raw.CreatedDatetime)
      : null,
    updatedDatetime: raw.UpdatedDatetime
      ? toDateFromString(raw.UpdatedDatetime)
      : null,
  };
}
/* #endregion */
