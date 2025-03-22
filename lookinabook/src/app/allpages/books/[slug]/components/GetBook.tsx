"use client";


import { useQuery } from "@apollo/client";
import { GET_BOOK_BY_SLUG } from "@/app/GraphqlOnClient/queries/bookQueries";
import Image from "next/image";
import window from "@/app/images/small-window.svg"
import flowers from "@/app/images/flowers-on-shelf-1.svg"
import uzor from "@/app/images/zavitushka.svg"
import plakat from "@/app/images/annot-plakat-night.svg"
//import { Book } from "@/app/types/bookTypes";
import styles from "./GetBook.module.css"
import { useUser } from "@/app/context/authContext";
import Link from "next/link";
import DeleteBookButton from "@/app/allpages/profile/edit-book/[slug]/components/DeleteBookBtn";
import { useBook } from "@/app/context/bookContext";
import PublishBookButton from "@/app/allpages/profile/edit-book/[slug]/components/PublishBook";
//import { useRouter } from "next/router";


export default function Book() {
  const { currentBook } = useBook(); // Получаем текущую книгу из контекста
  const { user } = useUser();
  //const router = useRouter();
  //const { slug } = router.query;

  // Если книга не загружена, показываем загрузку
  if (!currentBook) return <p>Loading...</p>;

  const slug = currentBook.slug;

  const { title, annotation, genre, writingStatus, publishStatus, author } = currentBook;

  // Определяем, принадлежит ли книга текущему пользователю
  const isAuthor = user?.id === author?.id;
  // Проверяем, является ли книга черновиком
  const isDraft = publishStatus === "DRAFT";

  return (
<div className={styles["table-outer-container"]}>

      <div className={styles["table-container"]}>
        
        <div className={styles["things-on-table"]}>
          
          <div className={styles["shelf-and-cover"]}>
            <div className={styles["small-shelf"]}>
              <Image src={flowers} alt="flowers" className={styles["flowers-image"]} />
            </div>
          <div className={styles.cover}></div>
          </div>
          
            <Image src={window} alt="Small window" className={styles["window-image"]}/>
       
          <div className={styles["book-info"]}>
            <div className={styles["book-title"]}>
            <h1 className={styles.title}>{title}</h1>
            <Image src={uzor} alt="uzor" className={styles["uzor-image"]}/>
            </div>
            <div className={styles["book-main-info"]}>
            <p>Author: {author?.username || "Unknown"}</p>
            <p>Genre: {genre}</p>
            <p>Status: {writingStatus}</p>
            </div>
            <div className={styles["book-annotation"]}>
            <Image src={plakat} alt="plakat" className={styles["plakat-image"]}/>
            <p className={styles.annotation}>{annotation || "No annotation available"}</p>
            </div>
          </div>
        </div>

      <div className={styles.table}>
        <div className={styles["table-shelf"]}></div>
        <div className={styles["table-shelf"]}>
        <div className={styles["book-actions"]}>
        {isAuthor && (
          <>
            <Link href={`/allpages/profile/edit-book/${slug}`} className={styles["edit-button"]}>
              Edit book
            </Link>
            <DeleteBookButton />
            </>
          )}
          {isDraft && isAuthor && 
          <PublishBookButton/>
            }
            <div className={styles["chapters-button"]}>
              <Link href={`/allpages/books/${slug}/chapters`} className={styles["chapters-link"]}>
                Chapters
              </Link>
              
            </div>
        </div>
        </div>
      </div>

      </div>

    </div>

   
  );
}

