"use client";

import { forwardRef, useState } from "react";
import { CTextButton } from "@/components/custom/button/CTextButton";
import { COtpInput } from "@/components/custom/input/COtpInput";
import { CCountdown } from "@/components/custom/tools/CCountdown";
import { CPopup, CPopupHandle } from "@/components/custom/tools/CPopup";
import { resendCode, verifyCode } from "./otp.repo";
import { ResponseModel } from "@/shared/models";

type OtpPopupMode = "signin" | "signup" | "forgot-password" | "update-email";

interface OtpPopupProps {
  mode: OtpPopupMode;
  duration?: number;
  callback?: (code: string) => Promise<boolean>;
}

export const OtpPopup = forwardRef<CPopupHandle, OtpPopupProps>(
  ({ duration = 180, ...props }, ref) => {
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");

    return (
      <CPopup
        initFn={(initialData) => {
          setEmail(initialData);
          setCode("");
        }}
        ref={ref}
        className="max-w-xl!"
        header={{ title: "Doğrulama Kodu" }}
        body={{
          content: (
            <Content
              mode={props.mode}
              duration={duration}
              initialData={email}
              callback={(c) => setCode(c)}
            />
          ),
        }}
        footer={{
          actionButtonText: "Gönder",
          actionFunc: async () => {
            let res: ResponseModel | undefined = undefined;
            switch (props.mode) {
              case "update-email":
                res = await verifyCode({ email: email, code: code });
                break;
              default:
                res = await verifyCode({ email: email, code: code });
                break;
            }

            if (res?.hasError !== false) return false;
            return (await props.callback?.(code)) ?? false;
          },
        }}
      />
    );
  },
);
OtpPopup.displayName = "OtpPopup";

const Content = (props: {
  mode: OtpPopupMode;
  duration: number;
  initialData: MyAny;
  callback: (code: string) => void;
}) => {
  const [disabled, setDisabled] = useState(true);
  const [countdownKey, setCountdownKey] = useState(0);

  const restartCountdown = async () => {
    setDisabled(true);
    setCountdownKey((prev) => prev + 1); // farklı key → component yeniden render olur

    let res: ResponseModel | undefined = undefined;
    switch (props.mode) {
      case "update-email":
        res = await resendCode({ email: props.initialData });
        break;
      default:
        res = await resendCode({ email: props.initialData });
        break;
    }
    if (res?.hasError !== false) {
      setDisabled(false);
      setCountdownKey((prev) => prev + 1);
      return false;
    }
    return true;
  };

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <COtpInput
        maxLength={4}
        name="code"
        onChange={(v) => props.callback(v)}
        autoFocus
        required
      />
      <CCountdown
        key={countdownKey}
        duration={props.duration!}
        className="font-bold text-lg"
        onFinish={() => setDisabled(false)}
      />
      <p className="text-sm">
        Kod gelmedi mi?
        <CTextButton
          disabled={disabled}
          className="ml-1"
          onClick={() => restartCountdown()}
          hoverUnderline
        >
          Kod Gönder
        </CTextButton>
      </p>
    </div>
  );
};
