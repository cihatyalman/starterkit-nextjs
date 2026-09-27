"use client";

import { useRef } from "react";
import { CButton } from "@/components/custom/button/CButton";
import { CInput } from "@/components/custom/input/CInput";
import { useFormSubmitState } from "@/core/hook/useFormSubmitState";
import { FormInput } from "./FormInput";
import { LockKeyhole, Mail, User } from "lucide-react";
import { SignupModel, SignupSchema } from "../models/signup.model";
import { signup } from "../auth.repo";
import { CPopupHandle } from "@/components/custom/tools/CPopup";
import { OtpPopup } from "@/features/otp/OtpPopup";

export const SignupForm = () => {
  const otpPopupRef = useRef<CPopupHandle>(null);

  const formState = useFormSubmitState(
    async (state, payload) => {
      const data = Object.fromEntries(payload.entries()) as SignupModel;
      console.log(`[C_data]: `, data);
      const res = await signup(data);
      if (res.hasError !== false) {
        return { ...state, validationErrors: res.validationErrors ?? {} };
      }

      otpPopupRef.current?.show(data.email);
      return { ...state };
    },
    {
      autoClear: "none",
      formSchema: SignupSchema,
    },
  );

  return (
    <>
      <form onSubmit={formState.onSubmit} className="flex flex-col">
        <FormInput label="Kullanıcı Adı">
          <CInput
            placeholder="kullanıcı_adı"
            name="username"
            type="text"
            icon={<User />}
            aria-errormessage={formState.state.validationErrors["username"]}
            required
          />
        </FormInput>
        <div className="h-5" />
        <FormInput label="E-Posta Adresi">
          <CInput
            placeholder="isim@gmail.com"
            name="email"
            type="email"
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
            icon={<LockKeyhole />}
            aria-errormessage={formState.state.validationErrors["password"]}
            required
          />
        </FormInput>
        <div className="h-5" />
        <FormInput label="Şifre Tekrar">
          <CInput
            placeholder="Sifre123."
            name="confirmPassword"
            type="password"
            icon={<LockKeyhole />}
            aria-errormessage={
              formState.state.validationErrors["confirmPassword"]
            }
            required
          />
        </FormInput>
        <div className="h-8" />
        <CButton
          type="submit"
          isLoading={formState.isPending}
          className="w-full"
        >
          Kayıt Ol
        </CButton>
      </form>
      <OtpPopup
        ref={otpPopupRef}
        mode="signup"
        duration={5}
        callback={async (code) => {
          console.log(`[C_signup_otp]: `, code);
          window.location.replace("/");
          return false;
        }}
      />
    </>
  );
};
