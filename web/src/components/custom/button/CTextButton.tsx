import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CTextButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  underline?: boolean;
  hoverUnderline?: boolean;
}

export const CTextButton = ({
  underline = false,
  hoverUnderline = false,
  ...props
}: CTextButtonProps) => {
  return (
    <>
      <Button
        name={props.name}
        disabled={props.disabled}
        variant="link"
        onClick={props.onClick}
        className={cn(
          "p-0 font-bold h-fit cursor-pointer text-foreground",
          underline || hoverUnderline
            ? "hover:underline-offset-auto"
            : "hover:no-underline",
          underline ? "underline underline-offset-auto" : "no-underline",
          props.className,
        )}
      >
        {props.children}
      </Button>
    </>
  );
};
