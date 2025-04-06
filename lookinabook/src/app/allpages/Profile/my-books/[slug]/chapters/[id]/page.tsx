"use client"

import { useTheme } from "@/app/context/themeContext"
import AuthorBookChapter from "./components/AuthorBookChapter"
import { getThemeClass } from "@/app/themeclass"
import styles from "./MainPage.module.css"

export default function AuthorBookChapterPage() {
    const {theme} = useTheme()
    const themeClass = getThemeClass(theme, styles)

    return(
        <div className={`${styles["authorbook-chapter-container"]} ${themeClass}`}>
            <AuthorBookChapter />
        </div>
    )
}