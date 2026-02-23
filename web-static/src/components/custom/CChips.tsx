"use client";

import { cn } from "@/lib/utils";
import { forwardRef, useImperativeHandle, useState } from "react";

/* #region Core */
interface CChipsProps {
  name: string;
  initialKeyList?: string[];
  itemList: KeyValue[];
  className?: string;
  itemClassName?: string;
  value?: string[];
  onChange?: (keyList: string[]) => void;
  children?: (args: { item: KeyValue; isSelected: boolean }) => React.ReactNode;
}

export const CChips = (props: CChipsProps) => {
  const isControlled = props.value !== undefined;
  const [internalKeyList, setInternalKeyList] = useState(
    props.initialKeyList ?? []
  );
  const keyList = isControlled ? props.value! : internalKeyList;

  const handleChange = (key: string) => {
    const exists = keyList.includes(key);

    const newList = exists
      ? keyList.filter((k) => k !== key)
      : [...keyList, key];

    if (!isControlled) setInternalKeyList(keyList);

    props.onChange?.(newList);
  };

  return (
    <div className={cn("flex gap-1", props.className)}>
      {props.itemList.map((item) => {
        const selected = keyList.includes(item.key);

        return (
          <button
            type="button"
            key={item.key}
            data-name={props.name}
            data-value={item.key}
            data-checked={selected}
            onClick={() => handleChange(item.key)}
            className={cn("text-sm cursor-pointer", props.itemClassName)}
          >
            {props.children?.({ item, isSelected: selected })}
          </button>
        );
      })}
    </div>
  );
};
/* #endregion */

/* #region Wrapper(forwardRef) */
export interface CChipsHandle {
  set: (keyList: string[]) => void;
  clear: () => void;
}

export const CChipsController = forwardRef<
  CChipsHandle,
  Omit<CChipsProps, "value">
>((props, ref) => {
  const [value, setValue] = useState<string[]>(props.initialKeyList ?? []);

  useImperativeHandle(ref, () => ({
    set(keyList) {
      setValue(keyList);
      props.onChange?.(keyList);
    },
    clear() {
      setValue([]);
      props.onChange?.([]);
    },
  }));

  return (
    <CChips
      {...props}
      value={value}
      onChange={(keys) => {
        setValue(keys);
        props.onChange?.(keys);
      }}
    />
  );
});
CChipsController.displayName = "CChipsController";
/* #endregion */

/* #region Helpers */
export function getChipsData(
  name: string,
  onlyChecked: boolean = false
): Record<string, boolean> {
  const chipsNodeList = document.querySelectorAll<HTMLDivElement>(
    onlyChecked
      ? `button[data-name="${name}"][data-checked="true"]`
      : `button[data-name="${name}"]`
  );

  const resultList: Record<string, boolean> = {};
  for (const item of chipsNodeList) {
    if (item.dataset.value)
      resultList[item.dataset.value] = item.dataset.checked === "true";
  }

  return resultList;
}
/* #endregion */
