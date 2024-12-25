"use client";

import { ThemeProvider } from "@/app/context/themeContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
