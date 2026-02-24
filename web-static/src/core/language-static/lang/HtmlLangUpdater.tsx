"use client";

import { useEffect } from "react";
import { useClientLang } from "./helpers/client";

export default function HtmlLangUpdater() {
  const lang = useClientLang();

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return null;
}
