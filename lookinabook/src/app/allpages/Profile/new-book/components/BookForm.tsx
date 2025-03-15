"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { useUser } from "@/app/context/authContext";
import { CREATE_BOOK, UPDATE_BOOK } from "@/app/GraphqlOnClient/mutations/bookMutations";
import { CreateBookFormData, EditBookData, Book, Category, Genre, WStatus, PStatus } from "@/app/types/bookTypes";
import styles from "./BookForm.module.css"
import Link from "next/link";

export default function BookForm({ book = null, isEditing = false }: { book?: Book | null; isEditing?: boolean }) {
  const { user } = useUser();
  const [errorMessage, setErrorMessage] = useState("");

  console.log("Author of this book:", user)

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
      category: book?.category as Category,
      genre: book?.genre as Genre,
      writingStatus: book?.writingStatus as WStatus,
      publishStatus: book?.publishStatus as PStatus,
    },
  });

  useEffect(() => {
    if (book) {
      setValue("title", book.title);
      setValue("annotation", book.annotation || "");
      setValue("cover", book.cover || "");
      setValue("category", book.category);
      setValue("genre", book.genre);
      setValue("writingStatus", book.writingStatus);
      setValue("publishStatus", book.publishStatus);
    }
  }, [book, setValue]);

  const accessToken = localStorage.getItem("token");


  const [createBook] = useMutation<Book>(CREATE_BOOK,{
    context: {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : "", 
      },
    }
  });
  const [updateBook] = useMutation<EditBookData>(UPDATE_BOOK);


  const onSubmit = async (data: {
     title: string; 
     annotation?: string; 
     cover?: string;
     category: Category;
     genre: Genre; 
     writingStatus: WStatus;
     publishStatus: PStatus;
    }) => {
   
    if (!user) {
      setErrorMessage("You must be logged in.");
      return;
    }

    try {
      if (isEditing) {
        await updateBook({ variables: { id: book?.id, ...data } });
      } else {
        console.log("Sending variables:", {
          title: data.title,
          annotation: data.annotation || null,
          cover: data.cover || null,
          category: data.category,
          genre: data.genre,
          writingStatus: data.writingStatus,
          publishStatus: data.publishStatus,
        });
        const newBook = await createBook({ variables: {
          title: data.title,
          annotation: data.annotation || null,
          cover: data.cover || null,
          category: data.category,
          genre: data.genre,
          writingStatus: data.writingStatus,
          publishStatus: data.publishStatus, 
        }, });
        reset();
        console.log("Created book:", newBook)
      }
    } catch (error) {
      setErrorMessage("Something went wrong.");
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles["create-book-form-container"]}>
      <h2>{isEditing ? "Edit Book" : "Create a New Book"}</h2>

      {errorMessage && <p className={styles.errormessage}>{errorMessage}</p>}

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
          <textarea {...register("annotation")} className={styles.textarea} />
        </div>

        {/* Выбор категории */}
        <div>
          <label>Category:</label>
          <select {...register("category", { required: "Category is required" })} className={styles["create-book-select"]}>
            {Object.values(Category).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && <p>{errors.category.message}</p>}
        </div>

        {/* Выбор жанра */}
        <div>
          <label>Genre:</label>
          <select {...register("genre", { required: "Genre is required" })} className={styles["create-book-select"]}>
            {Object.values(Genre).map((gen) => (
              <option key={gen} value={gen}>
                {gen}
              </option>
            ))}
          </select>
          {errors.genre && <p>{errors.genre.message}</p>}
        </div>

        {/* Выбор статуса написания */}
        <div>
          <label>Status:</label>
          <select {...register("writingStatus", { required: "Status is required" })} className={styles["create-book-select"]}>
            {Object.values(WStatus).map((ws) => (
              <option key={ws} value={ws}>
                {ws}
              </option>
            ))}
          </select>
          {errors.genre && <p>{errors.writingStatus?.message}</p>}
        </div>

          {/* Выбор статуса написания */}
          <div>
          <label>Publish status:</label>
          <select {...register("publishStatus", { required: "Publish status is required" })} className={styles["create-book-select"]}>
            {Object.values(PStatus).map((ps) => (
              <option key={ps} value={ps}>
                {ps}
              </option>
            ))}
          </select>
          {errors.genre && <p>{errors.publishStatus?.message}</p>}
        </div>

        {/* Стандартная обложка 
        <div className={styles["book-cover"]}>Book Cover</div>*/}

        <button className={styles["create-book-btn"]} type="submit" disabled={isSubmitting}>
          {isSubmitting ? (isEditing ? "Updating..." : "Creating...") : isEditing ? "Update Book" : "Create Book"}
        </button>
      </form>

      <Link href="/allpages/profile">
        <button>Back to profile</button>
      </Link>
    </div>
  );
}