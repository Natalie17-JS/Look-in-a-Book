"use client";

import { ThemeProvider } from "@/app/context/themeContext";
import { ApolloProvider } from "@apollo/client";
import client from "../apolloclient/client";
import { UserProvider } from "../context/authContext";
import { BookProvider } from "../context/bookContext";
import { ChapterProvider } from "../context/chapterContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <UserProvider>
      <BookProvider>
        <ChapterProvider>
      <ThemeProvider>{children}</ThemeProvider>
      </ChapterProvider>
      </BookProvider>
      </UserProvider>
    </ApolloProvider>
  );
}
