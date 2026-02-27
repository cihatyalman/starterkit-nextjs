import { Metadata } from "next";
import { getMetadata } from "@/utils/metadata";
import { ScrollListener } from "@/infrastructure/helperx/scroll-listener/ScrollListener";
import HtmlLangUpdater from "@/infrastructure/language/i18n/HtmlLangUpdater";
import { ScrollToTop } from "@/components/custom/ScrollToTop";
import { Header } from "@/shared/ui/Header";
import { Footer } from "@/shared/ui/Footer";

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
      <HtmlLangUpdater />
      <ScrollListener />
      <div className="min-h-svh flex flex-col">
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
      <ScrollToTop />
    </>
  );
}
