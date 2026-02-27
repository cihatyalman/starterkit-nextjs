import { LanguageSwitcher } from "@/lib/language/i18n/LanguageSwitcher";
import { useTranslations } from "next-intl";

export const DemoTools = () => {
  return (
    <div className="relative flex gap-2">
      <div className="flex flex-wrap gap-2 text-center">
        <LanguageBlock />
      </div>
    </div>
  );
};

const BaseItem = (props: { title: string; children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center gap-2 p-2 border-2 w-44 h-44">
      <div className="flex flex-1 justify-center items-center">
        {props.children}
      </div>
      <p>{props.title}</p>
    </div>
  );
};

const LanguageBlock = () => {
  const t = useTranslations("home");

  return (
    <BaseItem title="Çoklu dil örneği">
      <div className="flex flex-col gap-2 items-center">
        <p className="text-lg">{t("welcome")}</p>
        <LanguageSwitcher />
      </div>
    </BaseItem>
  );
};
