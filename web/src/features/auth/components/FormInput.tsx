export const FormInput = (props: {
  label: string;
  helperText?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="text-start">
      <p className="uppercase font-bold text-[11px] text-muted-foreground mb-1 pl-1">
        {props.label}
      </p>
      {props.children}
      {props.helperText && (
        <p className="text-muted-foreground text-xs pl-1">{props.helperText}</p>
      )}
    </div>
  );
};
