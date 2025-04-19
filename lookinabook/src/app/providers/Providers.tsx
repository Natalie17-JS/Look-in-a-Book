"use client";

import { ThemeProvider } from "@/app/context/themeContext";
import { ApolloProvider } from "@apollo/client";
import client from "../apolloclient/client";
import { UserProvider } from "../context/authContext";
import { BookProvider } from "../context/bookContext";
import { ChapterProvider } from "../context/chapterContext";
import { PostProvider } from "../context/postContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <UserProvider>
      <BookProvider>
        <ChapterProvider>
          <PostProvider>
      <ThemeProvider>{children}</ThemeProvider>
      </PostProvider>
      </ChapterProvider>
      </BookProvider>
      </UserProvider>
    </ApolloProvider>
  );
}
