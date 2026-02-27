import {
  LOCALE_PARAMS_LIST,
  LocaleParamsType,
} from "@/infrastructure/language-static/i18n/types";

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALE_PARAMS_LIST;
}

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<LocaleParamsType<string>>;
}>) {
  return <>{children}</>;
}
