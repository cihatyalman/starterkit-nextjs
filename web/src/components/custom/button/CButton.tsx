"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import { Button } from "@/components/ui/button";

interface CButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link" | undefined;
  color?: string;
  isLoading?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
  asChild?: boolean;
}

export const CButton = ({
  variant = "default",
  type = "button",
  color,
  isLoading,
  autoFocus = false,
  disabled = false,
  onClick,
  className = "",
  asChild = false,
  ...props
}: CButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (asChild) return; // asChild modunda hiçbir şey yapma
    if (isLoading || loading || disabled) return;
    if (!onClick) return;
    setLoading(true);
    try {
      await onClick(e);
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
        (props["aria-label"] ?? props.name) ? `${props.name}-Button` : "Button"
      }
      autoFocus={autoFocus}
      disabled={disabled}
      onClick={handleClick}
      className={cn(
        "font-semibold transition-all h-10",
        variant === "default" && color,
        disabled ? "opacity-70 cursor-not-allowed" : "cursor-pointer",
        className.includes("w-") ? className : `min-w-25 w-fit ${className}`,
      )}
      {...props}
    >
      {loading || isLoading ? (
        <span>
          <Loader2 className="inline-flex animate-spin size-5" />
        </span>
      ) : (
        props.children
      )}
    </Comp>
  );
};
