"use client";

import { useRef } from "react";
import { CButton } from "@/components/custom/button/CButton";
import { CInput } from "@/components/custom/input/CInput";
import { useFormSubmitState } from "@/core/hook/useFormSubmitState";
import { FormInput } from "./FormInput";
import { LockKeyhole, Mail } from "lucide-react";
import { SigninModel, SigninSchema } from "../models/signin.model";
import { CPopupHandle } from "@/components/custom/tools/CPopup";
import { OtpPopup } from "@/features/otp/OtpPopup";
import { signin } from "../auth.repo";

export const SigninForm = (props: { forgotButtonComp?: React.ReactNode }) => {
  const otpPopupRef = useRef<CPopupHandle>(null);

  const formState = useFormSubmitState(
    async (state, payload) => {
      const data = Object.fromEntries(payload.entries()) as SigninModel;
      console.log(`[C_data]: `, data);
      const res = await signin(data);
      if (res.hasError !== false) {
        return { ...state, validationErrors: res.validationErrors ?? {} };
      }

      otpPopupRef.current?.show(data.email);
      return { ...state };
    },
    {
      autoClear: "none",
      formSchema: SigninSchema,
    },
  );

  return (
    <>
      <form onSubmit={formState.onSubmit} className="flex flex-col">
        <FormInput label="E-Posta Adresi">
          <CInput
            placeholder="isim@gmail.com"
            name="email"
            type="email"
            autoComplete="email"
            icon={<Mail />}
            aria-errormessage={formState.state.validationErrors["email"]}
            required
          />
        </FormInput>
        <div className="h-5" />
        <FormInput label="Şifre">
          <CInput
            placeholder="Sifre123."
            name="password"
            type="password"
            autoComplete="current-password"
            icon={<LockKeyhole />}
            aria-errormessage={formState.state.validationErrors["password"]}
            required
          />
        </FormInput>
        <div className="text-right">{props.forgotButtonComp}</div>
        <div className="h-5" />
        <CButton
          type="submit"
          isLoading={formState.isPending}
          className="w-full"
        >
          Giriş Yap
        </CButton>
      </form>
      <OtpPopup
        ref={otpPopupRef}
        mode="signin"
        duration={5}
        callback={async (code) => {
          console.log(`[C_signin_otp]: `, code);
          window.location.replace("/");
          return false;
        }}
      />
    </>
  );
};
