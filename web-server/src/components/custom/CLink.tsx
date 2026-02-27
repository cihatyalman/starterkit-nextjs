import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import { AnchorHTMLAttributes } from "react";

interface CLinkProps
  extends LinkProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  isUnderline?: boolean;
  isHover?: boolean;
  isLink?: boolean;
}

export const CLink = ({ isLink, ...props }: CLinkProps) => {
  return isLink ? <LinkComp {...props} /> : <HrefComp {...props} />;
};

const HrefComp = ({ isUnderline, isHover, ...props }: CLinkProps) => {
  let href = props.href.toString();
  if (href.startsWith("/")) href = process.env.NEXT_PUBLIC_BASE_PATH + href;

  return (
    <a
      {...props}
      href={href}
      className={cn(
        "cursor-pointer inline-block",
        isUnderline && "underline",
        isHover && "hover:text-blue-400",
        props.className,
      )}
    >
      {props.children}
    </a>
  );
};

const LinkComp = ({ isUnderline, isHover, ...props }: CLinkProps) => {
  let href = props.href.toString();
  if (href.startsWith("/")) href = process.env.NEXT_PUBLIC_BASE_PATH + href;

  return (
    <Link
      {...props}
      href={href}
      className={cn(
        "cursor-pointer inline-block",
        isUnderline && "underline",
        isHover && "hover:text-blue-400",
        props.className,
      )}
    >
      {props.children}
    </Link>
  );
};
