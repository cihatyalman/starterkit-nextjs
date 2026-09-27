"use client";

import { forwardRef, useImperativeHandle, useState } from "react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CButton } from "../button/CButton";

export interface CPopupHandle {
  show: (initialData?: MyAny) => void;
  close: () => void;
}

interface CPopupProps {
  trigger?: React.ReactNode; // tetikleyici
  children?: React.ReactNode; // full content
  className?: string;
  header?: HeaderProps;
  body?: BodyProps;
  footer?: FooterProps;
  initFn?: (initialData?: MyAny) => void;
}

interface HeaderProps {
  title: string;
}
interface BodyProps {
  content: React.ReactNode;
}
interface FooterProps {
  cancelButtonText?: string;
  actionButtonText?: string;
  actionFunc: () => Promise<boolean>;
}

export const CPopup = forwardRef<CPopupHandle, CPopupProps>((props, ref) => {
  const [open, setOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    show: (initialData) => {
      props.initFn?.(initialData);
      setOpen(true);
    },
    close: () => {
      setOpen(false);
      props.initFn?.(undefined);
    },
  }));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {props.trigger && (
        <DialogTrigger className="cursor-pointer">
          {props.trigger}
        </DialogTrigger>
      )}
      <DialogContent
        className={cn(
          "[&>button.absolute]:hidden",
          "z-50 overflow-hidden p-4 gap-0",
          "max-h-[80vh] w-[calc(100vw-2rem)] max-w-4xl!",
          props.className,
        )}
      >
        {props.children || (
          <>
            {props.header && <Header {...props} />}
            <div className="py-2">
              <Body content={props.body?.content} />
            </div>
            {props.footer && <Footer setOpen={setOpen} footer={props.footer} />}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
});
CPopup.displayName = "CPopup";

const Header = (props: CPopupProps) => {
  return (
    <>
      <p className="font-bold text-xl">{props.header?.title}</p>
      <hr className="mt-1" />
    </>
  );
};

const Body = (props: BodyProps) => {
  return <>{props.content}</>;
};

const Footer = (props: {
  setOpen: (open: boolean) => void;
  footer: FooterProps;
}) => {
  return (
    <>
      <hr className="mb-3" />
      <div className="flex flex-row justify-end space-x-3">
        <CButton variant="outline" onClick={() => props.setOpen(false)}>
          {props.footer.cancelButtonText || "Vazgeç"}
        </CButton>
        <CButton
          onClick={async () => {
            const r = await props.footer.actionFunc();
            if (r) props.setOpen(false);
          }}
        >
          {props.footer.actionButtonText || "Kaydet"}
        </CButton>
      </div>
    </>
  );
};
