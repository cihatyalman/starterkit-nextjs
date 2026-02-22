import { create } from "zustand";

interface ScrollProps {
  data: number;
  setData: (value: number) => void;
}

export const scrollStore = create<ScrollProps>((set) => ({
  data: 0,
  setData: (value: number) => set({ data: value }),
}));
