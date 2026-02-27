"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";

interface CButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link" | undefined;
  color?: string;
  loadingCtrl?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
  asChild?: boolean;
}

export const CButton = ({
  variant = "default",
  type = "button",
  color = "bg-(--color-primary) hover:bg-(--color-primary-light)",
  loadingCtrl = false,
  autoFocus = false,
  disabled = false,
  onClick,
  className = "",
  asChild = false,
  ...props
}: CButtonProps) => {
  const [loading, setLoading] = useState(loadingCtrl);

  useEffect(() => {
    setLoading(loadingCtrl);
  }, [loadingCtrl]);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (asChild) return; // asChild modunda hiçbir şey yapma
    if (loading || disabled) return;
    setLoading(true);
    try {
      await onClick?.(e);
    } finally {
      setLoading(false);
    }
  };

  const Comp = asChild ? Slot : Button;
  return (
    <Comp
      variant={variant}
      type={type}
      aria-label={
        props["aria-label"] ?? props.name ? `${props.name}-Button` : "Button"
      }
      autoFocus={autoFocus}
      disabled={disabled}
      onClick={handleClick}
      className={cn(
        "font-semibold transition-all",
        variant === "default" && color,
        disabled ? "opacity-70 cursor-not-allowed" : "cursor-pointer",
        className.includes("w-") ? className : `min-w-25 w-fit ${className}`
      )}
      {...props}
    >
      {loading ? (
        <span>
          <Loader2 className="inline-flex animate-spin size-5" />
        </span>
      ) : (
        props.children
      )}
    </Comp>
  );
};
