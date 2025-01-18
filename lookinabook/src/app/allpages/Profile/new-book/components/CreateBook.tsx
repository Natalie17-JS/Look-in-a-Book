"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import styles from "./CreateBookForm.module.css";

interface BookFormValues {
  title: string;
  annotation: string;
  tags: string[];
  cover: FileList;
}

export default function CreateBookForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookFormValues>();
  const router = useRouter();

  const onSubmit: SubmitHandler<BookFormValues> = (data) => {
    console.log("Book data submitted:", data);
    // Сохранить данные книги в хранилище (например, через API или state) и перейти на страницу создания главы
    router.push("/create-chapter");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2>Create a New Book</h2>

      {/* Cover */}
      <label>
        Cover:
        <input
          type="file"
          accept="image/*"
          {...register("cover", { required: "Cover is required" })}
        />
        {errors.cover && (
          <span className={styles.error}>{errors.cover.message}</span>
        )}
      </label>

      {/* Title */}
      <label>
        Title:
        <input
          type="text"
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && (
          <span className={styles.error}>{errors.title.message}</span>
        )}
      </label>

      {/* Annotation */}
      <label>
        Annotation:
        <textarea
          {...register("annotation", { required: "Annotation is required" })}
        />
        {errors.annotation && (
          <span className={styles.error}>{errors.annotation.message}</span>
        )}
      </label>

      {/* Tags */}
      <label>
        Tags (comma-separated):
        <input
          type="text"
          placeholder="e.g. fantasy, adventure"
          {...register("tags", {
            setValueAs: (value) =>
              value.split(",").map((tag: string) => tag.trim()),
          })}
        />
      </label>

      <button type="submit">Next: Add Chapters</button>
    </form>
  );
}
