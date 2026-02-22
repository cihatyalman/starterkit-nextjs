"use client";

import { CButton } from "@/components/custom/CButton";
import { counterStore } from "./zustand.store";

export const DemoZustand = () => {
  const counter = counterStore();

  const changeCount = (value: number) => {
    if (value === 0) {
      counter.setData(0);
    } else {
      counter.setData(counter.data + value);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <CButton className="w-10 text-xl" onClick={() => changeCount(-1)}>
        -
      </CButton>
      <p className="font-bold text-lg text-center min-w-8">{counter.data}</p>
      <CButton className="w-10 text-xl" onClick={() => changeCount(+1)}>
        +
      </CButton>
      <CButton onClick={() => changeCount(0)}>Sıfırla</CButton>
    </div>
  );
};
