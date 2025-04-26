"use client"

import PostCard from "./components/Post"
import { useTheme } from "@/app/context/themeContext"
import { getThemeClass } from "@/app/themeclass"
import styles from "./MainPage.module.css"
import CommentsCase from "./components/CommentsCase"
import GoBackDoor from "./components/GoBackDoor"
import { usePost } from "@/app/context/postContext"

export default function PostPage() {
    const {theme} = useTheme()
    const {currentPost} = usePost()
    if (!currentPost) return null;
    const themeClass = getThemeClass(theme, styles);

    return(
        <div className={`${styles["post-container"]} ${themeClass}`}>
            <GoBackDoor/>
            <PostCard post={currentPost}/>
            <CommentsCase/>
        </div>
    )
}