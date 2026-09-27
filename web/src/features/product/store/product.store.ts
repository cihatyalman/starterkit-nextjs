import { create } from "zustand";
import { ProductModel } from "../models/product.model";

/* #region Type */
const initialState = {
  data: null as ProductModel | null,
  isLoading: undefined as boolean | undefined,
};
interface ProductActions<T> {
  set: (value: T) => void;
  reset: () => void;
}
type ProductStore<T> = typeof initialState & ProductActions<T>;
/* #endregion */

export const useProductStore = create<ProductStore<ProductModel>>((set) => ({
  ...initialState,
  set: (value) => set({ data: value }),
  reset: () => set(initialState),
}));
