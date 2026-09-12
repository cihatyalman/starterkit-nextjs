import { Metadata } from "next";
import { getMetadata } from "@/shared/utils/metadata";
import { Footer } from "@/components/common/Footer";
import { Header } from "@/components/common/Header";
import { LanguageProvider } from "@/lib/language/i18n/provider";
import { ScrollListener } from "@/core/helperx/scroll-listener/ScrollListener";
import { ScrollToTop } from "@/components/custom/ScrollToTop";

export const metadata: Metadata = getMetadata.main({
  mainTitle: "StarterKit",
  absolute: "StarterKit | Nextjs Starter Kit",
  ogtitle: "StarterKit | Nextjs Starter Kit",
  description: "StarterKit | Nextjs Starter Kit",
  link: (process.env.NEXT_PUBLIC_BASE_URL ?? "") + "",
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
