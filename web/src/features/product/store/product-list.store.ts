import { create } from "zustand";
import { parseProductList, ProductModel } from "../models/product.model";
import { LIMIT, getProducts } from "../product.repo";

/* #region Type */
const initialState = {
  dataList: [] as ProductModel[],
  isLoading: undefined as boolean | undefined,
  isFinished: undefined as boolean | undefined,
};
interface ProductListActions<T> {
  set: (dataList: T[]) => void;
  moreFetch: () => Promise<void>;
  add: (rawData?: T) => Promise<boolean>;
  delete: (id: string) => Promise<boolean>;
  reset: () => void;
}
type ProductListStore<T> = typeof initialState & ProductListActions<T>;
/* #endregion */

export const useProductListStore = create<ProductListStore<ProductModel>>(
  (set, get) => ({
    ...initialState,
    set: (dataList) => set({ dataList }),
    moreFetch: async () => {
      const isFinished = get().isFinished;
      if (isFinished) return;
      const lastId = get().dataList.at(-1)?.id ?? undefined;

      set({ isLoading: true });
      try {
        const res = await getProducts({ lastId: lastId });
        if (res.hasError) return;
        const newData = parseProductList(res.data);
        const newDataLength = newData.length;

        if (newDataLength === 0) {
          set({ isFinished: true });
        } else if (newDataLength < LIMIT) {
          set((state) => ({
            isFinished: true,
            dataList: [...state.dataList, ...newData],
          }));
        } else if (!lastId) {
          set({ dataList: newData });
        } else {
          const newLastId = newData?.at(-1)?.id ?? null;
          set((state) => ({
            isFinished: newLastId === lastId,
            dataList: [...state.dataList, ...newData],
          }));
        }
      } catch (error) {
        console.error(`[C_err]: `, error);
      } finally {
        set({ isLoading: false });
      }
    },
    add: async (rawData) => {
      if (!rawData) return false;
      set((state) => ({
        dataList: [rawData, ...state.dataList],
      }));
      return true;
    },
    delete: async (id) => {
      set((state) => ({
        dataList: state.dataList.filter((item) => item.id !== id),
      }));
      return true;
    },
    reset: () => set(initialState),
  }),
);
