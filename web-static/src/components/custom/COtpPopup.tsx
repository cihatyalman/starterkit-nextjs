"use client";

import { forwardRef, useRef, useState } from "react";
import { CPopup, CPopupHandle } from "./CPopup";
import { COtpInputController, COtpInputHandle } from "./COtpInput";
import { CCountdown } from "./CCountdown";
import { CTextButton } from "./CTextButton";

export type COtpPopupType = "login" | "account";

interface COtpPopupProps {
  type: COtpPopupType;
  duration?: number;
  callback?: (code?: string | null) => Promise<boolean>;
}

export const COtpPopup = forwardRef<CPopupHandle, COtpPopupProps>(
  ({ duration = 180, ...props }, ref) => {
    const [disabled, setDisabled] = useState(true);
    const [countdownKey, setCountdownKey] = useState(0);

    const otpInputRef = useRef<COtpInputHandle>(null);
    const emailRef = useRef<string | null>(null);

    // Edit: Kendi API'nize göre düzenleyin
    const restartCountdown = async () => {
      setDisabled(true);
      setCountdownKey((prev) => prev + 1); // farklı key → component yeniden render olur
      // let res = null;
      if (props.type === "login") {
        // API'den yeni kod talep edin
      } else if (props.type === "account") {
        // API'den yeni kod talep edin
      }
      // if (res?.hasError != false) {
      if (false) {
        setDisabled(false);
        setCountdownKey((prev) => prev + 1);
        return false;
      }
      return true;
    };

    return (
      <CPopup
        ref={ref}
        width="w-140"
        title="Doğrulama Kodu"
        trueButtonText="Gönder"
        className="py-3 px-0.5 flex flex-col gap-2"
        init={(initialData) => (emailRef.current = initialData)}
        callback={() => {
          setTimeout(() => {
            otpInputRef.current?.clear();
            setDisabled(true);
            setCountdownKey(0);
          }, 100);
        }}
        actionFn={async () => {
          if (!otpInputRef.current?.check()) return false;
          const r = await props.callback?.(otpInputRef.current?.value);
          return r ?? true;
        }}
      >
        <div className="flex flex-col items-center gap-2">
          <COtpInputController maxLength={4} ref={otpInputRef} required />
          <CCountdown
            key={countdownKey}
            duration={duration}
            className="font-bold text-lg"
            onFinish={() => setDisabled(false)}
          />
          <p className="text-sm">
            Kod gelmedi mi?
            <CTextButton
              disabled={disabled}
              className="ml-1"
              onClick={() => restartCountdown()}
            >
              Kod Gönder
            </CTextButton>
          </p>
        </div>
      </CPopup>
    );
  }
);
COtpPopup.displayName = "COtpPopup";
