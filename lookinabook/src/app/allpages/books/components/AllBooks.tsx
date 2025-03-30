"use client";

import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "@/app/GraphqlOnClient/queries/bookQueries";
import styles from "./AllBooks.module.css"; 
import { Book } from "@/app/types/bookTypes";
import Link from "next/link";

export default function Books() {
  const { loading, error, data } = useQuery(GET_BOOKS, {
    pollInterval: 10000,
  });

  if (loading) return <p className={styles.loading}>Loading books...</p>;
  if (error) return <p className={styles.error}>Error: {error.message}</p>;

  return (
    <div className={styles["books-and-filter"]}>
      <div className={styles["filter-container"]}>
        Filter
      </div>

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
  );
}
