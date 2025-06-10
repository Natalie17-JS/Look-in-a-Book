'use client';

import HTMLFlipBook from "react-pageflip";
import { useEffect, useRef, useState } from "react";
import { Chapter } from "@/app/types/chapterTypes";
import styles from "./Reader.module.css"

interface BookReaderProps {
  chapters: Chapter[];
  bookSlug: string;
  startPage?: number;
}

interface Page {
  title: string | null;
  content: string;
}
function BookReader({ chapters, bookSlug, startPage = 0 }: BookReaderProps) {
  const flipBook = useRef(null);

  // Функция для разбивки текста на страницы по 100 символов
  const splitContentIntoPages = (text: string, charsPerPage = 100): string[] => {
    const pages: string[] = [];
    for (let i = 0; i < text.length; i += charsPerPage) {
      pages.push(text.slice(i, i + charsPerPage));
    }
    return pages;
  };

  // Собираем массив страниц — каждая страница содержит часть текста и заголовок главы (только на первой странице главы)
const pages: Page[] = [];

  chapters.forEach(chapter => {
    const chapterPages = splitContentIntoPages(chapter.content, 100);
    chapterPages.forEach((pageContent, idx) => {
      pages.push({
        title: idx === 0 ? chapter.title : null, // заголовок только на первой странице главы
        content: pageContent,
      });
    });
  });

  return (
     <>
                <button onClick={() =>
                    flipBook.current?.pageFlip().flipNext()}>Next page</button>
    <HTMLFlipBook
      width={550}
      height={733}
      size="stretch"
      ref={flipBook}
      maxShadowOpacity={0.5}
      showCover={true}
      minWidth={315}
            maxWidth={1000}
            minHeight={400}
            maxHeight={1533}
      startPage={startPage}
      showPageCorners
  mobileScrollSupport={true}
      className={styles.bookreader}
    >
      {pages.map((page, index) => (
        <div key={index} className="page" style={{ padding: 20 }}>
          {page.title && <h2>{page.title}</h2>}
          <p style={{ whiteSpace: 'pre-wrap' }}>{page.content}</p>
           <span className="page-number">{index + 1}</span>
        </div>
      ))}

       <button onClick={() =>
                    flipBook.current.pageFlip().flipPrev()}>Prev page</button>
    </HTMLFlipBook>
    </>
  );
}

export default BookReader;


/*import React, { useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { PageFlip } from "page-flip";

interface HTMLFlipBookElement {
  getPageFlip: () => PageFlip;
}

type Chapter = {
  title: string;
  content: string;
};

type PageData = {
  title: string | null;
  content: string;
};

interface BookReaderProps {
  chapters: Chapter[];
  bookSlug: string;
  startPage?: number;
}

interface BookReaderState {
  page: number;
  totalPage: number;
  state: string;
  orientation: string;
}

class BookReader extends React.Component<BookReaderProps, BookReaderState> {
  //flipBook = React.createRef<HTMLFlipBook>();
  //flipBook = useRef<InstanceType<typeof HTMLFlipBook> | null>(null);
  flipBook = React.createRef<HTMLFlipBookElement>();

  constructor(props: BookReaderProps) {
    super(props);
    this.state = {
      page: props.startPage || 0,
      totalPage: 0,
      state: "read",
      orientation: "portrait",
    };
  }

  componentDidMount() {
    if (this.flipBook) {
      const pageCount = this.flipBook.getPageFlip().getPageCount();
      this.setState({ totalPage: pageCount });
    }
  }

  handleFlip = (e: any) => {
    this.setState({ page: e.data });
  };

  handleOrientationChange = (e: any) => {
    this.setState({ orientation: e.data });
  };

  handleStateChange = (e: any) => {
    this.setState({ state: e.data });
  };

  nextPage = () => {
    this.flipBook?.getPageFlip().flipNext();
  };

  prevPage = () => {
    this.flipBook?.getPageFlip().flipPrev();
  };

  // Разбивка глав на страницы по 100 символов
  splitContentIntoPages = (text: string, charsPerPage = 100): string[] => {
    const pages: string[] = [];
    for (let i = 0; i < text.length; i += charsPerPage) {
      pages.push(text.slice(i, i + charsPerPage));
    }
    return pages;
  };

  // Подготовка всех страниц
  getAllPages = (): PageData[] => {
    const pages: PageData[] = [];

    this.props.chapters.forEach((chapter) => {
      const chapterPages = this.splitContentIntoPages(chapter.content);
      chapterPages.forEach((content, index) => {
        pages.push({
          title: index === 0 ? chapter.title : null,
          content,
        });
      });
    });

    return pages;
  };

  render() {
    const pages = this.getAllPages();

    return (
      <div>
        <HTMLFlipBook
          width={500}
          height={700}
          size="stretch"
          minWidth={315}
          maxWidth={1000}
          minHeight={400}
          maxHeight={1533}
          maxShadowOpacity={0.5}
          showCover={false}
          showPageCorners
          mobileScrollSupport={true}
          onFlip={this.handleFlip}
          onChangeOrientation={this.handleOrientationChange}
          onChangeState={this.handleStateChange}
          className="demo-book"
          ref={(el) => (this.flipBook = el)}
          startPage={this.props.startPage || 0}
        >
          {pages.map((page, index) => (
            <div key={index} className="page">
              {page.title && <h2>{page.title}</h2>}
              <p style={{ whiteSpace: "pre-wrap" }}>{page.content}</p>
              <span className="page-number">{index + 1}</span>
            </div>
          ))}
        </HTMLFlipBook>

        <div className="controls">
          <button onClick={this.prevPage}>Previous</button>
          <span>
            Page {this.state.page + 1} of {this.state.totalPage}
          </span>
          <button onClick={this.nextPage}>Next</button>
        </div>

        <div className="status">
          State: <i>{this.state.state}</i>, Orientation:{" "}
          <i>{this.state.orientation}</i>
        </div>

        <style jsx>{`
          .page {
            position: relative;
            background: white;
            border: 1px solid #ccc;
            width: 100%;
            height: 100%;
            padding: 20px;
            box-sizing: border-box;
          }

          .page-number {
            position: absolute;
            bottom: 10px;
            right: 15px;
            font-size: 12px;
            color: gray;
          }

          .controls {
            margin-top: 20px;
            display: flex;
            justify-content: center;
            gap: 10px;
            align-items: center;
          }

          .status {
            text-align: center;
            margin-top: 10px;
            font-size: 14px;
            color: #666;
          }
        `}</style>
      </div>
    );
  }
}

export default BookReader;

*/