"use client";

import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "@/app/GraphqlOnClient/queries/bookQueries";
import styles from "./AllBooks.module.css"; 
import { Book } from "@/app/types/bookTypes";
import Link from "next/link";
import Image from "next/image";
import bookcase from "@/app/images/bookcase.svg"
import SmallWindow from "./SmallWindow";
import leftshelf from "@/app/images/left-books-shelf.svg"
import rightshelf from "@/app/images/right-books-shelf.svg"

export default function Books() {
  const { loading, error, data } = useQuery(GET_BOOKS, {
    pollInterval: 10000,
  });

  if (loading) return <p className={styles.loading}>Loading books...</p>;
  if (error) return <p className={styles.error}>Error: {error.message}</p>;

  return (
<div className={styles["books-page-container"]}>
  <div className={styles["shelves-window"]}>
    <div className={styles["left-shelf"]}>
      <Image src={leftshelf} alt="left-shelf" className={styles["left-books-shelf"]} />
    </div>
    <SmallWindow/>
    <div className={styles["right-shelf"]}>
    <Image src={rightshelf} alt="right-shelf" className={styles["right-books-shelf"]} />
    </div>
  </div>

    <div className={styles["books-filter-bookcase"]}>

    
      <div className={styles["filter-container"]}>
        Filter
      </div>


<div className={styles["books-container"]}>
    <div className={styles.container}>
      <h1 className={styles["welcome-text"]}>Welcome to the library!</h1>
      <div className={styles.bookList}>
        {data.getBooks.map((book: Book) => (
          <div key={book.id} className={styles.bookCard}>

            <div className={styles["book-composition"]}>
            <div className={styles.cover}></div>

            <div>
          <Link href={`/allpages/books/${book.slug}`}>
            <h2>{book.title}</h2>
            </Link>
            <p>{book.slug}</p>
            <p className={styles.annotation}>{book?.annotation || "No annotation"}</p>
            <p><strong>Author:</strong> {book?.author.username}</p>
            <p><small>{new Date(book.createdAt).toLocaleDateString()}</small></p>
            </div>
            </div>
            
          </div>
        ))}
      </div>
    </div>
    </div>

    <div className={styles["bookcase-container"]}>
<Image src={bookcase} alt="bookcase" className={styles["bookcase-image"]}/>
    </div>
    

    </div>
    </div>
  );
}
