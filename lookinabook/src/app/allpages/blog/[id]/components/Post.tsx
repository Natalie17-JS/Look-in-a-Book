"use client"

import { useTheme } from "@/app/context/themeContext"
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
import  {Post}  from "@/app/types/postTypes"
import styles from "./Post.module.css"

import { usePostStore } from "@/app/zustand/PostStore"

interface PostCardProps {
  post?: Post; // Сделаем пропсу необязательной
  preview?: boolean; // если true, показываем только начало текста
  onTable?: boolean;
  inProfile?: boolean;
}

export default function PostCard({ post, preview = false, onTable = false, inProfile = false }: PostCardProps) {
    const { theme } = useTheme();
   // const {currentPost} = usePost()

   const currentPost = usePostStore((state) => state.currentPost);
  
    
  const displayedPost = post || currentPost;

  if (!displayedPost) return null;


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
    
      const backgroundImage = getImage(displayedPost.category, theme);
      const contentPreview = preview
        ? displayedPost.content.split(" ").slice(0, 10).join(" ") + "..."
        : displayedPost.content;

        return (
          <div className={`
            ${styles["post-card-container"]} 
            ${preview ? styles.preview : ""} 
            ${onTable ? styles.onTable : ""}
            ${inProfile ? styles.inProfile : ""}
          `}>
            <div className={styles["image-wrapper"]}>
              <Image
                src={backgroundImage}
                alt={`${displayedPost.category} background`}
                className={styles["post-image"]}
              />
              <div className={styles["post-container"]}>
                <h2 className={styles["post-title"]}>{displayedPost.title}</h2>
                <p className={styles["post-content"]}>{contentPreview}</p>
                <span className={styles["post-category"]}>{displayedPost.category}</span>
              </div>
            </div>
          </div>
        );
      }