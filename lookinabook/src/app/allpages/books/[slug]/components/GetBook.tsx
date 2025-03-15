"use client";

import { useParams } from "next/navigation";
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

export default function Book() {
  const {user} =useUser()
  const params = useParams(); // Получаем slug
  console.log("Params:", params); 

  const slug = params?.slug; // Достаем slug
  if (!slug) return <p>Loading...</p>; // Защита от undefined

  const { data, loading, error } = useQuery(GET_BOOK_BY_SLUG, {
    skip: !slug, // Не делаем запрос, если slug нет
    variables: { slug },
    onCompleted: (data) => console.log("Book data:", data), // ✅ Логируем ответ
  onError: (err) => console.error("GraphQL Error:", err), // ✅ Логируем ошибку
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading book.</p>;

  console.log("Final data:", data); 

  // Проверяем, что data не undefined
  if (!data) {
    return <p>Book not found.</p>;
  }

  const { title, annotation, genre, writingStatus, publishStatus, author } = data.getBookBySlug;

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
            <Link href={`/allpages/profile/edit-book/${slug}`} className={styles["edit-button"]}>
              Edit book
            </Link>
          )}
          {isDraft && isAuthor && <button className={styles["publish-button"]}>Publish</button>}
        </div>
        </div>
      </div>

      </div>

    </div>

   
  );
}

