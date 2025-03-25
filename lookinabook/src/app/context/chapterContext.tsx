"use client";

import { useEffect, useState, createContext, useContext, ReactNode } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation"; // Получаем ID главы из URL
import { GET_CHAPTER_BY_ID } from "@/app/GraphqlOnClient/queries/chapterQueries";
import { Chapter } from "@/app/types/chapterTypes";

interface ChapterContextType {
  currentChapter: Chapter | null;
  setCurrentChapter: React.Dispatch<React.SetStateAction<Chapter | null>>;
}

const ChapterContext = createContext<ChapterContextType | undefined>(undefined);

export const ChapterProvider = ({ children }: { children: ReactNode }) => {
  const [currentChapter, setCurrentChapter] = useState<Chapter | null>(null);
  const { id } = useParams(); // Получаем ID главы из URL

  const { data, error, loading } = useQuery(GET_CHAPTER_BY_ID, {
    variables: { id: id as string }, 
    skip: !id, // Не делаем запрос, если нет ID
  });

  // Устанавливаем главу в контекст после загрузки
  useEffect(() => {
    if (data?.getChapterById) {
      setCurrentChapter(data.getChapterById);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ChapterContext.Provider value={{ currentChapter, setCurrentChapter }}>
      {children}
    </ChapterContext.Provider>
  );
};

export const useChapter = () => {
  const context = useContext(ChapterContext);
  if (!context) {
    throw new Error("useChapter must be used within a ChapterProvider");
  }
  return context;
};
