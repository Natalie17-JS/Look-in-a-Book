"use client"

import AuthorPost from "./components/Post";
import { useTheme } from "@/app/context/themeContext";
import { getThemeClass } from "@/app/themeclass";
import styles from "./MainPage.module.css"

export default function AuthorPostPage() {
    const {theme} = useTheme()
    const themeClass = getThemeClass(theme, styles);

    return(
        <div className={`${styles["author-post-container"]} ${themeClass}`}>
            <AuthorPost/>
        </div>
    )
}