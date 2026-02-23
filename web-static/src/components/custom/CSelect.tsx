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
interface CSelectProps {
  id?: string;
  name?: string;
  placeholder?: string;
  defaultValue?: string;
  items: KeyLabel[];
  value?: string;
  onChange?: (value: KeyLabel | undefined) => void;
  width?: string; // w-96
  maxHeight?: string; // max-h-96
  className?: string;
}

export const CSelect = ({
  placeholder = "Seç",
  maxHeight = "max-h-96",
  ...props
}: CSelectProps) => {
  const isControlled = props.value !== undefined;
  const [internalSelectedKey, setInternalSelectedKey] = useState(
    props.defaultValue ?? ""
  );

  const selectedKey = isControlled ? props.value! : internalSelectedKey;

  const findItem = useCallback(
    (key: string | undefined) => props.items.find((e) => e.key === key),
    [props.items]
  );

  return (
    <Select
      name={props.name}
      value={selectedKey}
      onValueChange={(val) => {
        if (!isControlled) setInternalSelectedKey(val ?? "");
        props.onChange?.(findItem(val));
      }}
    >
      <SelectTrigger
        id={props.id}
        aria-label="Select"
        className={cn(
          "bg-white data-placeholder:text-black!",
          props.width || "w-full",
          "hover:bg-accent hover:text-black!",
          props.className
        )}
      >
        <SelectValue placeholder={placeholder} />
        <input type="hidden" name={props.name} value={selectedKey ?? ""} />
      </SelectTrigger>
      <SelectContent className={`${maxHeight} overflow-y-auto`}>
        <SelectGroup>
          {props.items.map((item) => (
            <SelectItem
              key={item.key}
              value={item.key}
              className="data-[state=checked]:bg-(--color-primary)
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
  readonly value: KeyLabel | undefined;
  set: (value: string) => void;
  clear: () => void;
}

export const CSelectController = forwardRef<
  CSelectHandle,
  Omit<CSelectProps, "value">
>((props, ref) => {
  const [selectedKey, setSelectedKey] = useState(props.defaultValue ?? "");

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

  const findItem = useCallback(
    (key: string | undefined) => props.items.find((e) => e.key === key),
    [props.items]
  );

  return (
    <CSelect
      {...props}
      value={selectedKey}
      onChange={(e) => {
        setSelectedKey(e?.key ?? "");
        props.onChange?.(e);
      }}
    />
  );
});
CSelectController.displayName = "CSelectController";

/* #endregion */
