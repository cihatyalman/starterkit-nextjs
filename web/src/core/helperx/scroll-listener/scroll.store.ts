import { create } from "zustand";

type ScrollStore<T> = {
  data: T;
  setData: (value: T) => void;
  reset: () => void;
};

export const useScrollStore = create<ScrollStore<number>>((set) => ({
  data: 0,
  setData: (value) => set({ data: value }),
  reset: () => set({ data: 0 }),
}));
