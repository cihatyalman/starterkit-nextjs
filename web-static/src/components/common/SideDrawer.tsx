"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { create } from "zustand";

export const sideStore = create<StoreProps<boolean>>((set) => ({
  data: false,
  setData: (value: boolean) => set({ data: value }),
}));

export const MenuButton = (props: { className?: string }) => {
  const openSide = sideStore((s) => s.setData);

  return (
    <Button
      onClick={() => openSide(true)}
      name="MenuButton"
      aria-label="MenuButton"
      size="icon"
      className={cn(
        "cursor-pointer border",
        "bg-background hover:bg-accent text-foreground",
        "short:shadow-black/10 short:dark:shadow-white/10",
        props.className,
      )}
    >
      <Menu />
    </Button>
  );
};

export const SideDrawer = () => {
  const sideState = sideStore((s) => s);

  return (
    <div className="md:hidden">
      <Sheet open={sideState.data} onOpenChange={sideState.setData}>
        <SheetContent
          side="left"
          className={cn(
            "[&>button]:hidden data-[state=open]:duration-300 data-[state=closed]:duration-300 transition ease-out",
            "w-80 p-3 max-w-[75vw] max-h-dvh",
          )}
        >
          <SheetHeader className="hidden">
            {/* Ekran okuyucu için görünmez başlık */}
            <SheetTitle>Menü</SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <Content />
        </SheetContent>
      </Sheet>
    </div>
  );
};

const Content = () => {
  return (
    <>
      <p>SideDrawer Örneği</p>
    </>
  );
};
