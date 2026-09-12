"use client";

import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { tr } from "date-fns/locale";
import { MyCalendarIcon } from "./helperx";
import { CDatePickerBaseHandle, CDatePickerProps } from "./types";

/* #region Core */
export const CDatePicker = (props: CDatePickerProps<Date>) => {
  const isControlled = props.value !== undefined;

  const [open, setOpen] = useState(props.open ?? false);
  const [month, setMonth] = useState(props.initialValue ?? null);
  const [internalDate, setInternalDate] = useState(props.initialValue ?? null);

  const date = isControlled ? (props.value as Date | null) : internalDate;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMonth(date);
  }, [date]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(props.open ?? false);
  }, [props.open]);

  const disabledConfig =
    props.minDate && props.maxDate
      ? { before: props.minDate, after: props.maxDate }
      : props.minDate
        ? { before: props.minDate }
        : props.maxDate
          ? { after: props.maxDate }
          : undefined;

  return (
    <Popover
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        props.onOpenChange?.(o);
      }}
    >
      <PopoverTrigger>{props.children || <MyCalendarIcon />}</PopoverTrigger>
      <PopoverContent
        className="w-auto overflow-hidden p-0"
        align="end"
        alignOffset={-8}
        sideOffset={10}
      >
        <Calendar
          mode="single"
          locale={tr}
          captionLayout="dropdown"
          disabled={disabledConfig}
          startMonth={props.minDate}
          endMonth={props.maxDate}
          selected={date ?? undefined}
          month={month ?? undefined}
          onMonthChange={setMonth}
          onSelect={(date) => {
            if (!isControlled) setInternalDate(date ?? null);
            props.onChange?.(date);
            setOpen(false);
            props.onOpenChange?.(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
};
/* #endregion */

/* #region Wrapper(forwardRef) */
export const CDatePickerController = forwardRef<
  CDatePickerBaseHandle<Date>,
  Omit<CDatePickerProps<Date>, "value">
>((props, ref) => {
  const [open, setOpen] = useState(props.open ?? false);
  const [date, setDate] = useState(props.initialValue ?? null);

  useImperativeHandle(ref, () => ({
    get value() {
      return date ?? undefined;
    },
    setValue: (newValue) => {
      setDate(newValue as Date);
    },
    open: () => setOpen(true),
    clear: () => {
      setDate(null);
      props.onChange?.(undefined);
    },
  }));

  return (
    <CDatePicker
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
CDatePickerController.displayName = "CDatePickerController";
/* #endregion */
