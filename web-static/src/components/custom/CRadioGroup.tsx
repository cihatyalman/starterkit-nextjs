"use client";

import { cn } from "@/lib/utils";
import { forwardRef, useImperativeHandle, useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

/* #region Core */
interface CRadioProps {
  name?: string;
  initialCheckedKey?: string;
  disabled?: boolean;
  itemList: KeyValue[];
  className?: string;
  itemClassName?: string;
  value?: string | null;
  onChange?: (key: string | null) => void;
  children?: (args: { item: KeyValue }) => React.ReactNode;
}

export const CRadioGroup = (props: CRadioProps) => {
  const isControlled = props.value !== undefined;
  const [internalCheckedKey, setInternalCheckedKey] = useState(
    props.initialCheckedKey ?? null
  );

  const checkedKey = isControlled ? props.value! : internalCheckedKey;

  const handleChange = (key: string) => {
    if (!isControlled) setInternalCheckedKey(key);
    props.onChange?.(key);
  };

  return (
    <RadioGroup
      name={props.name}
      value={checkedKey}
      onValueChange={handleChange}
      className={cn("flex gap-2", props.className)}
      disabled={props.disabled}
    >
      {props.itemList.map((item) => {
        return (
          <Label
            key={item.key}
            className={cn(
              "flex items-center text-sm gap-1 cursor-pointer",
              props.itemClassName
            )}
          >
            <RadioGroupItem
              data-name={props.name}
              value={item.key}
              className="cursor-pointer"
              disabled={props.disabled}
            />
            {props.children?.({ item: item })}
          </Label>
        );
      })}
    </RadioGroup>
  );
};

/* #endregion */

/* #region Wrapper(forwardRef) */

export interface CRadioHandle {
  set: (key: string) => void;
  clear: () => void;
}

export const CRadioGroupController = forwardRef<
  CRadioHandle,
  Omit<CRadioProps, "value">
>((props, ref) => {
  const [value, setValue] = useState(props.initialCheckedKey ?? null);

  useImperativeHandle(ref, () => ({
    set(key) {
      setValue(key);
      props.onChange?.(key);
    },
    clear() {
      setValue(null);
      props.onChange?.(null);
    },
  }));

  return (
    <CRadioGroup
      {...props}
      value={value}
      onChange={(key) => {
        setValue(key);
        props.onChange?.(key);
      }}
    />
  );
});
CRadioGroupController.displayName = "CRadioGroupController";

/* #endregion */

/* #region Helpers */
export function getRadioData(name: string): string | null {
  const checkList = document.querySelectorAll<HTMLButtonElement>(
    `[data-name=${name}]`
  );

  for (const item of checkList) {
    if (item.ariaChecked == "true") return item.value;
  }
  return null;
}
/* #endregion */
