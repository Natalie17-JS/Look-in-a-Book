"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_BOOK } from "@/app/GraphqlOnClient/mutations/bookMutations";
import { useBook } from "@/app/context/bookContext";  
import { useRouter } from "next/navigation";
import styles from "@/app/allpages/profile/new-book/components/BookForm.module.css";

const DeleteBookButton = ({ bookSlug }: { bookSlug: string }) => {
  const { books, setBooks } = useBook();  
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Находим книгу в списке по slug
  const book = books.find((b) => b.slug === bookSlug);

  if (!book) {
    return <p>Book not found or not selected for deletion.</p>;
  }

  // Мутация для удаления книги
  const [deleteBook] = useMutation(DELETE_BOOK, {
    onCompleted: () => {
      // Обновляем список книг, убирая удалённую
      setBooks(books.filter((b) => b.slug !== book.slug));  
      router.push("/allpages/profile"); // Перенаправляем на страницу профиля
    },
    onError: (error) => {
      setErrorMessage("Failed to delete the book.");
      console.error("Error deleting book:", error);
    },
  });

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      setIsLoading(true);
      try {
        await deleteBook({ variables: { slug: book.slug } });
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
