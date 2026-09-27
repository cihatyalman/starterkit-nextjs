import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  data: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: {
      prepare: (value?: number) => {
        return { payload: value ?? 1 };
      },
      reducer: (state, action: PayloadAction<number>) => {
        state.data += action.payload;
      },
    },
    decrement: {
      prepare: (value?: number) => {
        return { payload: value ?? 1 };
      },
      reducer: (state, action: PayloadAction<number>) => {
        state.data -= action.payload;
      },
    },
    reset: () => initialState,
  },
});

export const { increment, decrement, reset } = counterSlice.actions;
export default counterSlice.reducer;
