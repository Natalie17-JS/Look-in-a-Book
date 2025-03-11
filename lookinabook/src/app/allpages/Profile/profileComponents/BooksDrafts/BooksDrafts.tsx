"use client";

import styles from "./BooksDrafts.module.css";
import { useQuery } from "@apollo/client";
import { GET_BOOK_DRAFTS } from "@/app/GraphqlOnClient/queries/bookQueries";
import { useTheme } from "@/app/context/themeContext";
import { useUser } from "@/app/context/authContext";
import { BookDraftsData } from "@/app/types/bookTypes";

const BooksDrafts = () => {
  const { user } = useUser();
  const { theme } = useTheme();
  const accessToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const { loading, error, data } = useQuery<BookDraftsData>(GET_BOOK_DRAFTS, {
    context: {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    },
  });

  if (loading) return <p className={styles.loading}>Loading book drafts...</p>;
  if (error) return <p className={styles.error}>Error: {error.message}</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Book Drafts</h2>
      {data?.getBookDrafts?.length ? (
        <ul className={styles.list}>
          {data.getBookDrafts?.map((book) => (
            <li key={book.id} className={styles.bookItem}>
              <h3 className={styles.bookTitle}>{book.title}</h3>
              <p className={styles.annotation}>{book.annotation || "No annotation"}</p>
              <p className={styles.author}>Author: {book.author.username}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noDrafts}>No drafts found.</p>
      )}
    </div>
  );
}
  

export default BooksDrafts;
