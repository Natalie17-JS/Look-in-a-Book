"use client"

import { useForm, useWatch } from "react-hook-form"
import { PStatus } from "@/app/types/bookTypes"
import { Post, postCategory } from "@/app/types/postTypes"
import { useTheme } from "@/app/context/themeContext"
import { CreatePostFormData } from "@/app/types/postTypes"
import styles from "./CreatePost.module.css"
import Image from "next/image"
import thoughts_post_light from "@/app/images/thoughts-post-sun-bg.svg"
import thoughts_post_clouds from "@/app/images/thoughts-post-clouds-bg.svg"
import thoughts_post_night from "@/app/images/thoughts-post-night-bg.svg"
import news_post_light from "@/app/images/news-post-sun-bg.svg"
import news_post_clouds from "@/app/images/news-post-clouds-bg.svg"
import news_post_night from "@/app/images/news-post-night-bg.svg"
import review_post_light from "@/app/images/review-post-sun-bg.svg"
import review_post_clouds from "@/app/images/review-post-clouds-bg.svg"
import review_post_night from "@/app/images/review-post-night-bg.svg"
import book_post_light from "@/app/images/book-post-sun-bg.svg"
import book_post_clouds from "@/app/images/book-post-clouds-bg.svg"
import book_post_night from "@/app/images/book-post-night-bg.svg"
import other_post_light from "@/app/images/other-post-sun-bg.svg"
import other_post_clouds from "@/app/images/other-post-clouds-bg.svg"
import other_post_night from "@/app/images/other-post-night-bg.svg"

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
        register, handleSubmit, control, formState: {errors}, 
    } = useForm<CreatePostFormData>({
        defaultValues: initialValues,
      });

      const themeInput =
    theme === "dark"
      ? styles.dark
      : theme === "gray"
      ? styles.gray
      : styles.light;

      const selectedCategory = useWatch({ control, name: "category" });

const getImage = (category: Post["category"], theme: string) => {
        switch (category) {
          case "THOUGHTS":
            switch (theme) {
              case "light":
                return thoughts_post_light;
              case "gray":
                return thoughts_post_clouds;
              case "dark":
                return thoughts_post_night;
            }
            break;
          case "NEWS":
            switch (theme) {
              case "light":
                return news_post_light;
              case "gray":
                return news_post_clouds;
              case "dark":
                return news_post_night;
            }
            break;
          case "BOOK_REVIEW":
            switch (theme) {
              case "light":
                return review_post_light;
              case "gray":
                return review_post_clouds;
              case "dark":
                return review_post_night;
            }
            break;
          case "NEW_BOOK_PROMOTION":
            switch (theme) {
              case "light":
                return book_post_light;
              case "gray":
                return book_post_clouds;
              case "dark":
                return book_post_night;
            }
            break;
          case "OTHER":
          default:
            switch (theme) {
              case "light":
                return other_post_light;
              case "gray":
                return other_post_clouds;
              case "dark":
                return other_post_night;
            }
        }
      };

  const bgImage = getImage(selectedCategory, theme);


      return(
        <div className={styles.container}>
        <Image
          src={bgImage}
          alt="Post background"
          className={styles["post-bg-image"]}
          style={{  zIndex: 0 }}
       
        />
  
  
        <form className={styles.form}  style={{ zIndex: 1 }} onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input 
                className={`${styles.input} ${themeInput}`}
                {...register("title", {required: "Title is required"})}
                type="text"
                placeholder="Title here..."
                />
                {errors.title && <p>{errors.title.message}</p>}
            </div>

            <div className={styles["textarea-container"]}>
                <textarea
                className={`${styles.input} ${styles.textarea} ${themeInput}`}
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
        </div>
        
      
      )
}