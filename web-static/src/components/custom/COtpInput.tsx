"use client";

import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

/* #region Core */
interface COtpInputProps {
  maxLength: number;
  id?: string;
  name?: string;
  ariaLabel?: string;
  required?: boolean;
  value?: string;
  onChange?: (v: string) => void;
  onEnter?: (v: string) => void;
  inputRef?: React.Ref<HTMLInputElement>;
}

export const COtpInput = ({
  inputRef,
  ariaLabel = "OTP",
  ...props
}: COtpInputProps) => {
  const isControlled = props.value !== undefined;
  const [internalValue, setInternalValue] = useState("");

  const value = isControlled ? props.value! : internalValue;

  return (
    <div>
      <InputOTP
        ref={inputRef}
        id={props.id}
        name={props.name}
        aria-label={ariaLabel}
        maxLength={props.maxLength}
        pattern={REGEXP_ONLY_DIGITS}
        value={value}
        onChange={(v) => {
          if (!isControlled) setInternalValue(v);
          props.onChange?.(v);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") props.onEnter?.(e.currentTarget.value);
        }}
        required={props.required}
      >
        <InputOTPGroup>
          {Array.from({ length: props.maxLength }).map((_, index) => (
            <InputOTPSlot key={index} index={index} />
          ))}
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
};
/* #endregion */

/* #region Wrapper(forwardRef) */

export interface COtpInputHandle {
  readonly value: string | null;
  set: (value: string) => void;
  check: () => boolean;
  focus: () => void;
  clear: () => void;
}

export const COtpInputController = forwardRef<
  COtpInputHandle,
  Omit<COtpInputProps, "value">
>((props, ref) => {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    get value() {
      return inputRef.current?.value ?? null;
    },
    set: (value) => {
      setValue(value);
    },
    check: () => {
      const el = inputRef.current;
      if (!el) return false;
      if (!el.checkValidity()) {
        el.reportValidity();
        return false;
      }
      return true;
    },
    focus: () => inputRef.current?.focus(),
    clear: () => {
      setValue("");
      props.onChange?.("");
    },
  }));

  return (
    <COtpInput
      {...props}
      inputRef={inputRef}
      value={value}
      onChange={(keys) => {
        setValue(keys);
        props.onChange?.(keys);
      }}
    />
  );
});
COtpInputController.displayName = "COtpInputController";

/* #endregion */
