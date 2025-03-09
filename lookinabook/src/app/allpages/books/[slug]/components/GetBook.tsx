"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@apollo/client";
import { GET_BOOK_BY_SLUG } from "@/app/GraphqlOnClient/queries/bookQueries";
import Image from "next/image";
import window from "@/app/images/small-window.svg"
import flowers from "@/app/images/flowers-on-shelf-1.svg"
//import { Book } from "@/app/types/bookTypes";
import styles from "./GetBook.module.css"

export default function Book() {
  const params = useParams(); // Получаем slug
  console.log("Params:", params); // Проверь в консоли

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

  console.log("Final data:", data); // 🔍 Проверяем, что приходит в data

  // Проверяем, что data не undefined
  if (!data) {
    return <p>Book not found.</p>;
  }

  const { title, annotation, author } = data.getBookBySlug;

  return (
    <div>
      <h1>Title: {title}</h1>
      <p>{annotation || "No annotation available"}</p>
      <p>Author: {author?.username || "Unknown"}</p>
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

          </div>
        </div>

      <div className={styles.table}>
        <div className={styles["table-shelf"]}></div>
        <div className={styles["table-shelf"]}></div>
      </div>

      </div>

    </div>

    </div>
  );
}

