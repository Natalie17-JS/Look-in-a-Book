"use client";

import { ThemeProvider } from "@/app/context/themeContext";
import { ApolloProvider } from "@apollo/client";
import client from "../apolloclient/client";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider>{children}</ThemeProvider>
    </ApolloProvider>
  );
}
