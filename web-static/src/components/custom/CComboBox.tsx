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
interface CComboBoxProps {
  id?: string;
  name?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  defaultValue?: string;
  items: KeyLabel[];
  value?: string;
  onChange?: (value: KeyLabel | undefined) => void;
  width?: string; // w-96
  maxHeight?: string; // max-h-96
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
    props.defaultValue ?? ""
  );

  const selectedKey = isControlled ? props.value! : internalSelectedKey;

  const selectedItem = useMemo(() => {
    return props.items.find((e) => e.key === selectedKey);
  }, [props.items, selectedKey]);

  const searchItem = useCallback((value: string, search: string) => {
    const normalizedSearch = search.toLocaleLowerCase("tr");
    return value.toLocaleLowerCase("tr").includes(normalizedSearch) ? 1 : 0;
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger id={props.id} asChild>
        <Button
          name={props.name}
          variant="outline"
          role="combobox"
          aria-label="ComboBox"
          aria-expanded={open}
          aria-controls="search-command"
          className={cn(
            "justify-between",
            props.width || "w-full",
            selectedItem?.label && "text-black",
            props.className
          )}
        >
          {selectedItem?.label ?? placeholder}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <input type="hidden" name={props.name} value={selectedKey ?? ""} />
      <PopoverContent className="p-0 w-(--radix-popover-trigger-width)">
        <Command id="search-command" filter={searchItem}>
          <CommandInput
            placeholder={searchPlaceholder}
            className="h-9 border-0! ring-0! outline-none! bg-transparent!"
          />
          <CommandList className={`${maxHeight} overflow-y-auto`}>
            <CommandEmpty>Öge Bulunamadı</CommandEmpty>
            <CommandGroup>
              {props.items.map((i) => (
                <CommandItem
                  key={i.key}
                  value={i.label}
                  onSelect={() => {
                    if (!isControlled) setInternalSelectedKey(i.key);
                    setOpen(false);
                    props.onChange?.(i);
                  }}
                  className={cn(
                    selectedKey === i.key &&
                      "bg-(--color-primary) text-white font-bold"
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
  readonly value: KeyLabel | undefined;
  set: (value: string) => void;
  clear: () => void;
}
export const CComboBoxController = forwardRef<
  CComboBoxHandle,
  Omit<CComboBoxProps, "value">
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
    <CComboBox
      {...props}
      value={selectedKey}
      onChange={(e) => {
        setSelectedKey(e?.key ?? "");
        props.onChange?.(e);
      }}
    />
  );
});
CComboBoxController.displayName = "CComboBoxController";

/* #endregion */
