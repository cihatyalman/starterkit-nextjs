import { useActionState } from "react";
import z from "zod";

type ClearType = "none" | "valid" | "force";

export interface FormActionState<State = MyAny> {
  validationErrors: Record<string, string>;
  inputValues: Record<string, MyAny>;
  extra: State;
}

/**
 * Export mod'da çalışmaz.
 */
export function useFormActionState<State>(
  actionFn: (
    state: FormActionState<State>,
    payload: FormData
  ) => FormActionState<State> | Promise<FormActionState<State>>,
  options?: {
    defaultValues?: Record<string, MyAny>;
    autoClear?: ClearType;
    formSchema?: z.ZodObject;
    formRef?: React.RefObject<HTMLFormElement | null>;
    extraState?: State;
  }
): {
  state: FormActionState<State>;
  action: (payload: FormData) => void;
  isPending: boolean;
} {
  const [state, action, isPending] = useActionState(localActionFn, {
    validationErrors: {},
    inputValues: options?.defaultValues ?? {},
    extra: options?.extraState ?? (undefined as unknown as State),
  });

  async function localActionFn(
    prevState: FormActionState<State>,
    formData: FormData
  ) {
    // Multi click yapılmasını engeller.
    if (isPending) return prevState;

    // zod kullanılarak validation yapılabilir.
    prevState.validationErrors = {};
    if (options?.formSchema) {
      prevState.validationErrors = zodIssuesToRecord(
        options.formSchema,
        formData
      );
    }

    prevState = await actionFn(prevState, formData);

    // inputValues + defaultValue ile input verileri ui'da tutulabilir.
    if (options?.autoClear === "none") {
      const data = Object.fromEntries(formData.entries());
      prevState.inputValues = data;
    } else if (
      options?.autoClear === "valid" &&
      Object.keys(prevState.validationErrors).length !== 0
    ) {
      const data = Object.fromEntries(formData.entries());
      prevState.inputValues = data;
    } else if (options?.autoClear === "force") {
      prevState.validationErrors = {};
      prevState.inputValues = {};
      options?.formRef?.current?.reset();
    } else {
      prevState.inputValues = {};
      options?.formRef?.current?.reset();
    }

    return prevState;
  }

  return { state, action, isPending };
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
