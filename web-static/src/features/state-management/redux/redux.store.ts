import { createSliceData } from "@/lib/redux/helper";

export const counterSlice = createSliceData({
  name: "counter",
  initialData: 0,
});
