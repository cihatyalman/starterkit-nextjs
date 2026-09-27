"use client";

import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { cn } from "@/lib/utils";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

/* #region Core */
export type ComboBoxItemType = { value: string; label: string };
interface CComboBoxProps {
  id?: string;
  name?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  searchPlaceholder?: string;
  defaultValue?: string;
  items: ComboBoxItemType[];
  value?: string;
  onChange?: (item: ComboBoxItemType | undefined) => void;
  width?: string; // w-96
  maxHeight?: string; // max-h-96
  disabled?: boolean;
  className?: string;
}

export const CComboBox = ({
  placeholder = "Seç",
  searchPlaceholder = "Ara..",
  maxHeight = "max-h-96",
  ...props
}: CComboBoxProps) => {
  const isControlled = props.value !== undefined;
  const [open, setOpen] = useState(false);
  const [internalSelectedKey, setInternalSelectedKey] = useState(
    props.defaultValue ?? "",
  );

  const selectedKey = isControlled ? props.value! : internalSelectedKey;

  const selectedItem = useMemo(() => {
    return props.items.find((item) => item.value === selectedKey);
  }, [props.items, selectedKey]);

  const searchItem = useCallback((value: string, search: string) => {
    const normalizedSearch = search.toLocaleLowerCase("tr");
    return value.toLocaleLowerCase("tr").includes(normalizedSearch) ? 1 : 0;
  }, []);

  const bgColor = "bg-transparent";
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        id={props.id}
        render={
          <Button
            name={props.name}
            variant="outline"
            role="combobox"
            aria-label="ComboBox"
            aria-expanded={open}
            aria-controls="search-command"
            disabled={props.disabled}
            className={cn(
              "justify-between min-h-10 cursor-pointer dark:border-2",
              props.width || "w-full",
              selectedItem?.label && "text-black",
              bgColor,
              props.className,
            )}
          >
            <div className="flex items-center gap-2 *:text-muted-foreground">
              {props.icon}
              {selectedItem?.label ?? placeholder}
            </div>
            <ChevronsUpDown className="opacity-50" />
          </Button>
        }
      ></PopoverTrigger>
      <input type="hidden" name={props.name} value={selectedKey} />
      <PopoverContent className="p-0 w-(--radix-popover-trigger-width)">
        <Command id="search-command" filter={searchItem}>
          <CommandInput
            placeholder={searchPlaceholder}
            className="border-0! ring-0! outline-none! bg-transparent!"
          />
          <CommandList className={`${maxHeight} overflow-y-auto`}>
            <CommandEmpty>Öge Bulunamadı</CommandEmpty>
            <CommandGroup>
              {props.items.map((i) => (
                <CommandItem
                  key={i.value}
                  value={i.value}
                  onSelect={() => {
                    if (!isControlled) setInternalSelectedKey(i.value);
                    setOpen(false);
                    props.onChange?.(i);
                  }}
                  className={cn(
                    "mb-1 last:mb-0",
                    selectedKey === i.value &&
                      "bg-primary text-white font-bold",
                  )}
                >
                  {i.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
/* #endregion */

/* #region Wrapper(forwardRef) */
export interface CComboBoxHandle {
  readonly value: ComboBoxItemType | undefined;
  set: (value: string) => void;
  clear: () => void;
}
export const CComboBoxController = forwardRef<
  CComboBoxHandle,
  Omit<CComboBoxProps, "value">
>((props, ref) => {
  const [selectedKey, setSelectedKey] = useState(props.defaultValue ?? "");

  const findItem = useCallback(
    (key: string | undefined) => props.items.find((e) => e.value === key),
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
    <CComboBox
      {...props}
      value={selectedKey}
      onChange={(e) => {
        setSelectedKey(e?.value ?? "");
        props.onChange?.(e);
      }}
    />
  );
});
CComboBoxController.displayName = "CComboBoxController";

/* #endregion */

/* #region Helpers */
export const toComboBoxItems = (itemList: string[]) => {
  return itemList.map((item, index) => ({
    value: index.toString(),
    label: item,
  }));
};
/* #endregion */
