"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { useUser } from "@/app/context/authContext";
import { CREATE_BOOK, UPDATE_BOOK } from "@/app/GraphqlOnClient/mutations/bookMutations";
import { CreateBookFormData, CreateBookData, EditBookData, Book } from "@/app/types/bookTypes";
import styles from "./BookForm.module.css"
import Link from "next/link";

export default function BookForm({ book = null, isEditing = false }: { book?: Book | null; isEditing?: boolean }) {
  const { user } = useUser();
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<CreateBookFormData>({
    defaultValues: {
      title: book?.title || "",
      annotation: book?.annotation || "",
    },
  });

  useEffect(() => {
    if (book) {
      setValue("title", book.title);
      setValue("annotation", book.annotation || "");
    }
  }, [book, setValue]);

  const [createBook] = useMutation<CreateBookData>(CREATE_BOOK);
  const [updateBook] = useMutation<EditBookData>(UPDATE_BOOK);

  const onSubmit = async (data: { title: string; annotation?: string }) => {
    if (!user) {
      setErrorMessage("You must be logged in.");
      return;
    }

    try {
      if (isEditing) {
        await updateBook({ variables: { id: book?.id, ...data } });
      } else {
        await createBook({ variables: data });
        reset();
      }
    } catch (error) {
      setErrorMessage("Something went wrong.");
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles["create-book-form-container"]}>
      <h2>{isEditing ? "Edit Book" : "Create a New Book"}</h2>

      {errorMessage && <p>{errorMessage}</p>}

      <form className={styles["create-book-form"]} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className={styles["create-book-input"]}
          />
          {errors.title && <p>{errors.title.message}</p>}
        </div>

        <div>
          <label>Annotation (optional):</label>
          <textarea
            {...register("annotation")}
            className={styles.textarea}
          />
        </div>

        {/* Стандартная обложка */}
        <div className={styles["book-cover"]}>
          Book Cover
        </div>

        <button
        className={styles["create-book-btn"]}
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (isEditing ? "Updating..." : "Creating...") : isEditing ? "Update Book" : "Create Book"}
        </button>
      </form>

      <Link href="/allpages/profile">
            <button>Back to profile</button>
            </Link>
    </div>
  );
}
