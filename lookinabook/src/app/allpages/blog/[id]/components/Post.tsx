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
import other_post_clouds from "@/app/images/book-post-clouds-bg.svg"
import other_post_night from "@/app/images/book-post-night-bg.svg"
import  {Post}  from "@/app/types/postTypes"
import styles from "./Post.module.css"

interface PostCardProps {
    post: Post;
  }

export default function PostCard({ post }: PostCardProps) {
    const { theme } = useTheme();

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
    
      const backgroundImage = getImage(post.category, theme);

      return (
        <div className={styles["post-card-container"]}>
          <div className={styles["image-wrapper"]}>
            <Image
              src={backgroundImage}
              alt={`${post.category} background`}
              fill
              style={{ objectFit: "cover" }}
              className={styles["post-background"]}
            />
            <div className={styles["post-content"]}>
              <h2 className={styles["post-title"]}>{post.title}</h2>
              <p className={styles["post-text"]}>{post.content}</p>
              <span className={styles["post-category"]}>{post.category}</span>
            </div>
          </div>
        </div>
      );
    }
    