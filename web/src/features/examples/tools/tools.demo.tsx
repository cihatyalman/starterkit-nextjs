"use client";

import { cn } from "@/lib/utils";
import { CButton } from "@/components/custom/button/CButton";
import { SideDrawer, useSideStore } from "@/features/examples/tools/SideDrawer";
import { LanguageSwitcher } from "@/lib/language/i18n/LanguageSwitcher";
import { ThemeButton } from "@/lib/theme/ThemeButton";
import { useTranslations } from "next-intl";
import { Copy } from "./Copy";

export const DemoTools = () => {
  return (
    <div className="relative flex gap-2">
      <StickyBox />
      <div className="flex flex-wrap gap-2 text-center">
        <SideDrawerBlock />
        <ThemeBlock />
        <LanguageBlock />
        <CopyBlock />
      </div>
    </div>
  );
};

const StickyBox = () => {
  return (
    <div className={cn("sticky top-18 h-fit", "border-2 p-3")}>
      <div className="text-center">
        <p>Sticky</p>
        <p className="text-sm">Yapışkan</p>
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

const SideDrawerBlock = () => {
  const setData = useSideStore((s) => s.setData);

  return (
    <BaseItem title="SideDrawer örneği">
      <CButton onClick={() => setData(true)}>Aç</CButton>
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

const LanguageBlock = () => {
  const t = useTranslations("home");

  return (
    <BaseItem title="Çoklu dil örneği">
      <div className="flex flex-col gap-2 items-center">
        <p className="text-lg">{t("welcome")}</p>
        <LanguageSwitcher extraPath="#tools" />
      </div>
    </BaseItem>
  );
};

const CopyBlock = () => {
  return (
    <BaseItem title="Metin kopyalama">
      <Copy text="Kopyalanacak Metin">Metni Kopyala</Copy>
    </BaseItem>
  );
};
