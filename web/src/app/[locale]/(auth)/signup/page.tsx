import { Metadata } from "next";
import { cn } from "@/lib/utils";
import { getMetadata } from "@/shared/utils/metadata";
import { OtherPageSignup, SignupForm } from "@/features/auth";
import { DEFAULT_LOCALE, LocaleType } from "@/lib/language/i18n/types";

interface Props {
  params: Promise<{ locale: LocaleType }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  let baseLink = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  if (locale !== DEFAULT_LOCALE) baseLink = baseLink + "/" + locale;

  return getMetadata.sub({
    title: "Kayıt Ol",
    ogtitle: "Kayıt Ol | Nextjs StarterKit",
    description: "Kayıt Ol | Nextjs StarterKit",
    link: `${baseLink}/signup`,
  });
}

export default function SignupPage() {
  return (
    <div className="p-3 flex justify-center items-center h-svh bg-accent">
      <div
        className={cn(
          "max-w-md min-w-sm w-full h-fit bg-white",
          "p-8 rounded-3xl shadow-md text-center border-t-4 border-primary",
        )}
      >
        <h1 className="font-bold text-4xl mb-8">Kayıt Ol</h1>
        <SignupForm />
        <div className="h-8" />
        <OtherPageSignup />
      </div>
    </div>
  );
}
