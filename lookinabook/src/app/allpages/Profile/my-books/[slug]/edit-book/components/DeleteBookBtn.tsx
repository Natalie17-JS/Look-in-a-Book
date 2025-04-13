"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_BOOK_BY_SLUG } from "@/app/GraphqlOnClient/mutations/bookMutations";
import { useBook } from "@/app/context/bookContext";
import { useRouter, useParams } from "next/navigation";
import styles from "@/app/allpages/profile/new-book/components/BookForm.module.css";
import ConfirmModal from "@/app/confirm/Confirm";

type Props = {
  onDeleted?: () => void; 
};

const DeleteBookButton = ({ onDeleted }: Props) => {
  const params = useParams();
  const { currentBook, setCurrentBook } = useBook();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      if (onDeleted) {
        onDeleted(); // Вызываем переданный callback
      } else {
        router.push("/allpages/profile"); // Если нет callback, то редирект
      }
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
    setIsLoading(true);
    try {
      await deleteBook({ variables: { slug: currentBook.slug } });
      setIsModalOpen(false); // Закрываем модалку после удаления
    } catch (error) {
      setErrorMessage("Something went wrong while deleting the book.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {errorMessage && <p className={styles.errormessage}>{errorMessage}</p>}

      <button
        onClick={() => setIsModalOpen(true)}
        disabled={isLoading}
        className={styles["delete-book-button"]}
      >
        {isLoading ? "Deleting..." : "Delete Book"}
      </button>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Book"
        message="Are you sure you want to delete this book? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        danger
      />
    </div>
  );
};

export default DeleteBookButton;
