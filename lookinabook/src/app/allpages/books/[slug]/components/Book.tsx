// components/BookContent.tsx
"use client";

import Image from "next/image";
import flowers from "@/app/images/flowers-on-shelf-1.svg";
import uzor from "@/app/images/zavitushka.svg";
import plakat from "@/app/images/annot-plakat-night.svg";
import styles from "./GetBook.module.css";
import Link from "next/link";
import DeleteBookButton from "@/app/allpages/profile/my-books/[slug]/edit-book/components/DeleteBookBtn";
import PublishBookButton from "@/app/allpages/profile/my-books/[slug]/edit-book/components/PublishBook";
import { useUser } from "@/app/context/authContext";

type BookContentProps = {
  book?: any;
  showEditActions?: boolean; // <- важный пропс
};

export default function BookContent({ book, showEditActions = false }: BookContentProps) {
  if (!book) return <p>Loading...</p>;
  const { user } = useUser();  // Получаем пользователя из контекста
  const isAuthor = user?.id === book?.author?.id;  // Проверка, является ли книга авторской

  const { title, annotation, genre, writingStatus, publishStatus, author, slug } = book;

  // Генерируем правильный путь на основе того, является ли книга авторской
  const chaptersLink = isAuthor
    ? `/allpages/profile/my-books/${book.slug}/chapters`  // Путь для книги автора
    : `/allpages/books/${book.slug}/chapters`;  // Путь для публичной книги

  return (
  
    

      <div className={styles["table-container"]}>
        <div className={styles["things-on-table"]}>
          <div className={styles.cover}></div>

          <div className={styles["flower-container"]}>
            <Image src={flowers} alt="flowers" className={styles["flowers-image"]} />
          </div>

          <div className={styles["book-info-container"]}>
            <div className={styles["book-title"]}>
              <h1 className={styles.title}>{title}</h1>
              <Image src={uzor} alt="uzor" className={styles["uzor-image"]} />
            </div>

            <div className={styles["book-main-info"]}>
              <p>Author: {author?.username || "Unknown"}</p>
              <p>Genre: {genre}</p>
              <p>Status: {writingStatus}</p>
            </div>

            <div className={styles["book-annotation"]}>
              <Image src={plakat} alt="plakat" className={styles["plakat-image"]} />
              <p className={styles.annotation}>{annotation || "No annotation available"}</p>
            </div>
          </div>
        </div>

        <div className={styles.table}>
          <div className={styles["table-shelf"]}></div>
          <div className={styles["table-shelf"]}>
            <div className={styles["book-actions"]}>
              {showEditActions && (
                <>
                  <Link
                    href={`/allpages/profile/edit-book/${slug}`}
                    className={styles["edit-button"]}
                  >
                    Edit book
                  </Link>
                  <DeleteBookButton />
                  {publishStatus === "DRAFT" && <PublishBookButton />}
                </>
              )}
              <div className={styles["chapters-button"]}>
                <Link
                  href={chaptersLink}
                  className={styles["chapters-link"]}
                >
                  Chapters
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
