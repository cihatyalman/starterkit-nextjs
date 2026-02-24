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
  width?: string;
  title?: string;
  falseButtonText?: string;
  trueButtonText?: string;
  trueButtonActive?: boolean;
  className?: string;
}

export const CPopup = forwardRef<CPopupHandle, CPopupProps>(
  (
    {
      falseButtonText = "Vazgeç",
      trueButtonText = "Kaydet",
      trueButtonActive = true,
      ...props
    },
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
      <>
        {open && <div className="fixed inset-0 z-40 bg-black/50" />}
        <Dialog
          open={open}
          onOpenChange={(v) => !v && _close(null)}
          modal={false}
        >
          <DialogContent
            className={cn(
              "[&>button.absolute]:hidden z-50 overflow-hidden p-3 gap-0 max-h-[80vh] max-w-[90vw] sm:max-w-[90vw] md:max-w-[90vw] lg:max-w-[calc(1024px*.9)]",
              props.width || "w-full",
            )}
          >
            <Header title={props.title} />
            <hr className="mt-2" />
            <div className={`overflow-hidden max-h-[60vh] ${props.className}`}>
              {props.children}
            </div>
            <hr className="mb-2" />
            <Footer
              _close={_close}
              actionFn={props.actionFn}
              falseButtonText={falseButtonText}
              trueButtonText={trueButtonText}
              trueButtonActive={trueButtonActive}
            />
          </DialogContent>
        </Dialog>
      </>
    );
  },
);
CPopup.displayName = "CPopup";

const Header = ({ title }: { title?: string }) => {
  return (
    <DialogHeader className="text-left">
      <DialogTitle>{title}</DialogTitle>
      <DialogDescription className="hidden"></DialogDescription>
    </DialogHeader>
  );
};

const Footer = (props: {
  _close: (result: CPopupResult) => void;
  actionFn?: () => Promise<boolean>;
  falseButtonText?: string;
  trueButtonText?: string;
  trueButtonActive?: boolean;
}) => {
  return (
    <DialogFooter className="flex flex-row justify-end">
      <CButton
        variant="outline"
        autoFocus
        onClick={async () => props._close(false)}
      >
        {props.falseButtonText}
      </CButton>
      {props.trueButtonActive && (
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
