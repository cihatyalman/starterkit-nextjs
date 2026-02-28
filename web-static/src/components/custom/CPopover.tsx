import { Button } from "../ui/button";
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
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`cursor-pointer ${props.parentClassName}`}
        >
          {props.trigger}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="center" className={props.className}>
        {props.children}
      </PopoverContent>
    </Popover>
  );
};
