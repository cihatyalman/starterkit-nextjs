import { create } from "zustand";
import { ForgotModel } from "../models/forgot.model";

/* #region Type */
const initialState = {
  data: {} as ForgotModel,
  loading: undefined as boolean | undefined,
};
interface ForgotActions<T> {
  setData: (value: T) => void;
  updateData: (updater: (prev: T) => T) => void;
  reset: () => void;
  setLoading?: (isLoading: boolean) => void;
}
type ForgotStore<T> = typeof initialState & ForgotActions<T>;
/* #endregion */

export const useForgotStore = create<ForgotStore<ForgotModel>>((set) => ({
  ...initialState,
  setData: (value) => set({ data: value }),
  updateData: (updater) => set((prev) => ({ data: updater(prev.data) })),
  reset: () => set(initialState),
  setLoading: (isLoading) => set({ loading: isLoading }),
}));
