import { createContext, useContext, useState, ReactNode } from "react";
import { Book } from "@/app/types/bookTypes";

interface BookContextType {
  currentBook: Book | null;
  setCurrentBook: React.Dispatch<React.SetStateAction<Book | null>>;
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
  const [currentBook, setCurrentBook] = useState<Book | null>(null);

  return (
    <BookContext.Provider value={{ currentBook, setCurrentBook }}>
      {children}
    </BookContext.Provider>
  );
};
