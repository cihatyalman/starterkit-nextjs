import { create } from "zustand";

export const counterStore = create<StoreProps<number>>((set) => ({
  data: 0,
  setData: (value: number) => set({ data: value }),
}));
