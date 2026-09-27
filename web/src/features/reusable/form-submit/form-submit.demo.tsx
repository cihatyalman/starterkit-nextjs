"use client";

import { CButton } from "@/components/custom/button/CButton";
import { CInput } from "@/components/custom/input/CInput";
import { delay } from "@/core/helpers";
import { useFormSubmitState } from "@/core/hook/useFormSubmitState";

export const DemoFormSubmit = () => {
  const formState = useFormSubmitState(
    async (state, payload) => {
      console.log(`[C_payload]: `, Object.fromEntries(payload.entries()));
      await delay(1000);

      if (payload.get("email") === "test@gmail.com") {
        return {
          ...state,
          validationErrors: { email: "Bu e-posta zaten kullanılıyor" },
        };
      }

      return { ...state, validationErrors: {} as Record<string, string> };
    },
    {
      defaultValues: { email: "test@gmail.com" },
      autoClear: "none",
    },
  );

  return (
    <form onSubmit={formState.onSubmit} className="flex flex-wrap gap-2">
      <CInput
        type="email"
        name="email"
        aria-label="E-Posta"
        defaultValue={formState.state.defaultValues?.["email"]}
        aria-errormessage={formState.state.validationErrors["email"]}
      />
      <CInput
        type="password"
        name="password"
        aria-label="Şifre"
        defaultValue={formState.state.defaultValues?.["password"]}
        aria-errormessage={formState.state.validationErrors["password"]}
      />
      <CButton type="submit" isLoading={formState.isPending}>
        Yazdır
      </CButton>
    </form>
  );
};
