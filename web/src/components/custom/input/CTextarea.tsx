"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

/* #region Core */
interface CTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  isResize?: boolean;
  group?: string;
}

export const CTextarea = forwardRef<HTMLTextAreaElement, CTextareaProps>(
  ({ isResize = true, ...props }, ref) => {
    const bgColor = "bg-transparent";
    return (
      <Textarea
        {...props}
        ref={ref}
        data-group={props.group}
        className={cn(
          "text-sm not-sm:text-xs",
          !isResize && "resize-none",
          bgColor,
          props.className,
        )}
      />
    );
  },
);
CTextarea.displayName = "CTextarea";
/* #endregion */

/* #region Wrapper(forwardRef) */
export interface CTextareaHandle {
  readonly value: string | null;
  check: () => boolean;
  focus: () => void;
  clear: () => void;
}

export const CTextareaController = forwardRef<CTextareaHandle, CTextareaProps>(
  ({ isResize = true, ...props }, ref) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useImperativeHandle(ref, () => ({
      get value() {
        return textareaRef.current?.value ?? null;
      },
      check: () => {
        const el = textareaRef.current;
        if (!el) return false;
        if (!el.checkValidity()) {
          el.reportValidity();
          return false;
        }
        return true;
      },
      focus: () => textareaRef.current?.focus(),
      clear: () => {
        if (textareaRef.current) textareaRef.current.value = "";
      },
    }));

    return <CTextarea {...props} ref={textareaRef} isResize={isResize} />;
  },
);
CTextareaController.displayName = "CTextareaController";
/* #endregion */
