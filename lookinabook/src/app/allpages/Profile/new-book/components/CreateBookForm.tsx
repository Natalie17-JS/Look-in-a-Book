"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { CREATE_BOOK } from "@/app/GraphqlOnClient/mutations/bookMutations";
import { CreateBookFormData, CreateBookData, Category, Genre, WStatus, PStatus, Book } from "@/app/types/bookTypes";
import styles from "./BookForm.module.css";
import Link from "next/link";
import { useUser } from "@/app/context/authContext";
import { useBook } from "@/app/context/bookContext";

export default function CreateBookForm() {
  const { user } = useUser();
  const [errorMessage, setErrorMessage] = useState("");
  const { setBook } = useBook();
  
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<CreateBookFormData>({
    defaultValues: {
      title: "",
      annotation: "",
      category: Category.FICTION,
      genre: Genre.DRAMA,
      writingStatus: WStatus.ONGOING,
      publishStatus: PStatus.DRAFT,
    },
  });

  const accessToken = localStorage.getItem("token");

  const [createBook] = useMutation<{ createBook: Book }>(CREATE_BOOK, {
    context: {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : "", 
      },
    },
  });

  const onSubmit = async (data: CreateBookFormData) => {
    if (!user) {
      setErrorMessage("You must be logged in.");
      return;
    }

    try {
      const newBook = await createBook({
        variables: {
          title: data.title,
          annotation: data.annotation || null,
          category: data.category,
          genre: data.genre,
          writingStatus: data.writingStatus,
          publishStatus: data.publishStatus,
          createdAt: new Date(),
          //updatedAt: new Date(),
        },
      });

      if (newBook.data?.createBook) {
        setBook(newBook.data.createBook)
        console.log("Created book:", newBook.data.createBook);
        reset();
      }
    } catch (error) {
      setErrorMessage("Something went wrong.");
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles["create-book-form-container"]}>
      <h2>Create a New Book</h2>
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
          {isSubmitting ? "Creating..." : "Create Book"}
        </button>
      </form>
      <Link href="/profile">
        <button>Back to Profile</button>
      </Link>
    </div>
  );
}
