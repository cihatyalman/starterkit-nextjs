import { cn } from "@/lib/utils";
import { Cover } from "@/components/common/Cover";
import { Component, ShoppingCart, UserKey } from "lucide-react";
import { SiShadcnui } from "react-icons/si";
import { CLink } from "@/components/custom/button/CLink";
import { Metadata } from "next";
import { getMetadata } from "@/shared/utils/metadata";
import { DEFAULT_LOCALE, LocaleType } from "@/lib/language/i18n/types";

interface Props {
  params: Promise<{ locale: LocaleType }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  let baseLink = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  if (locale !== DEFAULT_LOCALE) baseLink = baseLink + "/" + locale;

  return getMetadata.main({
    absolute: "StarterKit | Nextjs",
    ogtitle: "StarterKit | Nextjs",
    description: "StarterKit | Nextjs",
    link: baseLink,
  });
}

export default function HomePage() {
  const iconSize = 28;
  return (
    <div className="flex flex-col *:mx-auto">
      <Cover />
      <div className="my-container grid grid-cols-1 sm:grid-cols-2 gap-6 my-4 w-full px-4">
        <Item
          icon={<Component size={iconSize} />}
          title="Reusable Components"
          description="Her hangi bir projede tekrar tekrar kullanılabilen shadcn tabanlı bileşenler."
          path="/reusable"
        />
        <Item
          icon={<SiShadcnui size={iconSize} />}
          title="Example Components"
          description="Shadcn tabanlı bileşenlerin nasıl kullanılacağını gösteren örnekler."
          path="/examples"
        />
        <Item
          icon={<ShoppingCart size={iconSize} />}
          title="Feature Example"
          description="Ürün listesi ve detay sayfası ile genel bir feature yapısı örnek olarak oluşturulmuştur."
          path="/products"
        />
        <Item
          icon={<UserKey size={iconSize} />}
          title="Auth (Ready Structure)"
          description="Basit bir auth yapısını hazır olarak sunmaktadır. Signin, signup, forgot password ..."
          path="/signin"
        />
      </div>
    </div>
  );
}

const Item = (props: {
  icon: React.ReactNode;
  title: string;
  description: string;
  path: string;
}) => {
  return (
    <CLink
      href={props.path}
      className={cn(
        "flex gap-4 rounded-xl shadow-md p-5 w-full",
        "hover:shadow-lg hover:shadow-primary/40 hover:scale-105 transition-all ease-in-out cursor-pointer",
        "dark:bg-black/20 dark:shadow-white/10 dark:hover:shadow-primary/40",
      )}
    >
      <div className="mt-0">{props.icon}</div>
      <div className="flex flex-col items-start">
        <p className="font-bold text-base sm:text-lg">{props.title}</p>
        <p className="text-sm sm:text-base text-gray-600">
          {props.description}
        </p>
      </div>
    </CLink>
  );
};
