"use client";

import { useDispatch, useSelector } from "react-redux";
import { counterSlice } from "../redux/redux.store";
import { RootState } from "@/lib/redux/store";
import { CButton } from "@/components/custom/CButton";

export const DemoRedux = () => {
  const dispatch = useDispatch();
  const count = useSelector((state: RootState) => state.counter.data);

  const changeCount = (value: number) => {
    if (value === 0) {
      dispatch(counterSlice.actions.set(0));
    } else {
      dispatch(counterSlice.actions.update((prev) => prev + value));
    }
  };

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <CButton className="w-10 text-xl" onClick={() => changeCount(-1)}>
        -
      </CButton>
      <p className="font-bold text-lg text-center min-w-8">{count}</p>
      <CButton className="w-10 text-xl" onClick={() => changeCount(+1)}>
        +
      </CButton>
      <CButton onClick={() => changeCount(0)}>Sıfırla</CButton>
    </div>
  );
};
