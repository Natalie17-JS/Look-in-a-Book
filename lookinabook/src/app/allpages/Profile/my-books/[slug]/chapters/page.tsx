"use client"

import AuthorBookChapters from "./components/AuthorChapters"
import { useTheme } from "@/app/context/themeContext"
import { useUser } from "@/app/context/authContext"
import { getThemeClass } from "@/app/themeclass"
import styles from "./MainPage.module.css"

export default function AuthorBookChapterPage() {
    const { theme } = useTheme()
    const { user } = useUser()
    const themeClass = getThemeClass(theme, styles);

    return(
        <div className={`${styles["authorbook-chapters-container"]} ${themeClass}`}>
            <AuthorBookChapters />
        </div>

    )
}