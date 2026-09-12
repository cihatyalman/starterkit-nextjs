import { create } from "zustand";

/* #region Type */
const initialState = {
  data: 0,
  loading: undefined as boolean | undefined,
};
interface CounterActions<T> {
  setData: (value: T) => void;
  reset: () => void;
  setLoading?: (loading: boolean) => void;
}
type CounterStore<T> = typeof initialState & CounterActions<T>;
/* #endregion */

export const useCounterStore = create<CounterStore<number>>((set) => ({
  ...initialState,
  setData: (value) => set({ data: value }),
  reset: () => set(initialState),
  setLoading: (loading) => set({ loading: loading }),
}));
