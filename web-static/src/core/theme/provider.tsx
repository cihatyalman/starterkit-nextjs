"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

// npm i next-themes
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      // defaultTheme="system"
      // enableSystem={true}
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
