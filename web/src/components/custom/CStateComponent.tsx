"use client";

import { useMemo, useState } from "react";

interface CStateComponentProps<TState, TResult> {
  initialValue?: TState;
  initFunc?: (state: CustomState<TState>) => TResult;
  children: (args: {
    state: CustomState<TState>;
    result: TResult | undefined;
  }) => React.ReactNode;
}

export const CStateComponent = <TState, TResult = TState>(
  props: CStateComponentProps<TState, TResult>
) => {
  const [value, setValue] = useState(props.initialValue);
  const state = { value, set: setValue };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const result = useMemo(() => props.initFunc?.(state), []);

  return props.children({ state, result });
};

interface CMultiStateComponentProps<TResult> {
  stateCount?: number;
  initialValueList?: MyAny[];
  initFunc?: (
    getValue: (index: number) => MyAny,
    updateValue: (index: number, newValue: MyAny) => void
  ) => TResult;
  children: (args: {
    getValue: (index: number) => MyAny;
    updateValue: (index: number, newValue: MyAny) => void;
    result: TResult | undefined;
  }) => React.ReactNode;
}

export const CMultiStateComponent = <TResult,>({
  stateCount = 2,
  initialValueList = [],
  ...props
}: CMultiStateComponentProps<TResult>) => {
  const [stateList, setStateList] = useState(
    Array.from({ length: stateCount }, (v, i) => initialValueList[i])
  );

  const getValue = (index: number) => stateList[index];

  const updateValue = (index: number, newValue: MyAny) => {
    setStateList((prev) => {
      const copy = [...prev];
      copy[index] = newValue;
      return copy;
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const result = useMemo(() => props.initFunc?.(getValue, updateValue), []);

  return props.children({ getValue, updateValue, result });
};
