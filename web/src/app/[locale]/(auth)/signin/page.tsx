import { Metadata } from "next";
import { cn } from "@/lib/utils";
import { getMetadata } from "@/shared/utils/metadata";
import { ForgotButton, SigninForm, OtherPageSignin } from "@/features/auth";
import { DEFAULT_LOCALE, LocaleType } from "@/lib/language/i18n/types";

interface Props {
  params: Promise<{ locale: LocaleType }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  let baseLink = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  if (locale !== DEFAULT_LOCALE) baseLink = baseLink + "/" + locale;

  return getMetadata.sub({
    title: "Giriş Yap",
    ogtitle: "Giriş Yap | Nextjs StarterKit",
    description: "Giriş Yap | Nextjs StarterKit",
    link: `${baseLink}/signin`,
  });
}

export default function SigninPage() {
  return (
    <div className="p-3 flex justify-center items-center h-svh bg-accent">
      <div
        className={cn(
          "max-w-md min-w-sm w-full h-fit bg-white",
          "p-8 rounded-3xl shadow-md text-center border-t-4 border-primary",
        )}
      >
        <h1 className="font-bold text-4xl mb-8">Giriş Yap</h1>
        <SigninForm forgotButtonComp={<ForgotButton />} />
        <div className="h-8" />
        <OtherPageSignin />
      </div>
    </div>
  );
}
