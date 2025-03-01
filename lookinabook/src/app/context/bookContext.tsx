
import { createContext, useContext, useState, ReactNode } from "react";
import { Book } from "@/app/types/bookTypes";

interface BookContextType {
  book: Book | null;
  setBook: (book: Book | null) => void;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const useBook = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error("useBook must be used within a BookProvider");
  }
  return context;
};

interface BookProviderProps {
  children: ReactNode;
}

export const BookProvider = ({ children }: BookProviderProps) => {
  const [book, setBook] = useState<Book | null>(null);

  return (
    <BookContext.Provider value={{ book, setBook }}>
      {children}
    </BookContext.Provider>
  );
};
