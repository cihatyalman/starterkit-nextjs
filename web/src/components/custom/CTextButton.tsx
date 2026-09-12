import { Button } from "../ui/button";

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
        className={`p-0 font-bold h-fit cursor-pointer
          ${underline || hoverUnderline ? "hover:underline-offset-auto" : "hover:no-underline"}
          ${underline ? "underline underline-offset-auto" : "no-underline"}
          ${props.className}`}
      >
        {props.children}
      </Button>
    </>
  );
};
