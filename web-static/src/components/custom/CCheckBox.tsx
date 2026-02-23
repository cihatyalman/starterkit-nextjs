"use client";

import { forwardRef, useImperativeHandle, useState } from "react";
import { cn } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

/* #region Core */
interface CCheckBoxGroupProps {
  name?: string;
  initialKeyList?: string[];
  itemList: KeyValue[];
  className?: string;
  itemClassName?: string;
  value?: string[];
  onChange?: (keyList: string[]) => void;
  children?: (args: { item: KeyValue; isSelected: boolean }) => React.ReactNode;
}

export const CCheckBoxGroup = (props: CCheckBoxGroupProps) => {
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
    <div className={cn("flex gap-2", props.className)}>
      {props.itemList.map((item) => {
        const selected = keyList.includes(item.key);

        return (
          <Label
            key={item.key}
            className={cn(
              "flex items-center gap-1 cursor-pointer px-2 py-1",
              props.itemClassName
            )}
          >
            <Checkbox
              name={props.name}
              data-name={props.name}
              value={item.key}
              checked={selected}
              onCheckedChange={() => handleChange(item.key)}
            />
            {props.children?.({ item, isSelected: selected })}
          </Label>
        );
      })}
    </div>
  );
};
/* #endregion */

/* #region Wrapper(forwardRef) */

export interface CCheckBoxGroupHandle {
  set: (keyList: string[]) => void;
  clear: () => void;
}

export const CCheckBoxGroupController = forwardRef<
  CCheckBoxGroupHandle,
  Omit<CCheckBoxGroupProps, "value">
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
    <CCheckBoxGroup
      {...props}
      value={value}
      onChange={(keys) => {
        setValue(keys);
        props.onChange?.(keys);
      }}
    />
  );
});
CCheckBoxGroupController.displayName = "CCheckBoxGroupController";

/* #endregion */

/* #region Helpers */
export function getCheckBoxData(
  name: string,
  onlyChecked: boolean = false
): Record<string, boolean> {
  const checkList = document.querySelectorAll<HTMLButtonElement>(
    onlyChecked
      ? `button[data-name="${name}"][data-state="checked"]`
      : `button[data-name="${name}"]`
  );

  const values: Record<string, boolean> = {};
  for (const item of checkList) {
    values[item.value] = item.ariaChecked === "true";
  }

  return values;
}
/* #endregion */
