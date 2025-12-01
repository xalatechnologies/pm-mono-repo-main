// components/ClientThemeProvider.tsx
"use client";

import { ThemeProvider } from "styled-components";
import { theme } from "../theme";

export default function ClientThemeProvider({ children }: { children: React.ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
