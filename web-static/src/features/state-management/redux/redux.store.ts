import { createSliceData } from "@/lib/store/redux/helper";

export const counterSlice = createSliceData({
  name: "counter",
  initialData: 0,
});
