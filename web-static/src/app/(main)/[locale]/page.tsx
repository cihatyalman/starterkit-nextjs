import { HomeView } from "@/views/home/HomeView";
import { LocaleParamsType } from "@/core/language/i18n/types";

export default async function HomePage({
  params,
}: {
  params: Promise<LocaleParamsType>;
}) {
  const locale = (await params).locale;
  return <HomeView locale={locale} />;
}
