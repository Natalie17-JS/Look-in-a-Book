"use client"

import { useForm } from "react-hook-form"
import { PStatus } from "@/app/types/bookTypes"
import { postCategory } from "@/app/types/postTypes"
import { useTheme } from "@/app/context/themeContext"
import { CreatePostFormData } from "@/app/types/postTypes"
import styles from "./CreatePost.module.css"

type PostFormProps = {
    initialValues?:CreatePostFormData;
    onSubmit: (data: CreatePostFormData) => void;
    isSubmitting: boolean;
    submitLabel: string;
}

export default function PostForm({
    initialValues = {
    title: "",
    content: "",
    publishStatus: PStatus.DRAFT,
    category: postCategory.NEWS
},
onSubmit,
  isSubmitting,
  submitLabel,
}: PostFormProps) {

    const {theme} = useTheme()
    const {
        register, handleSubmit, formState: {errors}, 
    } = useForm<CreatePostFormData>({
        defaultValues: initialValues,
      });

      const themeInput =
    theme === "dark"
      ? styles.dark
      : theme === "gray"
      ? styles.gray
      : styles.light;

      return(
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input 
                {...register("title", {required: "Title is required"})}
                type="text"
                placeholder="Title here..."
                />
                {errors.title && <p>{errors.title.message}</p>}
            </div>

            <div>
                <textarea
                {...register("content", {required: "Content is required"})}
                placeholder="Write something..."
                />
                 {errors.content && <p>{errors.content.message}</p>}
            </div>

            <div>
                <label htmlFor="publishStatus"></label>
                <select {...register("publishStatus")} id="publishStatus">
                    <option value="DRAFT">Draft</option>
                    <option value="PUDLISHED">Published</option>
                </select>
            </div>

            <div>
                <label htmlFor="category"></label>
                <select {...register("category")} id="category">
                    <option value="THOUGHTS">Thoughts</option>
                    <option value="NEWS">News</option>
                    <option value="NEW_BOOK_PROMOTION">New book promotion</option>
                    <option value="BOOK_REVIEW">Book review</option>
                    <option value="OTHER">Other</option>
                </select>
            </div>

            <button type="submit" disabled={isSubmitting} className={styles.button}>
            {isSubmitting ? "Submitting..." : submitLabel}
            </button>
        </form>
      )
}