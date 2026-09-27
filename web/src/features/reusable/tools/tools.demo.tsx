"use client";

import { useRef } from "react";
import { CButton } from "@/components/custom/button/CButton";
import { CCountdown } from "@/components/custom/tools/CCountdown";
import { CLink } from "@/components/custom/button/CLink";
import { CLoading } from "@/components/custom/tools/CLoading";
import { CLottie } from "@/components/DynamicLoader";
import { useTimerCount } from "@/core/hook/useTimer";
import { Pause, Play, Square } from "lucide-react";
import { CPopup, CPopupHandle } from "@/components/custom/tools/CPopup";
import { delay } from "@/core/helpers";

export const DemoTools = () => {
  return (
    <div className="relative flex gap-2">
      <div className="flex flex-wrap gap-2 text-center">
        <PopupBlock />
        <CustomTimerBlock />
        <CountdownBlock />
        <LoadingBlock />
        <LinkBlock />
        <LottieBlock />
      </div>
    </div>
  );
};

const BaseItem = (props: {
  title: string;
  info?: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col items-center gap-2 p-2 border-2 w-44 h-44 text-sm">
      <div className="flex flex-1 justify-center items-center">
        {props.children}
      </div>
      <div className="flex gap-1 justify-center items-center">
        <p className="line-clamp-1">{props.title}</p>
        {props.info}
      </div>
    </div>
  );
};

const PopupBlock = () => {
  const ref = useRef<CPopupHandle>(null);

  return (
    <BaseItem title="Popup örneği">
      <CButton onClick={() => ref.current?.show()}>Aç</CButton>
      <CPopup
        ref={ref}
        header={{ title: "Popup Başlık" }}
        body={{ content: <p>Bu bir popup örneğidir.</p> }}
        footer={{
          actionFunc: async () => {
            await delay(1000);
            return true;
          },
        }}
      />
    </BaseItem>
  );
};

const CustomTimerBlock = () => {
  const timer = useTimerCount(500);

  return (
    <BaseItem title="useTimer örneği">
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
        duration={60 * 10}
        format={["hours", "minutes", "seconds"]}
        // onChange={(e) => console.log(e)}
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
        <CLink href="https://www.google.com" target="_blank" isUnderline>
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
      <CLottie animKey="emptyAnim" className="w-32!" />
    </BaseItem>
  );
};
