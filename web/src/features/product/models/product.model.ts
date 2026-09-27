import { z } from "zod";
import { mapBase, RawBaseSchema } from "@/shared/models/base.model";
import { dataSchemas } from "@/shared/models/_schema";

const RawProductSchema = RawBaseSchema.extend({
  title: dataSchemas.string,
  description: dataSchemas.string,
  imageUrl: dataSchemas.stringOptional,
  price: dataSchemas.fixedNumber(2),
});
export const ProductSchema = RawProductSchema.transform((raw) => ({
  ...mapBase(raw),
  title: raw.title,
  description: raw.description,
  imageUrl: raw.imageUrl,
  price: raw.price,
}));
export type ProductModel = z.infer<typeof ProductSchema>;

/* #region Helpers */
export function parseProduct(data: unknown): ProductModel {
  return ProductSchema.parse(data);
}
export function parseProductList(data: unknown): ProductModel[] {
  return z.array(ProductSchema).parse(data);
}
/* #endregion */
