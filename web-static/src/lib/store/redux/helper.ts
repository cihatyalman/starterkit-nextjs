import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Updater<T> = (prev: T) => T;

interface SliceProps<T> {
  name: string;
  initialData?: T;
}

interface SliceStateProps<T> {
  data: T;
}

export function createSliceData<T>({ name, initialData }: SliceProps<T>) {
  const initialState: SliceStateProps<T> = {
    data: initialData as T,
  };

  const slice = createSlice({
    name,
    initialState,
    reducers: {
      set(state, action: PayloadAction<T>) {
        (state.data as T) = action.payload;
      },
      update(state, action: PayloadAction<Updater<T>>) {
        const updater = action.payload;
        (state.data as T) = updater(state.data as T);
      },
      updateUI(state) {
        state.data = structuredClone(state.data);
      },
    },
  });

  return slice;
}
