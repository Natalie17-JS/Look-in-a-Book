"use client";

import { useForm } from "react-hook-form";
import { CreateChapterFormData, EditChapterData } from "@/app/types/chapterTypes";
import { PStatus } from "@/app/types/bookTypes";
import styles from "./CreateChapter.module.css";
import { useTheme } from "@/app/context/themeContext";

type ChapterFormProps = {
  initialValues?: CreateChapterFormData;
  onSubmit: (data: CreateChapterFormData) => void;
  isSubmitting: boolean;
  submitLabel: string;
};

export default function ChapterForm({
  initialValues = {
    title: "",
    content: "",
    publishStatus: PStatus.DRAFT,
  },
  onSubmit,
  isSubmitting,
  submitLabel,
}: ChapterFormProps) {
  const { theme } = useTheme();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateChapterFormData>({
    defaultValues: initialValues,
  });

  const themeInput =
    theme === "dark"
      ? styles.dark
      : theme === "gray"
      ? styles.gray
      : styles.light;

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          {...register("title", { required: "Title is required" })}
          type="text"
          placeholder="Title"
          className={`${styles.title} ${themeInput}`}
        />
        {errors.title && <p>{errors.title.message}</p>}
      </div>

      <div className={styles["content-container"]}>
        <textarea
          {...register("content", { required: "Content is required" })}
          placeholder="Chapter content..."
          className={`${styles.content} ${themeInput}`}
        />
        {errors.content && <p>{errors.content.message}</p>}
      </div>

      <div>
        <label htmlFor="publishStatus">Publish Status</label>
        <select {...register("publishStatus")} id="publishStatus">
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
        </select>
      </div>

      <button type="submit" disabled={isSubmitting} className={styles.button}>
        {isSubmitting ? "Submitting..." : submitLabel}
      </button>
    </form>
  );
}
