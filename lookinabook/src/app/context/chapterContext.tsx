"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_CHAPTER_BY_ID } from "@/app/GraphqlOnClient/queries/chapterQueries";
import { Chapter } from "../types/chapterTypes";


interface ChapterContextType {
    chapter: Chapter | null;
    loading: boolean;
    error: string | null;
    setChapterId: (id: string) => void;
}

const ChapterContext = createContext<ChapterContextType | undefined>(undefined);

export const ChapterProvider = ({ children }: { children: React.ReactNode }) => {
    const [chapterId, setChapterId] = useState<string | null>(null);

    const { loading, error, data } = useQuery(GET_CHAPTER_BY_ID, {
        variables: { id: chapterId },
        skip: !chapterId, // Запрос выполняется только если есть ID
    });

    useEffect(() => {
        if (data?.getChapterById) {
            setChapterId(data.getChapterById.id);
        }
    }, [data]);

    return (
        <ChapterContext.Provider value={{ 
            chapter: data?.getChapterById || null, 
            loading, 
            error: error ? error.message : null,
            setChapterId 
        }}>
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
