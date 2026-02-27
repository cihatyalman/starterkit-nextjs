import type { Metadata } from "next";
import "@/styles/globals.css";
import "@/styles/breakpoint.css";
import "@/styles/base.css";
import "@/styles/project.css";
import { getMetadata } from "@/utils/metadata";
import { fontBase } from "@/assets/fonts";
import { useLocale } from "next-intl";

export const metadata: Metadata = getMetadata.root({
  icons: { icon: "/favicon.ico", shortcut: "/favicon.ico" },
  keywords: ["next", "nextjs", "starter", "kit"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = useLocale();

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className="scroll-smooth scroll-pt-16"
      suppressHydrationWarning
    >
      <body className={`${fontBase.className} antialiased`}>{children}</body>
    </html>
  );
}
