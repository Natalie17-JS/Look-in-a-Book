"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_BOOK_BY_SLUG } from "@/app/GraphqlOnClient/mutations/bookMutations";
import { useBook } from "@/app/context/bookContext";
import { useRouter, useParams } from "next/navigation";
import styles from "@/app/allpages/profile/new-book/components/BookForm.module.css";

const DeleteBookButton = () => {
  const params = useParams();
  const { currentBook, setCurrentBook } = useBook();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Находим книгу в списке по slug
  const bookSlug = params?.slug;
  console.log("Book in context:", currentBook);
  console.log("Looking for book with slug:", bookSlug);

  const accessToken = localStorage.getItem("token");

  // Мутация для удаления книги
  const [deleteBook] = useMutation(DELETE_BOOK_BY_SLUG, {
    context: {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    },
    onCompleted: () => {
      setCurrentBook(null);
      router.push("/allpages/profile"); // Перенаправляем на страницу профиля
    },
    onError: (error) => {
      setErrorMessage("Failed to delete the book.");
      console.error("Error deleting book:", error);
    },
  });

  // ✅ Теперь проверка книги идет ПОСЛЕ вызова всех хуков!
  if (!currentBook || currentBook.slug !== bookSlug) {
    return <p>Book not found or not selected for deletion.</p>;
  }

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      setIsLoading(true);
      try {
        await deleteBook({ variables: { slug: currentBook.slug } });
      } catch (error) {
        setErrorMessage("Something went wrong while deleting the book.");
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div>
      {errorMessage && <p className={styles.errormessage}>{errorMessage}</p>}
      <button
        onClick={handleDelete}
        disabled={isLoading}
        className={styles["delete-book-button"]}
      >
        {isLoading ? "Deleting..." : "Delete Book"}
      </button>
    </div>
  );
};

export default DeleteBookButton;
