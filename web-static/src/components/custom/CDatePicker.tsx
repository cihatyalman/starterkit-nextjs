"use client";

import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CButton } from "./CButton";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { DateRange } from "react-day-picker";
import { CInput } from "./CInput";

export type CDatePickerHandle = CDatePickerBaseHandle<Date>;
export type CDateRangePickerHandle = CDatePickerBaseHandle<DateRange>;
export type CMultiDatePickerHandle = CDatePickerBaseHandle<Date[]>;

interface CDatePickerBaseHandle<T> {
  readonly value: T | undefined;
  setValue: (value?: T) => void;
  open: () => void;
  clear: () => void;
}

interface CDatePickerProps<T> {
  initialValue?: T;
  value?: T | null;
  onChange?: (value?: T) => void;
  minDate?: Date;
  maxDate?: Date;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

/* #region InputDatePicker */
interface CInputDatePickerProps {
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

export const CInputDatePicker = ({
  placeholder = "Tarih Seç",
  ...props
}: CInputDatePickerProps) => {
  const isControlled = props.value !== undefined;
  const [internalDate, setInternalDate] = useState(props.initialValue ?? null);
  const [internalValue, setInternalValue] = useState(
    toDateString(props.initialValue)
  );

  const date = isControlled ? (props.value as Date | null) : internalDate;

  useEffect(() => {
    setInternalValue(toDateString(date));
  }, [date]);

  return (
    <CInput
      id={props.id}
      name={props.name}
      placeholder={placeholder}
      maxLength={10}
      className="bg-background pr-10 text-sm overflow-x-auto"
      value={internalValue}
      onChange={(e) => {
        setInternalValue(e.target.value);
        if (e.target.value === "") {
          if (!isControlled) setInternalDate(null);
          props.onChange?.(undefined);
          return;
        }
        const newDate = toDate<Date>(e.target.value);
        if (newDate) {
          if (!isControlled) setInternalDate(newDate);
          props.onChange?.(newDate);
        }
      }}
    >
      <CDatePicker
        minDate={new Date(2000, 1, 10)}
        maxDate={new Date(2030, 11, 20)}
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

export interface CInputDatePickerHandle {
  readonly date: Date | undefined;
  setDate: (value?: Date) => void;
  readonly value: string;
  setValue: (value?: string) => void;
  clear: () => void;
  clearInput: () => void;
  open: () => void;
}

export const CInputDatePickerController = forwardRef<
  CInputDatePickerHandle,
  Omit<CInputDatePickerProps, "value">
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
    <CInputDatePicker
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
CInputDatePickerController.displayName = "CInputDatePickerController";
/* #endregion */

/* #region DatePicker */
export const CDatePicker = (props: CDatePickerProps<Date>) => {
  const isControlled = props.value !== undefined;

  const [open, setOpen] = useState(props.open ?? false);
  const [month, setMonth] = useState(props.initialValue ?? null);
  const [internalDate, setInternalDate] = useState(props.initialValue ?? null);

  const date = isControlled ? (props.value as Date | null) : internalDate;

  useEffect(() => {
    setMonth(date);
  }, [date]);

  useEffect(() => {
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
      <PopoverTrigger asChild>
        {props.children || <MyCalendarIcon />}
      </PopoverTrigger>
      <PopoverContent
        className="w-auto overflow-hidden p-0"
        align="end"
        alignOffset={-8}
        sideOffset={10}
      >
        <Calendar
          mode="single"
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

/* #region DateRangePicker */
export const CDateRangePicker = (props: CDatePickerProps<DateRange>) => {
  const isControlled = props.value !== undefined;

  const [open, setOpen] = useState(props.open ?? false);
  const [month, setMonth] = useState(props.initialValue?.from ?? null);
  const [internalDate, setInternalDate] = useState(props.initialValue ?? null);

  const date = isControlled ? (props.value as DateRange | null) : internalDate;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMonth(date?.from ?? null);
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
      <PopoverTrigger asChild>
        {props.children || <MyCalendarIcon />}
      </PopoverTrigger>
      <PopoverContent
        className="w-auto overflow-hidden p-0"
        align="end"
        alignOffset={-8}
        sideOffset={10}
      >
        <Calendar
          mode="range"
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
            if (date?.from !== date?.to) {
              setOpen(false);
              props.onOpenChange?.(false);
            }
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export const CDateRangePickerController = forwardRef<
  CDatePickerBaseHandle<DateRange>,
  Omit<CDatePickerProps<DateRange>, "value">
>((props, ref) => {
  const [open, setOpen] = useState(props.open ?? false);
  const [date, setDate] = useState(props.initialValue ?? null);

  useImperativeHandle(ref, () => ({
    get value() {
      return date ?? undefined;
    },
    setValue: (newValue) => {
      setDate(newValue as DateRange);
    },
    open: () => setOpen(true),
    clear: () => {
      setDate(null);
      props.onChange?.(undefined);
    },
  }));

  return (
    <CDateRangePicker
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
CDateRangePickerController.displayName = "CDateRangePickerController";
/* #endregion */

/* #region MultiDatePicker */
export const CMultiDatePicker = (props: CDatePickerProps<Date[]>) => {
  const isControlled = props.value !== undefined;

  const [open, setOpen] = useState(props.open ?? false);
  const [month, setMonth] = useState(props.initialValue?.[0] ?? null);
  const [internalDate, setInternalDate] = useState(props.initialValue ?? null);

  const date = isControlled ? (props.value as Date[] | null) : internalDate;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMonth(date?.[0] ?? null);
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
      <PopoverTrigger asChild>
        {props.children || <MyCalendarIcon />}
      </PopoverTrigger>
      <PopoverContent
        className="w-auto overflow-hidden p-0"
        align="end"
        alignOffset={-8}
        sideOffset={10}
      >
        <Calendar
          mode="multiple"
          captionLayout="dropdown"
          disabled={disabledConfig}
          startMonth={props.minDate}
          endMonth={props.maxDate}
          selected={date ?? undefined}
          month={month ?? undefined}
          onMonthChange={setMonth}
          onSelect={(date) => {
            date?.sort((a, b) => a.getTime() - b.getTime());
            if (!isControlled) setInternalDate(date ?? null);
            props.onChange?.(date);
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export const CMultiDatePickerController = forwardRef<
  CDatePickerBaseHandle<Date[]>,
  Omit<CDatePickerProps<Date[]>, "value">
>((props, ref) => {
  const [open, setOpen] = useState(props.open ?? false);
  const [date, setDate] = useState(props.initialValue ?? null);

  useImperativeHandle(ref, () => ({
    get value() {
      return date ?? undefined;
    },
    setValue: (newValue) => {
      setDate(newValue as Date[]);
    },
    open: () => setOpen(true),
    clear: () => {
      setDate(null);
      props.onChange?.(undefined);
    },
  }));

  return (
    <CMultiDatePicker
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
CMultiDatePickerController.displayName = "CMultiDatePickerController";
/* #endregion */

const MyCalendarIcon = (props: MyAny) => {
  return (
    <CButton
      {...props}
      tabIndex={-1}
      variant="ghost"
      className="absolute w-8 h-8 right-0.5 top-0.5 rounded-sm z-10"
    >
      <CalendarIcon className="size-3.5" />
    </CButton>
  );
};

/* #region Helpers Functions */

export type DatePickerType = Date | DateRange | Date[];

export function toDate<T extends DatePickerType>(
  value?: string | MyAny
): T | null {
  if (typeof value !== "string") return null;

  const trimmed = value.trim();

  if (trimmed.length === 10) {
    // "DD.MM.YYYY"
    const [day, month, year] = trimmed.split(".").map(Number);
    const date = new Date(year, month - 1, day);
    return isNaN(date.getTime()) ? null : (date as T);
  }

  if (trimmed.length === 23) {
    // "DD.MM.YYYY - DD.MM.YYYY"
    const dateList = trimmed.split("-").map((e) => e.trim());
    const dateRange = {} as DateRange;
    for (const d of dateList) {
      const [day, month, year] = d.split(".").map(Number);
      const date = new Date(year, month - 1, day);
      if (isNaN(date.getTime())) return null;
      if (dateRange.from == null) {
        dateRange.from = date;
      } else {
        dateRange.to = date;
      }
    }
    return dateRange as T;
  }

  return null;
}

export function toDateString(date: DatePickerType | null | undefined): string {
  if (!date) return "";

  if (isDateRange(date)) {
    return `${dateToString((date as DateRange).from)} - ${dateToString(
      (date as DateRange).to
    )}`;
  } else if (Array.isArray(date) && date.every((d) => d instanceof Date)) {
    return (date as Date[]).map((e) => dateToString(e)).join(" - ");
  } else if (date instanceof Date) {
    return dateToString(date);
  }
  return "";
}

function isDateRange(date: MyAny): date is DateRange {
  return date && typeof date === "object" && "from" in date && "to" in date;
}

function dateToString(date: Date | undefined): string {
  return (
    date?.toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }) ?? ""
  );
}
/* #endregion */
