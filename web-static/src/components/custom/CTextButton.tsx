import { Button } from "../ui/button";

interface CTextButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isUnderline?: boolean;
}

export const CTextButton = ({
  isUnderline = true,
  ...props
}: CTextButtonProps) => {
  return (
    <>
      <Button
        name={props.name}
        disabled={props.disabled}
        variant="link"
        onClick={props.onClick}
        className={`p-0 font-bold hover:text-blue-400 h-fit cursor-pointer text-md
          ${isUnderline ? "underline underline-offset-auto" : ""}
          ${props.className}`}
      >
        {props.children}
      </Button>
    </>
  );
};
