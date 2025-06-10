// app/allpages/books/[slug]/read/page.tsx

"use client"

import { GET_CHAPTERS_BY_BOOKSLUG} from "@/app/GraphqlOnClient/queries/chapterQueries"
import BookReader from "./BookReader"
import { useQuery } from "@apollo/client";
import { ChaptersData } from "@/app/types/chapterTypes";
import { useBook } from "@/app/context/bookContext";
import { useSearchParams } from 'next/navigation';

export default function BookReaderPage() {
  const {currentBook} = useBook()
  const slug = currentBook?.slug;
   const searchParams = useSearchParams();
  
      const { loading, error, data } = useQuery<ChaptersData>(GET_CHAPTERS_BY_BOOKSLUG, {
          skip: !slug, // Пропускаем запрос, если book slug отсутствует
          variables: { slug }, // Передаём book slug в запрос
      })
      
  if (!slug) return <p>Select a book to view chapters.</p>;
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error.message}</p>;

      // Получаем главы из данных, если они есть
  const chapters = data?.getChaptersByBookSlug || [];

  // Если есть query-параметр стартовой страницы:
 const startPage = Number(searchParams.get('start')) || 0;



  return (
    <div style={{backgroundColor: "gray"}}>
      <BookReader chapters={chapters} bookSlug={slug} startPage={startPage} />
    </div>
  );
}
