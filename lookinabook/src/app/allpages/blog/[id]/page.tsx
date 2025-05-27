"use client"

import PostCard from "./components/Post"
import { useTheme } from "@/app/context/themeContext"
import { getThemeClass } from "@/app/themeclass"
import styles from "./MainPage.module.css"
import CommentsCase from "./components/comments/CommentsCase"
import GoBackDoor from "./components/GoBackDoor"

import { usePostStore } from "@/app/zustand/PostStore"
import { useParams } from "next/navigation"
import { useLoadPostById } from "@/app/hooks/useFetchPost"

export default function PostPage() {
    const { theme } = useTheme()
    const { currentPost } = usePostStore()
  
    const params = useParams()
    const id =
      typeof params.id === "string"
        ? params.id
        : Array.isArray(params.id)
        ? params.id[0]
        : ""
  
    const { loading, error } = useLoadPostById(id)
    const themeClass = getThemeClass(theme, styles)
  
    if (loading) return <p>Loading post...</p>
    if (error) return <p>Error loading post: {error.message}</p>
    if (!currentPost) return <p>Post not found.</p>
  

    return(
        <div className={`${styles["post-container"]} ${themeClass}`}>
            <GoBackDoor/>
            <PostCard post={currentPost}/>
            <CommentsCase/>
        </div>
    )
}