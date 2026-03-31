import type { Metadata } from "next";
import "@/shared/styles/globals.css";
import "@/shared/styles/breakpoint.css";
import "@/shared/styles/base.css";
import "@/shared/styles/project.css";
import { getMetadata } from "@/shared/utils/metadata";
import { fontBase } from "@/assets/fonts";
import { ReduxProvider } from "@/lib/redux/provider";
import { ThemeProvider } from "@/lib/theme/provider";
import { Toaster } from "react-hot-toast";
import { DEFAULT_LOCALE } from "@/core/language/i18n/types";

export const metadata: Metadata = getMetadata.root({
  icons: { icon: "/favicon.ico", shortcut: "/favicon.ico" },
  keywords: ["next", "nextjs", "starter", "kit", "static"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={DEFAULT_LOCALE}
      data-scroll-behavior="smooth"
      className="scroll-smooth scroll-pt-16"
      suppressHydrationWarning
    >
      <body className={`${fontBase.className} antialiased`}>
        <ReduxProvider>
          <ThemeProvider>
            {children}
            <Toaster position="top-right" />
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
