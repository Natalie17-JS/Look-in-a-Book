"use client";

import { useQuery } from "@apollo/client";
import { GET_AUTHOR_BOOKS } from "@/app/GraphqlOnClient/queries/bookQueries";
import { useUser } from "@/app/context/authContext";
import { Book } from "@/app/types/bookTypes";
import Link from "next/link";
import styles from "./MyBooks.module.css"

const AuthorBooks = () => {
    const { user, loading: userLoading } = useUser();

    if (userLoading) return <p>Loading user...</p>;
    if (!user) return <p>You must be logged in to view books.</p>; // Проверяем авторизацию

    const accessToken = localStorage.getItem("token");
    const { loading, error, data } = useQuery(GET_AUTHOR_BOOKS, {
        context: {
            headers: {
              Authorization: accessToken ? `Bearer ${accessToken}` : "", 
            },
          }
        //skip: !user, // Пропускаем запрос, если нет пользователя
    });

    if (loading) return <p>Loading books...</p>;
    if (error) return <p>Error loading books</p>;

    return (
  <div>
    <h1>My Books</h1>
    {data?.getMyBooks?.length > 0 ? (
      <ul className={styles.books}>
        {data.getMyBooks.map((book: Book) => (
          <li className={styles.book} key={book.id}>
            <Link style={{textDecoration: "none"}} href={`/allpages/profile/my-books/${book.slug}`}>
              <div className={styles.bookInner}>
          <h2 className={styles.bookTitle}>{book.title}</h2>
        </div>
            </Link>
          </li>
        ))}
      </ul>
    ) : (
      <p>No books</p>
    )}
  </div>
);
}

export default AuthorBooks;
