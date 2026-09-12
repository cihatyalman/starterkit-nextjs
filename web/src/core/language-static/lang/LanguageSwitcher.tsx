"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useClientLang } from "./helpers/client";
import { DEFAULT_LANG, LangType } from "./types";
import { checkLang } from "./helpers";
import { Button } from "@/components/ui/button";

export const LanguageSwitcher = (props: {
  extraPath?: string;
  className?: string;
}) => {
  const lang = useClientLang();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  function langUrl(nextLang: LangType) {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("lang");

    if (nextLang !== DEFAULT_LANG && checkLang(nextLang))
      params.set("lang", nextLang);

    const url = pathname + "?" + params.toString();
    return url;
  }

  function handleChangeLang(lang: LangType) {
    router.replace(langUrl(lang) + (props.extraPath ?? ""));
  }

  return (
    <Button
      name="LanguageButton"
      aria-label="LanguageButton"
      size="icon"
      variant="outline"
      onClick={() => handleChangeLang(lang === "tr" ? "en" : "tr")}
      className={`font-bold cursor-pointer ${props.className}`}
    >
      {lang.toUpperCase()}
    </Button>
  );
};
