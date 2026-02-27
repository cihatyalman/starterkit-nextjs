"use client";

import { useState } from "react";
import z from "zod";

type ClearType = "none" | "valid" | "force";

export interface FormSubmitState<State = MyAny> {
  validationErrors: Record<string, string>;
  inputValues: Record<string, MyAny>;
  extra: State;
}

/**
 * Server mod için useFormActionState kullan.
 */
export function useFormSubmitState<State>(
  submitFn: (
    state: FormSubmitState<State>,
    payload: FormData
  ) => FormSubmitState<State> | Promise<FormSubmitState<State>>,
  options?: {
    defaultValues?: Record<string, MyAny>;
    autoClear?: ClearType;
    formSchema?: z.ZodObject;
    extraState?: State;
  }
): {
  state: FormSubmitState<State>;
  onSubmit: (payload: React.FormEvent<HTMLFormElement>) => void;
  isPending: boolean;
} {
  const [isPending, setPending] = useState(false);
  const [state, setState] = useState<FormSubmitState<State>>({
    validationErrors: {},
    inputValues: options?.defaultValues ?? {},
    extra: options?.extraState ?? (undefined as unknown as State),
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Multi click yapılmasını engeller.
    if (isPending) return;
    setPending(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      // zod kullanılarak validation yapılabilir.
      state.validationErrors = {};
      if (options?.formSchema) {
        state.validationErrors = zodIssuesToRecord(
          options.formSchema,
          formData
        );
      }

      const res = await submitFn(state, formData);
      setState(res);

      state.inputValues = Object.fromEntries(formData.entries());

      // inputValues + defaultValue ile input verileri ui'dan silinebilir.
      if (options?.autoClear === "force") {
        state.validationErrors = {};
        state.inputValues = {};
        form.reset();
      } else if (
        options?.autoClear === "valid" &&
        Object.keys(state.validationErrors).length === 0
      ) {
        state.inputValues = {};
        form.reset();
      }
    } catch (err) {
      console.log(`[C_Error_UseSubmitState]: `, err);
    } finally {
      setPending(false);
    }
  };

  return { state, onSubmit, isPending };
}

export function zodIssuesToRecord(
  formSchema: z.ZodObject,
  formData: FormData
): Record<string, string> {
  const errors: Record<string, string> = {};

  const data = Object.fromEntries(formData.entries());
  const result = formSchema.safeParse(data);

  for (const issue of result.error?.issues ?? []) {
    const key = issue.path.length ? issue.path.join(".") : "_form";

    if (!(key in errors)) {
      errors[key] = issue.message;
    }
  }

  return errors;
}
