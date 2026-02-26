import { z } from "zod";
import { dataSchemes } from "@/shared/models/_schema";

const RawProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: dataSchemes.fixedNumber(2),
  description: z.string(),
  category: z.string(),
  image: z.string(),
});

export const ProductSchema = RawProductSchema.transform((raw) => ({
  id: raw.id,
  title: raw.title,
  price: raw.price,
  description: raw.description,
  category: raw.category,
  image: raw.image,
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

/* #region Write */
export const AddOrUpdateProductSchema = z.object({
  newFullname: z.string(),
});
export type AddOrUpdateProduct = z.infer<typeof AddOrUpdateProductSchema>;
/* #endregion */
