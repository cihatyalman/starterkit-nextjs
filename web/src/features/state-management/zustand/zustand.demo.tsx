"use client";

import { CButton } from "@/components/custom/CButton";
import { useCounterStore } from "./zustand.store";
import { useShallow } from "zustand/react/shallow";

export const DemoZustand = () => {
  const { data, setData, reset } = useCounterStore(
    useShallow((s) => ({ data: s.data, setData: s.setData, reset: s.reset })),
  );

  const changeCount = (value: number) => {
    setData(data + value);
  };

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <CButton className="w-10 text-xl" onClick={() => changeCount(-1)}>
        -
      </CButton>
      <p className="font-bold text-lg text-center min-w-8">{data}</p>
      <CButton className="w-10 text-xl" onClick={() => changeCount(+1)}>
        +
      </CButton>
      <CButton onClick={() => reset()}>Sıfırla</CButton>
    </div>
  );
};
