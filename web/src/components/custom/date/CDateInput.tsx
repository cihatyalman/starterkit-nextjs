"use client";

import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { CInput } from "../input/CInput";
import { CDatePicker } from "./CDatePicker";
import { toDate, toDateString } from "./helpers";
import { DateRange } from "react-day-picker";

/* #region Core */
interface CDateInputProps {
  id?: string;
  name?: string;
  placeholder?: string;
  width?: string; // w-96
  minDate?: Date;
  maxDate?: Date;
  className?: string;
  initialValue?: Date;
  value?: Date | null;
  onChange?: (value?: Date) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const CDateInput = ({
  placeholder = "Tarih Seç",
  ...props
}: CDateInputProps) => {
  const isControlled = props.value !== undefined;
  const [internalDate, setInternalDate] = useState(props.initialValue ?? null);
  const [internalValue, setInternalValue] = useState(
    toDateString(props.initialValue),
  );
  const date = isControlled ? (props.value as Date | null) : internalDate;
  const [openPopup, setOpenPopup] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setInternalValue(toDateString(date));
  }, [date]);

  return (
    <CInput
      id={props.id}
      name={props.name}
      placeholder={placeholder}
      maxLength={10}
      className={`overflow-x-auto pr-10 ${props.width} ${props.className}`}
      value={internalValue}
      onChange={(e) => {
        const v = e.target.value;
        setInternalValue(v);
        if (v === "") {
          if (!isControlled) setInternalDate(null);
          props.onChange?.(undefined);
        } else {
          const newDate = toDate<Date>(e.target.value);
          if (newDate) {
            if (!isControlled) setInternalDate(newDate);
            props.onChange?.(newDate);
          }
        }
      }}
    >
      <CDatePicker
        minDate={props.minDate}
        maxDate={props.maxDate}
        open={openPopup}
        onOpenChange={(open) => {
          if (!open) setOpenPopup(open);
        }}
        value={date}
        onChange={(e) => {
          if (!isControlled) setInternalDate(e ?? null);
          setInternalValue(toDateString(e));
          props.onChange?.(e);
        }}
      />
    </CInput>
  );
};
/* #endregion */

/* #region Wrapper(forwardRef) */
export interface CDateInputHandle {
  readonly date: Date | undefined;
  setDate: (value?: Date) => void;
  readonly value: string;
  setValue: (value?: string) => void;
  clear: () => void;
  clearInput: () => void;
  open: () => void;
}

export const CDateInputController = forwardRef<
  CDateInputHandle,
  Omit<CDateInputProps, "value">
>((props, ref) => {
  const [open, setOpen] = useState(props.open ?? false);
  const [value, setValue] = useState(toDateString(props.initialValue));
  const [date, setDate] = useState(props.initialValue ?? null);

  useImperativeHandle(ref, () => ({
    get date() {
      return date ?? undefined;
    },
    setDate: (newValue?: Date | DateRange | Date[]) => {
      setDate(newValue as Date);
    },
    get value() {
      return value ?? "";
    },
    setValue: (newValue?: string) => {
      setValue(newValue ?? "");
    },
    clear: () => {
      setDate(null);
      props.onChange?.(undefined);
    },
    clearInput: () => {
      setValue("");
    },
    open: () => setOpen(true),
  }));

  return (
    <CDateInput
      {...props}
      open={props.open ?? open}
      onOpenChange={(o) => {
        setOpen(o);
        props.onOpenChange?.(o);
      }}
      value={date}
      onChange={(e) => {
        setDate(e ?? null);
        props.onChange?.(e);
      }}
    />
  );
});
CDateInputController.displayName = "CDateInputController";
/* #endregion */
