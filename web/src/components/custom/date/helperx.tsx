import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export const MyCalendarIcon = () => {
  return (
    <span
      className={cn(
        "absolute right-1.5 top-1.5 z-10",
        "p-2 rounded-sm cursor-pointer hover:bg-accent",
      )}
    >
      <CalendarIcon className="size-3.5" />
    </span>
  );
};
