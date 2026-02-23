"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";

/* #region Core */
interface CTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  isResize?: boolean;
}

export const CTextarea = forwardRef<HTMLTextAreaElement, CTextareaProps>(
  ({ isResize = true, ...props }, ref) => {
    return (
      <Textarea
        {...props}
        ref={ref}
        className={cn(
          "dark:bg-transparent!",
          !isResize && "resize-none",
          props.className
        )}
      />
    );
  }
);
CTextarea.displayName = "CTextarea";
/* #endregion */

/* #region Wrapper(forwardRef) */
export interface CTextareaHandle {
  readonly value: string | null;
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
      focus: () => textareaRef.current?.focus(),
      clear: () => {
        if (textareaRef.current) textareaRef.current.value = "";
      },
    }));

    return <CTextarea {...props} ref={textareaRef} isResize={isResize} />;
  }
);
CTextareaController.displayName = "CTextareaController";
/* #endregion */
