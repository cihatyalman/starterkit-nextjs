import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface CPopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  parentClassName?: string;
  className?: string;
}

export const CPopover = (props: CPopoverProps) => {
  return (
    <Popover>
      <PopoverTrigger>
        <p
          className={cn(
            "cursor-pointer p-1 rounded-full hover:bg-gray-100",
            "*:size-4",
            props.parentClassName,
          )}
        >
          {props.trigger}
        </p>
      </PopoverTrigger>
      <PopoverContent align="center" className={props.className}>
        {props.children}
      </PopoverContent>
    </Popover>
  );
};
