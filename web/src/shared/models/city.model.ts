import { z } from "zod";
import { mapBase, RawBaseSchema } from "@/shared/models/base.model";
import { dataSchemas } from "@/shared/models/_schema";

const RawCitySchema = RawBaseSchema.extend({
  title: dataSchemas.string,
});
export const CitySchema = RawCitySchema.transform((raw) => ({
  ...mapBase(raw),
  title: raw.title,
}));
export type CityModel = z.infer<typeof CitySchema>;

/* #region Helpers */
export function parseCity(data: unknown): CityModel {
  return CitySchema.parse(data);
}
export function parseCityList(data: unknown): CityModel[] {
  return z.array(CitySchema).parse(data);
}
/* #endregion */

/* #region Write */
export const CreateCitySchema = z.object({
  newTitle: dataSchemas.stringOptional,
});
export type CreateCityData = z.infer<typeof CreateCitySchema>;
/* #endregion */
