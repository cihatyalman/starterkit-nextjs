import { apiService } from "@/core/helpers/api";
import { parseProductList } from "./product.model";

const mainPath = "/products";

async function getList() {
  const r = await apiService.get(mainPath);
  if (!r) return [];
  return parseProductList(r);
}

export const apiProduct = { getList: getList };
