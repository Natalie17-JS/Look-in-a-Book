'use client';

import HTMLFlipBook from "react-pageflip";
import { useEffect, useMemo, useRef, useState } from "react";
import { Chapter } from "@/app/types/chapterTypes";
import styles from "./Reader.module.css"
import PageCover from "./Pagecover";
import Link from "next/link";

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
const [pagetheme, setPagetheme] = useState<'light' | 'dark'>('light');

   const [currentPage, setCurrentPage] = useState(startPage);
   const [totalpages, setTotalpages] = useState<Page[]>([]);

   const switchToLight = () => setPagetheme('light');
const switchToDark = () => setPagetheme('dark');
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
  const splitContentIntoPages = (text: string, charsPerPage = 2100): string[] => {
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

  // Добавляем пустую страницу после обложки
  allPages.push({
    title: null,
    content: '', // пустая страница
  });

  /*chapters.forEach(chapter => {
    const chapterPages = splitContentIntoPages(chapter.content, 2100);
    chapterPages.forEach((pageContent, idx) => {
      allPages.push({
        title: idx === 0 ? chapter.title : null,
        content: pageContent,
      });
    });
  });*/
  chapters.forEach((chapter, chapterIndex) => {
  const defaultPageSize = 2000;
  const firstPageSize = 1200;

  let remainingText = chapter.content;

  // Если это первая глава — первая страница будет с меньшим количеством текста
  if (chapterIndex === 0) {
    const firstPageContent = remainingText.slice(0, firstPageSize);
    allPages.push({
      title: chapter.title,
      content: firstPageContent,
    });
    remainingText = remainingText.slice(firstPageSize);

    const otherPages = splitContentIntoPages(remainingText, defaultPageSize);
    otherPages.forEach((pageContent) => {
      allPages.push({
        title: null,
        content: pageContent,
      });
    });
  } else {
    const chapterPages = splitContentIntoPages(remainingText, defaultPageSize);
    chapterPages.forEach((pageContent, idx) => {
      allPages.push({
        title: idx === 0 ? chapter.title : null,
        content: pageContent,
      });
    });
  }
});


    // 2. Пустая страница перед финальной обложкой
  allPages.push({
    title: null,
    content: '',
  });

  return allPages;
}, [chapters]);

const numberOfCovers = 2; // одна обложка спереди, одна сзади
const numberOfEmptyPages = 2; // пустая после обложки и пустая перед "The End"

const actualTotalPages = pages.length + numberOfCovers; // все страницы в книге

const contentPagesCount = pages.length - numberOfEmptyPages; // только текстовые страницы

const contentPage = currentPage - 2; // сдвигаем индекс, потому что первые 2 страницы — не контент

let progress = 0;

if (currentPage === 0) {
  // На первой обложке
  progress = 0;
} else if (currentPage === actualTotalPages - 1) {
  // На последней обложке "The End"
  progress = 100;
} else if (contentPage >= 0 && contentPage < contentPagesCount) {
  // Внутри контента
  progress = Math.round(((contentPage + 1) / contentPagesCount) * 100);
} else {
  progress = 0; // запасной случай
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

     {/* {pages.map((page, index) => (
        <div key={index} className={styles.page} style={{ padding: 20 }}>
          {page.title && <h2>{page.title}</h2>}
          <p style={{ whiteSpace: 'pre-wrap' }}>{page.content}</p>
           <span className={styles["page-number"]}>{index + 1}</span>
        </div>
      ))}*/} 
      {pages.map((page, index) => {
  const isFirstContentPage = index === 1; // первая текстовая страница (обложка и пустая — index 0 и 1)

  return (
    <div key={index} className={`${styles.page} ${pagetheme === 'light' ? styles.lightPage : styles.darkPage}`} style={{ padding: 20 }}>
      {isFirstContentPage ? (
        <div style={{
          marginTop: '30%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <div style={{
            width: '70%',
            height: '2px',
            backgroundColor: '#555',
            marginBottom: '1.5rem'
          }} />
          <div style={{ textAlign: 'left', width: '100%' }}>
            {page.title && <h2>{page.title}</h2>}
            <p style={{ whiteSpace: 'pre-wrap' }}>{page.content}</p>
          </div>
        </div>
      ) : (
        <>
          {page.title && <h2>{page.title}</h2>}
          <p style={{ whiteSpace: 'pre-wrap' }}>{page.content}</p>
        </>
      )}
      <span className={styles["page-number"]}>{index + 1}</span>
    </div>
  );
})}


   

                     <PageCover>The end</PageCover>
    </HTMLFlipBook>

    
     <button onClick={() =>
                    flipBook.current.pageFlip().flipPrev()}>Prev page</button>          

    </div>

<div style={{display: "flex"}}>
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
    Page {currentPage + 1} of {actualTotalPages} ({progress}%)
  </div>

  <div style={{ marginBottom: '1rem' }}>
  <button onClick={switchToLight} style={{ marginRight: '8px' }}>
    light
  </button>
  <button onClick={switchToDark}>
    Dark
  </button>
</div>

</div>

</div>



<Link href={`/allpages/books/${bookSlug}/read`}>
<button>Back</button>
</Link>

</div>

</>

    
  );
}

export default BookReader;

