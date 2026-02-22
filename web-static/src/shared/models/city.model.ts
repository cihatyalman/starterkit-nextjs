import { z } from "zod";
import { mapBase, RawBaseSchema } from "./base.model";

const RawCitySchema = RawBaseSchema.extend({
  Title: z.string(),
});

export const CitySchema = RawCitySchema.transform((raw) => ({
  ...mapBase(raw),
  title: raw.Title,
}));
export type City = z.infer<typeof CitySchema>;

/* #region Helpers */
export function parseCity(data: MyAny): City {
  return CitySchema.parse(data);
}

export function parseCityList(data: MyAny): City[] {
  return z.array(CitySchema).parse(data);
}
/* #endregion */

/* #region Write */
export const AddOrUpdateCitySchema = z.object({
  newTitle: z.string(),
});
export type AddOrUpdateCity = z.infer<typeof AddOrUpdateCitySchema>;
/* #endregion */
