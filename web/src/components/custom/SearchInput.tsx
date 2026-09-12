import { Search } from "lucide-react";
import { CButton } from "./CButton";
import { CInput } from "./CInput";

export const SearchInput = (props: { className?: string }) => {
  return (
    <CInput
      className={`rounded-full h-12 pl-10 pr-20 ${props.className}`}
      maxLength={80}
    >
      <CButton type="submit" className="absolute top-1.5 right-2 z-10 w-16 h-9">
        Ara
      </CButton>
      <Search className="absolute size-5 top-3.5 left-3.5 z-10 text-muted-foreground" />
    </CInput>
  );
};
