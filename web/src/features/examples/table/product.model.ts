import { z } from "zod";
import { dataSchemas } from "@/shared/models/_schema";

const RawProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: dataSchemas.fixedNumber(2),
  description: z.string(),
  category: dataSchemas.record,
  images: z.array(z.string()).nullish().default([]),
});
export const ProductSchema = RawProductSchema.transform((raw) => ({
  id: raw.id,
  title: raw.title,
  price: raw.price,
  description: raw.description,
  category: raw.category?.name ?? "-",
  images: raw.images,
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
