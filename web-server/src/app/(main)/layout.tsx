import { Metadata } from "next";
import { getMetadata } from "@/shared/utils/metadata";
import { ScrollListener } from "@/core/helperx/scroll-listener/ScrollListener";
import { ScrollToTop } from "@/components/custom/ScrollToTop";
import { LanguageProvider } from "@/lib/language/i18n/provider";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";

const title = "Starter Kit";
const ogtitle = "Starter Kit | Next.js";
const description = "Next.js için başlangıç kiti";
const link = process.env.NEXT_PUBLIC_BASE_URL ?? "";

export const metadata: Metadata = getMetadata.main({
  absolute: `${title} | Next.js`,
  mainTitle: "Next.js",
  ogtitle: ogtitle,
  description: description,
  link: link,
});

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <LanguageProvider>
        <ScrollListener />
        <div className="min-h-svh flex flex-col">
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <ScrollToTop />
      </LanguageProvider>
    </>
  );
}
