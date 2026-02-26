import { z } from "zod";
import { mapBase, RawBaseSchema } from "./base.model";

const RawCitySchema = RawBaseSchema.extend({
  title: z.string(),
});

export const CitySchema = RawCitySchema.transform((raw) => ({
  ...mapBase(raw),
  title: raw.title,
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
  newtitle: z.string(),
});
export type AddOrUpdateCity = z.infer<typeof AddOrUpdateCitySchema>;
/* #endregion */
