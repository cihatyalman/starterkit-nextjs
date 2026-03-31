import { CLink } from "@/components/custom/CLink";
import { CPopover } from "@/components/custom/CPopover";
import { Info } from "lucide-react";

export const ServerLinkPopover = (props: { path?: string }) => {
  return (
    <CPopover
      trigger={<Info />}
      parentClassName="w-6"
      className="max-w-40 p-2 text-xs text-center"
    >
      Server alternatifi için{" "}
      <CLink
        href={process.env.NEXT_PUBLIC_SERVER_URL + (props.path || "/")}
        isUnderline
        target="_blank"
      >
        bu sayfayı
      </CLink>{" "}
      ziyaret edebilirsiniz.
    </CPopover>
  );
};
