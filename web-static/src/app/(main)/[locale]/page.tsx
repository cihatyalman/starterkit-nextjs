import { HomeView } from "@/components/page/HomeView";
import { LocaleParamsType } from "@/core/language-static/i18n/types";

export default async function HomePage({
  params,
}: {
  params: Promise<LocaleParamsType>;
}) {
  const locale = (await params).locale;
  return <HomeView locale={locale} />;
}
