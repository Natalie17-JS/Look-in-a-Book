"use client";

import { ThemeProvider } from "@/app/context/themeContext";
import { ApolloProvider } from "@apollo/client";
import client from "../apolloclient/client";
import { UserProvider } from "../context/authContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <UserProvider>
      <ThemeProvider>{children}</ThemeProvider>
      </UserProvider>
    </ApolloProvider>
  );
}
