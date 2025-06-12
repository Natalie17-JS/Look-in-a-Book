'use client';

import HTMLFlipBook from "react-pageflip";
import { useEffect, useMemo, useRef, useState } from "react";
import { Chapter } from "@/app/types/chapterTypes";
import styles from "./Reader.module.css"
import PageCover from "./Pagecover";

interface BookReaderProps {
  chapters: Chapter[];
  bookSlug: string;
  bookTitle: string;
  startPage?: number;
}

interface Page {
  title: string | null;
  content: string;
}
function BookReader({ chapters, bookSlug, bookTitle, startPage = 0 }: BookReaderProps) {
  const flipBook = useRef(null);

   const [currentPage, setCurrentPage] = useState(startPage);
   const [totalpages, setTotalpages] = useState<Page[]>([]);

  const STORAGE_KEY = `bookmark-${bookSlug}`;

  // Обновление localStorage при смене страницы
  const handlePageChange = (e: any) => {
    const page = e.data; // это текущая страница
    setCurrentPage(page);
    localStorage.setItem(STORAGE_KEY, String(page));
  };


 /* const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
   useEffect(() => {
    const updateSize = () => {
      const vh = window.innerHeight;
      const height = vh * 0.75; // 75vh
      const width = height * 0.75; // 3:4 соотношение
      setDimensions({ width, height });
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);*/

  // Функция для разбивки текста на страницы по 100 символов
  const splitContentIntoPages = (text: string, charsPerPage = 100): string[] => {
    const pages: string[] = [];
    for (let i = 0; i < text.length; i += charsPerPage) {
      pages.push(text.slice(i, i + charsPerPage));
    }
    return pages;
  };


  // Собираем массив страниц — каждая страница содержит часть текста и заголовок главы (только на первой странице главы)
/*const pages: Page[] = [];
const totalPages = pages.length;


  chapters.forEach(chapter => {
    const chapterPages = splitContentIntoPages(chapter.content, 100);
    chapterPages.forEach((pageContent, idx) => {
      pages.push({
        title: idx === 0 ? chapter.title : null, // заголовок только на первой странице главы
        content: pageContent,
      });
    });
  });*/
  const pages: Page[] = useMemo(() => {
  const allPages: Page[] = [];

  chapters.forEach(chapter => {
    const chapterPages = splitContentIntoPages(chapter.content, 100);
    chapterPages.forEach((pageContent, idx) => {
      allPages.push({
        title: idx === 0 ? chapter.title : null,
        content: pageContent,
      });
    });
  });

  return allPages;
}, [chapters]);

const totalPages = pages.length;

const numberOfCovers = 2; // PageCover в начале и в конце
const actualTotalPages = pages.length + numberOfCovers;

const contentPage = currentPage - 1; // вычитаем первую обложку

let progress = 0;

if (currentPage === 0) {
  // на первой обложке — 0%
  progress = 0;
} else if (currentPage === actualTotalPages - 1) {
  // на последней обложке — 100%
  progress = 100;
} else if (contentPage >= 0 && contentPage < pages.length) {
  // внутри контента считаем прогресс по страницам
  progress = Math.round(((contentPage + 1) / pages.length) * 100);
} else {
  progress = 0; // запасной вариант
}


  return (
    <>
     <div className={styles.readerContainer}>
                <button onClick={() =>
                    flipBook.current?.pageFlip().flipNext()}>Next page</button>

                   
    <HTMLFlipBook
    /* width={dimensions.width}
  height={dimensions.height}*/
      width={550}
     height={633}
      size="fixed"
      ref={flipBook}
      maxShadowOpacity={0.5}
      showCover={true}
      minWidth={315}
            maxWidth={1000}
            minHeight={400}
            maxHeight={733}
      startPage={startPage}
      showPageCorners
  mobileScrollSupport={true}
      className={styles.bookreader}
      onFlip={handlePageChange}
    >
       <PageCover>{bookTitle}</PageCover>

      {pages.map((page, index) => (
        <div key={index} className={styles.page} style={{ padding: 20 }}>
          {page.title && <h2>{page.title}</h2>}
          <p style={{ whiteSpace: 'pre-wrap' }}>{page.content}</p>
           <span className={styles["page-number"]}>{index + 1}</span>
        </div>
      ))}

   

                     <PageCover>The end</PageCover>
    </HTMLFlipBook>

    
     <button onClick={() =>
                    flipBook.current.pageFlip().flipPrev()}>Prev page</button>          

    </div>

     <div style={{ textAlign: "center", width: "30%", margin: "5rem auto 0 auto" }}>
  <div style={{ marginTop: "1rem", textAlign: "center" }}>
  <div style={{
    height: "10px",
    width: "80%",
    margin: "0 auto 8px",
    background: "#eee",
    borderRadius: "5px",
    overflow: "hidden"
  }}>
    <div style={{
      height: "100%",
      width: `${progress}%`,
      background: "#ff9900",
      transition: "width 0.3s"
    }}></div>
  </div>
  <div>
    Page {currentPage + 1} of {totalPages+1} ({progress}%)
  </div>
</div>

</div>

</>

    
  );
}

export default BookReader;

