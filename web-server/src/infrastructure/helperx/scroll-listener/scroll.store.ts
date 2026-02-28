import { create } from "zustand";

export const scrollStore = create<StoreProps<number>>((set) => ({
  data: 0,
  setData: (value: number) => set({ data: value }),
}));
