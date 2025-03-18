"use client"

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { UPDATE_BOOK_BY_SLUG } from "@/app/GraphqlOnClient/mutations/bookMutations";
import { EditBookData, Book, Category, Genre, WStatus, PStatus } from "@/app/types/bookTypes";
import styles from "@/app/allpages/profile/new-book/components/BookForm.module.css"
import { useBook } from "@/app/context/bookContext";
import DeleteBookButton from "./DeleteBookBtn";
import { useParams } from "next/navigation";


export default function EditBookForm() {
  const params = useParams(); // Получаем slug
  console.log("Params:", params); 
  const { currentBook, setCurrentBook } = useBook();
  const [errorMessage, setErrorMessage] = useState("");

  const bookSlug = params?.slug;
  console.log("Book in context:", currentBook);
  console.log("Looking for book with slug:", bookSlug);
  // Находим редактируемую книгу в массиве книг
  

  if (!currentBook) {
    return <p>Book not found or not selected for editing.</p>;
  }

  useEffect(() => {
    if (!currentBook || currentBook.slug !== bookSlug) {
      console.log("Book in context does not match the slug. Possible missing data.");
    }
  }, [bookSlug, currentBook]);
  

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<EditBookData>();

  const accessToken = localStorage.getItem("token");

  const [updateBook] = useMutation<{ updateBook: Book }>(UPDATE_BOOK_BY_SLUG, {
    context: {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    },
  });

  useEffect(() => {
    reset({
      title: currentBook.title,
      annotation: currentBook.annotation,
      category: currentBook.category,
      genre: currentBook.genre,
      writingStatus: currentBook.writingStatus,
      publishStatus: currentBook.publishStatus,
    });
  }, [currentBook, reset]);

  const onSubmit = async (data: EditBookData) => {
    try {
      const updatedBook = await updateBook({
        variables: {
          //id: book.id,
          slug: currentBook.slug,
          title: data.title,
          annotation: data.annotation || null,
          category: data.category,
          genre: data.genre,
          writingStatus: data.writingStatus,
          publishStatus: data.publishStatus,
        },
      });

      if (updatedBook.data?.updateBook) {
        // Обновляем книг
        setCurrentBook(updatedBook.data.updateBook); // Обновляем контекст
        //setBooks(books.map((b) => (b.id === book.id ? updatedBook.data.updateBook : b)));
        //setBooks(books.map((b) => (b.slug === book.slug ? updatedBook.data.updateBook : b)));
        //setBooks(books.map((b) => (b.slug === book.slug ? updatedBook.data.updateBook ?? b : b)));
    

        console.log("Updated book:", updatedBook.data.updateBook);
      }
    } catch (error) {
      setErrorMessage("Something went wrong.");
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles["create-book-form-container"]}>
      <h2>Edit Book</h2>
      {errorMessage && <p className={styles.errormessage}>{errorMessage}</p>}
      <form className={styles["create-book-form"]} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Title:</label>
          <input type="text" {...register("title", { required: "Title is required" })} className={styles["create-book-input"]} />
          {errors.title && <p>{errors.title.message}</p>}
        </div>
        <div>
          <label>Annotation:</label>
          <textarea {...register("annotation")} className={styles.textarea} />
        </div>
        <div>
          <label>Category:</label>
          <select {...register("category", { required: "Category is required" })} className={styles["create-book-select"]}>
            {Object.values(Category).map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Genre:</label>
          <select {...register("genre", { required: "Genre is required" })} className={styles["create-book-select"]}>
            {Object.values(Genre).map((gen) => (
              <option key={gen} value={gen}>{gen}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Status:</label>
          <select {...register("writingStatus", { required: "Writing Status is required" })} className={styles["create-book-select"]}>
            {Object.values(WStatus).map((ws) => (
              <option key={ws} value={ws}>{ws}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Publish Status:</label>
          <select {...register("publishStatus", { required: "Publish Status is required" })} className={styles["create-book-select"]}>
            {Object.values(PStatus).map((ps) => (
              <option key={ps} value={ps}>{ps}</option>
            ))}
          </select>
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Update Book"}
        </button>

        <DeleteBookButton />
      </form>
    </div>
  );
}
