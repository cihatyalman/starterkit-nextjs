import { z } from "zod";
import { dataSchemes } from "@/shared/models/_schema";

const RawProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: dataSchemes.fixedNumber(2),
  description: z.string(),
  category: dataSchemes.record(),
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
export type Product = z.infer<typeof ProductSchema>;

/* #region Helpers */
export function parseProduct(data: MyAny): Product {
  return ProductSchema.parse(data);
}

export function parseProductList(data: MyAny): Product[] {
  return z.array(ProductSchema).parse(data);
}
/* #endregion */
