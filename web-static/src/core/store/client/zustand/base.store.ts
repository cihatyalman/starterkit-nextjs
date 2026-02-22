import { create, StoreApi } from "zustand";

// npm i zustand
export interface BaseStore<T> {
  data?: T;
  isLoading: boolean;
  setData: (newData?: T) => void;
  activateLoading: () => void;
  deactivateLoading: () => void;
}

export function createBaseStore<T>(initialValue?: T) {
  const listen = create<BaseStore<T>>((set) => ({
    data: initialValue,
    isLoading: false,
    setData: (newData) => set({ data: newData }),
    activateLoading: () => set({ isLoading: true }),
    deactivateLoading: () => set({ isLoading: false }),
  }));

  // Hem hook hem store API'yi döndürüyoruz
  return {
    listen,
    store: listen as StoreApi<BaseStore<T>>,
  };
}
