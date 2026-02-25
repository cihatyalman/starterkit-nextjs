import { create } from "zustand";

interface StoreProps<T> {
  data: T;
  setData: (value: T) => void;
}

export const scrollStore = create<StoreProps<number>>((set) => ({
  data: 0,
  setData: (value: number) => set({ data: value }),
}));
