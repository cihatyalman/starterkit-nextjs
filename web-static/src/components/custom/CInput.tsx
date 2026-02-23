"use client";

import {
  forwardRef,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { FaEye, FaEyeSlash } from "react-icons/fa";

/* #region Core */
interface CInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  parentClassName?: string;
  group?: string;
  onBlurValidation?: (v: string) => string | null | void;
}

export const CInput = forwardRef<HTMLInputElement, CInputProps>(
  ({ children, parentClassName, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [internalError, setInternalError] = useState<string | null>(null);

    const _defaultId = useId();

    const finalError = props["aria-errormessage"] ?? internalError;
    const errorId = finalError ? `${props.id ?? _defaultId}-error` : undefined;

    return (
      <div className={cn("relative", parentClassName)}>
        <Input
          {...props}
          ref={ref}
          id={props.id ?? _defaultId}
          data-group={props.group}
          type={
            props.type !== "password"
              ? props.type
              : showPassword
                ? "text"
                : "password"
          }
          placeholder={props["aria-label"] ? "" : props.placeholder}
          aria-invalid={!!finalError}
          aria-describedby={errorId}
          onBlur={(e) => {
            if (props.onBlur) return props.onBlur(e);

            if (!props.onBlurValidation) return;
            const res = props.onBlurValidation?.(e.target.value);
            setInternalError(props["aria-errormessage"] ?? res ?? null);
          }}
          className={cn(
            "relative z-10 min-w-44 px-3 text-sm border rounded-md peer",
            "dark:bg-transparent!",
            props.type === "password" ? "pr-9" : "",
            "aria-invalid:text-red-600",
            props.className,
          )}
        />
        {props["aria-label"] && (
          <label
            htmlFor={props.id ?? _defaultId}
            className={cn(
              "absolute z-20 bg-white text-gray-500 text-xs left-1 -top-2 rounded-full px-2 pointer-events-none transition-all",
              "dark:bg-gray-300 dark:text-black",
              "peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm",
              "peer-focus:-top-2 peer-focus:text-xs peer-focus:border",
              "peer-not-placeholder-shown:border",
              finalError && "text-red-600 border-red-600 dark:text-red-600",
            )}
          >
            {props["aria-label"]}
          </label>
        )}
        {props.type === "password" && (
          <button
            tabIndex={-1}
            type="button"
            aria-label={"Password Visibility Button"}
            className="absolute right-px top-px cursor-pointer p-2 z-10"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
          </button>
        )}
        {finalError && (
          <p
            id={errorId}
            className="px-1 text-xs text-red-600"
            aria-live="polite"
          >
            {finalError}
          </p>
        )}
        {children}
      </div>
    );
  },
);
CInput.displayName = "CInput";

/* #endregion */

/* #region Wrapper(forwardRef) */
export interface CInputHandle {
  readonly ref: HTMLInputElement | null;
  readonly value: string | null;
  check: () => boolean;
  focus: () => void;
  clear: () => void;
}

export const CInputController = forwardRef<CInputHandle, CInputProps>(
  (props, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
      get ref() {
        return inputRef.current;
      },
      get value() {
        return inputRef.current?.value ?? null;
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
        if (inputRef.current) inputRef.current.value = "";
      },
    }));

    return <CInput {...props} ref={inputRef} />;
  },
);
CInputController.displayName = "CInputController";
/* #endregion */

/* #region Get Value Functions */
export function getValuesByFormData(formData: FormData) {
  return Object.fromEntries(formData.entries());
}

export function getValuesByGroup(
  group: string,
  options?: {
    isCheck?: boolean;
    scope?: ParentNode | string | null;
  },
): MyRecord | MyAny {
  let root =
    typeof options?.scope === "string"
      ? document.querySelector(options?.scope)
      : options?.scope;
  root ??= document;

  const inputs = root.querySelectorAll<HTMLInputElement>(
    `[data-group="${group}"]`,
  );

  const values: MyRecord = {};
  for (const input of inputs) {
    if (options?.isCheck && !input.checkValidity()) {
      input.reportValidity();
      return null;
    }
    values[input.name || input.id] = !input.value ? null : input.value;
  }

  return values;
}

export function getValueById(
  id: string,
  options: {
    isCheck?: boolean;
    scope?: ParentNode | string | null;
  },
) {
  let root =
    typeof options.scope === "string"
      ? document.querySelector(options.scope)
      : options.scope;
  root ??= document;

  const input = root.querySelector<HTMLInputElement>(`[id="${id}"]`);

  if (options.isCheck && !input?.checkValidity()) {
    input?.reportValidity();
    return null;
  }

  return !input?.value ? null : input.value;
}

export function getValueByName(
  name: string,
  options: {
    isCheck?: boolean;
    scope?: ParentNode | string | null;
  },
) {
  let root =
    typeof options.scope === "string"
      ? document.querySelector(options.scope)
      : options.scope;
  root ??= document;

  const input = document.querySelector<HTMLInputElement>(`[name="${name}"]`);

  if (options.isCheck && !input?.checkValidity()) {
    input?.reportValidity();
    return null;
  }

  return !input?.value ? null : input.value;
}
/* #endregion */
