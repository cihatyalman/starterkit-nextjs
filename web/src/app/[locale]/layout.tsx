import { LanguageProvider } from "@/lib/language/i18n/provider";
import { ScrollListener } from "@/core/helperx/scroll-listener/ScrollListener";
import { ScrollToTop } from "@/components/custom/button/ScrollToTop";
import { ImagePreview } from "@/components/custom/image/ImagePreview";
import { ReduxProvider } from "@/lib/redux/provider";
import { ThemeProvider } from "@/lib/theme/provider";
import { Toaster } from "react-hot-toast";

export default function LocaleLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <LanguageProvider>
      <ReduxProvider>
        <ThemeProvider>
          <ScrollListener />
          {children}
          <ScrollToTop />
          <ImagePreview />
          <Toaster position="top-right" />
        </ThemeProvider>
      </ReduxProvider>
    </LanguageProvider>
  );
}
