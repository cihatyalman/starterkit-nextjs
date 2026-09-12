"use client";

import { forwardRef, useImperativeHandle, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "../ui/dialog";
import { CButton } from "./CButton";

type CPopupResult = boolean | null;

export interface CPopupHandle {
  show: (initialData?: MyAny) => Promise<CPopupResult>;
  close: () => void;
}

interface CPopupProps {
  children: React.ReactNode;
  init?: (initialData: MyAny) => void; // show ile birlikte bir veri gönderildiğinde onu karşılar
  callback?: (result: CPopupResult) => Promise<void> | void; // Kapatılma durumu.
  actionFn?: () => Promise<boolean>; // Onay butonunu yönetir.
  title?: string;
  falseButtonText?: string;
  trueButtonText?: string | null;
  emptyBackgroud?: boolean;
  className?: string;
}

export const CPopup = forwardRef<CPopupHandle, CPopupProps>(
  (
    { falseButtonText = "Vazgeç", trueButtonText = "Kaydet", ...props },
    ref,
  ) => {
    const [open, setOpen] = useState(false);
    const [resolver, setResolver] = useState<(value: CPopupResult) => void>();

    const _close = (result: CPopupResult) => {
      setOpen(false);
      resolver?.(result);
      setResolver(() => undefined);
      props.callback?.(result);
    };

    useImperativeHandle(ref, () => ({
      show: (initialData?: MyAny) =>
        new Promise<CPopupResult>((resolve) => {
          setOpen(true);
          setResolver(() => resolve);
          props.init?.(initialData);
        }),
      close: () => {
        setOpen(false);
        resolver?.(false);
        setResolver(() => undefined);
      },
    }));

    return (
      <Dialog
        open={open}
        onOpenChange={(v) => !v && _close(null)}
        modal={false}
      >
        <BaseContent className={props.className}>
          {!props.emptyBackgroud && (
            <>
              <Header title={props.title} />
              <hr className="mt-2" />
            </>
          )}
          <div className="overflow-hidden max-h-[60vh]">{props.children}</div>
          {!props.emptyBackgroud && (
            <>
              <hr className="mb-2" />
              <Footer
                _close={_close}
                actionFn={props.actionFn}
                falseButtonText={falseButtonText}
                trueButtonText={trueButtonText}
              />
            </>
          )}
        </BaseContent>
      </Dialog>
    );
  },
);
CPopup.displayName = "CPopup";

const BaseContent = (props: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <DialogContent
      className={cn(
        "[&>button.absolute]:hidden",
        "z-50 overflow-hidden p-5 gap-0",
        "max-h-[80vh] w-[calc(100vw-2rem)] max-w-4xl!",
        props.className,
      )}
    >
      {props.children}
    </DialogContent>
  );
};

const Header = ({ title }: { title?: string }) => {
  return (
    <DialogHeader className="text-left text-lg">
      <DialogTitle className="font-semibold">{title}</DialogTitle>
      <DialogDescription className="hidden"></DialogDescription>
    </DialogHeader>
  );
};

const Footer = (props: {
  _close: (result: CPopupResult) => void;
  actionFn?: () => Promise<boolean>;
  falseButtonText?: string;
  trueButtonText?: string | null;
}) => {
  return (
    <DialogFooter className="flex flex-row justify-end">
      <CButton
        variant="outline"
        autoFocus
        className="hover:bg-accent"
        onClick={async () => props._close(false)}
      >
        {props.falseButtonText}
      </CButton>
      {props.trueButtonText !== null && (
        <CButton
          onClick={async () => {
            if (props.actionFn) {
              const r = await props.actionFn();
              if (r) props._close(r);
              return;
            }
            props._close(true);
          }}
        >
          {props.trueButtonText}
        </CButton>
      )}
    </DialogFooter>
  );
};
