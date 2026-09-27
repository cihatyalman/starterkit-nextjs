import { parseResponse } from "@/shared/models";
import { getProductsFromApi, getProductFromApi } from "./mock.api";
import { delay } from "@/core/helpers";

export const LIMIT = 8;

export const getProducts = async (props: { lastId?: string } = {}) => {
  await delay(1000);
  const r = await getProductsFromApi({ limit: LIMIT, after: props?.lastId });
  const res = parseResponse(r);
  return res;
};

export const getProduct = async (props: { productId: string }) => {
  await delay(1000);
  const r = await getProductFromApi({ productId: props.productId });
  const res = parseResponse(r);
  return res;
};
