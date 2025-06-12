"use client";

import { useEffect, useState, createContext, useContext, ReactNode } from "react";
import { Book } from "@/app/types/bookTypes";
import { useQuery } from "@apollo/client";
import { GET_BOOK_BY_SLUG } from "../GraphqlOnClient/queries/bookQueries";
import { useParams } from "next/navigation"; // Используем useParams вместо useRouter

interface BookContextType {
  currentBook: Book | null;
  setCurrentBook: React.Dispatch<React.SetStateAction<Book | null>>;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const BookProvider = ({ children }: { children: ReactNode }) => {
  const [currentBook, setCurrentBook] = useState<Book | null>(null);

  const { slug } = useParams(); // Получаем slug через useParams

  // Если slug не существует, мы не выполняем запрос
  const { data, error, loading } = useQuery(GET_BOOK_BY_SLUG, {
    variables: { slug: slug as string }, // Убедитесь, что slug передан как строка
    skip: !slug, // Пропускаем запрос, если slug отсутствует
  });

  // Когда данные получены, устанавливаем книгу в контекст
  useEffect(() => {
    if (data) {
      setCurrentBook(data.getBookBySlug); // Устанавливаем книгу в контекст
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <BookContext.Provider value={{ currentBook, setCurrentBook }}>
      {children}
    </BookContext.Provider>
  );
};

export const useBook = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error("useBook must be used within a BookProvider");
  }
  return context;
};