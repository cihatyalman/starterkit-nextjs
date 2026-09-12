"use client";

import { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";

/* #region Core */
export type SelectItemType = { value: string; label: string };
interface CSelectProps {
  id?: string;
  name?: string;
  placeholder?: string;
  defaultValue?: string;
  items: SelectItemType[];
  value?: string;
  onChange?: (value: SelectItemType | undefined) => void;
  width?: string; // w-96
  maxHeight?: string; // max-h-96
  className?: string;
}

export const CSelect = ({
  placeholder = "Seç",
  maxHeight = "max-h-96",
  ...props
}: CSelectProps) => {
  const findItem = useCallback(
    (key: string | null | undefined) =>
      props.items.find((item) => item.value === key),
    [props.items],
  );

  return (
    <Select
      name={props.name}
      items={props.items}
      value={props.defaultValue ? undefined : props.value}
      defaultValue={props.defaultValue}
      onValueChange={(value) => {
        if (value) props.onChange?.(findItem(value));
      }}
    >
      <SelectTrigger
        id={props.id}
        aria-label="Select"
        className={cn(
          "bg-white data-placeholder:text-foreground! min-h-10",
          props.width || "w-full",
          "hover:bg-accent hover:text-black!",
          props.className,
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className={`${maxHeight} overflow-y-auto`}>
        <SelectGroup>
          {props.items.map((item) => (
            <SelectItem
              key={item.value}
              value={item.value}
              className="data-[state=checked]:bg-primary
              data-[state=checked]:text-white
              data-[state=checked]:font-bold"
            >
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
/* #endregion */

/* #region Wrapper(forwardRef) */

export interface CSelectHandle {
  readonly value: SelectItemType | undefined;
  set: (value: string) => void;
  clear: () => void;
}

export const CSelectController = forwardRef<
  CSelectHandle,
  Omit<CSelectProps, "value">
>((props, ref) => {
  const [selectedKey, setSelectedKey] = useState(props.defaultValue ?? "");

  const findItem = useCallback(
    (key: string | null | undefined) =>
      props.items.find((item) => item.value === key),
    [props.items],
  );

  useImperativeHandle(ref, () => ({
    get value() {
      return findItem(selectedKey);
    },
    set: (value: string) => setSelectedKey(value),
    clear: () => {
      setSelectedKey("");
      props.onChange?.(undefined);
    },
  }));

  return (
    <CSelect
      {...props}
      value={selectedKey}
      onChange={(v) => {
        if (v) {
          setSelectedKey(v.value);
          props.onChange?.(v);
        }
      }}
    />
  );
});
CSelectController.displayName = "CSelectController";

/* #endregion */

/* #region Helpers */
export const toSelectItems = (itemList: string[]) => {
  return itemList.map((item, index) => ({
    value: index.toString(),
    label: item,
  }));
};
/* #endregion */
