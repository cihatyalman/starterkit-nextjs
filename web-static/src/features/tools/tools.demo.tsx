"use client";

import { CButton } from "@/components/custom/CButton";
import { CCountdown } from "@/components/custom/CCountdown";
import { CLink } from "@/components/custom/CLink";
import { CLoading } from "@/components/custom/CLoading";
import { COtpPopup } from "@/components/custom/COtpPopup";
import { CPopup, CPopupHandle } from "@/components/custom/CPopup";
import { CLottie } from "@/components/DynamicLoader";
import { SideDrawer, sideStore } from "@/components/project/SideDrawer";
import { useTimer } from "@/core/hook/useTimer";
import { ThemeButton } from "@/core/theme/ThemeButton";
import { Pause, Play, RotateCcw, Square } from "lucide-react";
import { useRef } from "react";

export const DemoTools = () => {
  return (
    <div className="relative flex gap-2">
      <div className="flex flex-wrap gap-2 text-center">
        <CustomTimerBlock />
        <CountdownBlock />
        <LoadingBlock />
        <LinkBlock />
        <LottieBlock />
        <PopupBlock />
        <OtpPopupBlock />
        <SideDriverBlock />
        {/* <LanguageBlock /> */}
        <ThemeBlock />
      </div>
    </div>
  );
};

const BaseItem = (props: { title: string; children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center gap-2 p-2 border-2 w-44 h-44">
      <div className="flex flex-1 justify-center items-center">
        {props.children}
      </div>
      <p>{props.title}</p>
    </div>
  );
};

const CustomTimerBlock = () => {
  const timer = useTimer();

  return (
    <BaseItem title="CustomTimer örneği">
      <div className="flex flex-col">
        <p className="text-xl font-bold mb-2">{timer.count}</p>
        <div className="flex gap-1">
          <CButton className="w-10" onClick={() => timer.start()}>
            <Play />
          </CButton>
          <CButton className="w-10" onClick={() => timer.stop()}>
            <Pause />
          </CButton>
          <CButton className="w-10" onClick={() => timer.reset()}>
            <Square />
          </CButton>
        </div>
      </div>
    </BaseItem>
  );
};

const CountdownBlock = () => {
  return (
    <BaseItem title="Countdown örneği">
      <CCountdown
        duration={4}
        format={["hours", "minutes", "seconds"]}
        onChange={(e) => console.log(e)}
        onFinish={() => console.log("Finish")}
      />
    </BaseItem>
  );
};

const LoadingBlock = () => {
  return (
    <BaseItem title="Loading örneği">
      <CLoading />
    </BaseItem>
  );
};

const LinkBlock = () => {
  return (
    <BaseItem title="Link örneği">
      <p className="text-sm">
        Bu bir{" "}
        <CLink href="https://www.google.com" target="_blank">
          Link
        </CLink>{" "}
        örneğidir.
      </p>
    </BaseItem>
  );
};

const LottieBlock = () => {
  return (
    <BaseItem title="Lottie örneği">
      <CLottie animKey="emptyAnim" className="w-32" />
    </BaseItem>
  );
};

const PopupBlock = () => {
  const popupRef = useRef<CPopupHandle>(null);

  return (
    <BaseItem title="Popup örneği">
      <CButton
        onClick={() => {
          popupRef.current?.show("Başlangıç Değeri").then((result) => {
            console.log("[C_result]: ", result);
            // if(result) popupRef.current?.close();
          });
        }}
      >
        Aç
      </CButton>
      <CPopup
        ref={popupRef}
        title="Popup"
        init={(e) => console.log("[C_init]: ", e)}
        callback={(r) => console.log(`[C_callback]: `, r)}
        actionFn={async () => {
          console.log("[C_action]: ");
          return true; // Otomatik kapatmayı kontrol altına aldık.
        }}
      >
        <br />
        <p>Bu bir Popup örneğidir.</p>
        <br />
      </CPopup>
    </BaseItem>
  );
};

const OtpPopupBlock = () => {
  const otpPopupRef = useRef<CPopupHandle>(null);

  return (
    <BaseItem title="OTP Popup örneği">
      <CButton
        onClick={() => {
          otpPopupRef.current?.show();
        }}
      >
        Aç
      </CButton>
      <COtpPopup
        ref={otpPopupRef}
        type="login"
        duration={5}
        callback={async (code) => {
          console.log("[C_code]: ", code);
          return true;
        }}
      />
    </BaseItem>
  );
};

const SideDriverBlock = () => {
  const openSide = sideStore((s) => s.setData);
  return (
    <BaseItem title="SideDrawer örneği">
      <CButton onClick={() => openSide(true)}>Aç</CButton>
      <SideDrawer />
    </BaseItem>
  );
};

const ThemeBlock = () => {
  return (
    <BaseItem title="Tema örneği">
      <ThemeButton />
    </BaseItem>
  );
};