import { DateRange } from "react-day-picker";

export type DatePickerType = Date | DateRange | Date[];
export type CDatePickerHandle = CDatePickerBaseHandle<Date>;
export type CDateRangePickerHandle = CDatePickerBaseHandle<DateRange>;
export type CMultiDatePickerHandle = CDatePickerBaseHandle<Date[]>;

export interface CDatePickerBaseHandle<T> {
  readonly value: T | undefined;
  setValue: (value?: T) => void;
  open: () => void;
  clear: () => void;
}

export interface CDatePickerProps<T> {
  initialValue?: T;
  value?: T | null;
  onChange?: (value?: T) => void;
  minDate?: Date;
  maxDate?: Date;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}
