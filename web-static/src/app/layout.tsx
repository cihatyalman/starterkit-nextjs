import type { Metadata } from "next";
import "@/styles/globals.css";
import "@/styles/breakpoint.css";
import "@/styles/base.css";
import "@/styles/project.css";
import { getMetadata } from "@/lib/metadata";
import { fontBase } from "@/assets/fonts";
import { ReduxProvider } from "@/lib/store/redux/provider";
import { ThemeProvider } from "@/core/theme/provider";
import { Toaster } from "react-hot-toast";

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
      lang="tr"
      data-scroll-behavior="smooth"
      className="scroll-smooth"
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
