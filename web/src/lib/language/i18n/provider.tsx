import { NextIntlClientProvider, useLocale, useMessages } from "next-intl";
import HtmlLangUpdater from "./HtmlLangUpdater";

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const locale = useLocale();
  const messages = useMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <HtmlLangUpdater />
      {children}
    </NextIntlClientProvider>
  );
};
