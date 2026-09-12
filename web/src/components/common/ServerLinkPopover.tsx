import { CLink } from "@/components/custom/CLink";
import { CPopover } from "@/components/custom/CPopover";
import { Info } from "lucide-react";

export const ServerLinkPopover = (props: { path?: string }) => {
  // todoo: Buna hic gerek olmayabilir. Eger olursa Static export olarak degistir
  return (
    <CPopover trigger={<Info />} parentClassName="w-6" className="max-w-40">
      <div className="text-xs text-center">
        Static export alternatifi için bu{" "}
        <CLink
          href={process.env.NEXT_PUBLIC_SERVER_URL + (props.path || "/")}
          isUnderline
          target="_blank"
        >
          sayfayı
        </CLink>{" "}
        ziyaret edebilirsiniz.
      </div>
    </CPopover>
  );
};
