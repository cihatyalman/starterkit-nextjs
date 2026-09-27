"use client";

import { useState } from "react";
import z from "zod";

type ClearType = "none" | "valid" | "force";
const initalState = {
  // Inputlara varsayılan değerler atamak için kullanılır.
  defaultValues: {} as Record<string, MyAny>,
  // Inputlarda oluşacak hata mesajları burada tutulur.
  validationErrors: {} as Record<string, string>,
};
type FormSubmitState = typeof initalState;

export function useFormSubmitState(
  submitFn: (
    state: FormSubmitState,
    payload: FormData,
  ) => FormSubmitState | Promise<FormSubmitState>,
  options?: {
    defaultValues?: Record<string, MyAny>;
    autoClear?: ClearType;
    formSchema?: z.ZodType;
  },
): {
  state: FormSubmitState;
  onSubmit: (payload: React.SubmitEvent<HTMLFormElement>) => void;
  isPending: boolean;
} {
  const [isPending, setPending] = useState(false);
  const [state, setState] = useState<FormSubmitState>({
    defaultValues: options?.defaultValues ?? {},
    validationErrors: {},
  });

  const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Multi click yapılmasını engeller.
    if (isPending) return;
    setPending(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const tempState = { ...state };
    try {
      // zod kullanılarak validation yapılabilir.
      if (options?.formSchema) {
        tempState.validationErrors = zodIssuesToRecord(
          options.formSchema!,
          formData,
        );
      }

      const res = await submitFn(tempState, formData);
      setState(res);

      // form.reset ile input verileri ui'dan silinebilir.
      if (options?.autoClear === "force") {
        setState(initalState);
        form.reset();
      } else if (
        options?.autoClear === "valid" &&
        Object.keys(res.validationErrors).length === 0
      ) {
        setState(initalState);
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
  formSchema: z.ZodType,
  formData: FormData,
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
