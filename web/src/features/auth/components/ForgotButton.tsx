"use client";

import { useRef } from "react";
import { CTextButton } from "@/components/custom/button/CTextButton";
import { CPopup, CPopupHandle } from "@/components/custom/tools/CPopup";
import { CInput } from "@/components/custom/input/CInput";
import { useForgotStore } from "../store/forgot.store";
import { useShallow } from "zustand/react/shallow";
import { forgotPassword, updatePassword } from "../auth.repo";
import { OtpPopup } from "@/features/otp/OtpPopup";

export const ForgotButton = () => {
  const forgotPopupRef = useRef<CPopupHandle>(null);
  const otpPopupRef = useRef<CPopupHandle>(null);
  const passwordPopupRef = useRef<CPopupHandle>(null);

  const { data, updateData, reset } = useForgotStore(
    useShallow((s) => ({
      data: s.data,
      updateData: s.updateData,
      reset: s.reset,
    })),
  );

  return (
    <>
      {/* Button */}
      <CTextButton
        hoverUnderline
        className="p-2 pr-0 text-sm"
        onClick={() => {
          reset();
          forgotPopupRef.current?.show();
        }}
      >
        Şifremi Unuttum?
      </CTextButton>
      {/* Email Popup */}
      <CPopup
        ref={forgotPopupRef}
        className="max-w-xl!"
        header={{ title: "Şifremi Unuttum?" }}
        body={{ content: <EmailPopupContent /> }}
        footer={{
          actionButtonText: "Gönder",
          actionFunc: async () => {
            const res = await forgotPassword({ email: data.email });
            if (!res) return false;

            otpPopupRef.current?.show(data.email);
            return true;
          },
        }}
      />
      {/* Otp Popup */}
      <OtpPopup
        ref={otpPopupRef}
        mode="forgot-password"
        duration={5}
        callback={async (code) => {
          console.log(`[C_forgot_password_otp]: `, code);
          updateData((prev) => ({ ...prev, code: code }));
          passwordPopupRef.current?.show();
          return true;
        }}
      />
      {/* Password Popup */}
      <CPopup
        ref={passwordPopupRef}
        className="max-w-xl!"
        header={{ title: "Şifremi Değiştir" }}
        body={{ content: <PasswordPopupContent /> }}
        footer={{
          actionButtonText: "Gönder",
          actionFunc: async () => {
            const res = await updatePassword(data);
            if (!res) return false;

            return true;
          },
        }}
      />
    </>
  );
};

const EmailPopupContent = () => {
  const updateData = useForgotStore((s) => s.updateData);

  return (
    <CInput
      type="email"
      name="email"
      placeholder="E-posta adresinizi giriniz"
      onChange={(e) =>
        updateData((prev) => ({ ...prev, email: e.currentTarget.value }))
      }
      autoFocus
      required
    />
  );
};

const PasswordPopupContent = () => {
  const updateData = useForgotStore((s) => s.updateData);

  return (
    <div className="space-y-3">
      <CInput
        name="code"
        placeholder="Doğrulama kodunu giriniz"
        inputMode="numeric"
        maxLength={4}
        onChange={(e) =>
          updateData((prev) => ({ ...prev, code: e.currentTarget.value }))
        }
        autoFocus
        required
      />
      <CInput
        type="password"
        name="password"
        placeholder="Yeni şifrenizi giriniz"
        onChange={(e) =>
          updateData((prev) => ({ ...prev, password: e.currentTarget.value }))
        }
        required
      />
      <CInput
        type="password"
        name="confirmPassword"
        placeholder="Şifrenizi tekrar giriniz"
        onChange={(e) =>
          updateData((prev) => ({
            ...prev,
            confirmPassword: e.currentTarget.value,
          }))
        }
        required
      />
    </div>
  );
};
