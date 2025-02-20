"use client";

import { ThemeProvider } from "@/app/context/themeContext";
import { ApolloProvider } from "@apollo/client";
import client from "../apolloclient/client";
import { AuthProvider } from "../context/authContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
      <ThemeProvider>{children}</ThemeProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}
