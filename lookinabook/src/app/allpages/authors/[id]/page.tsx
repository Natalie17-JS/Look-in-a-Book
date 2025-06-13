"use client"

import GetAuthor from "./components/GetAuthor"
import { useTheme } from "@/app/context/themeContext"
import { getThemeClass } from "@/app/themeclass";
import styles from "./MainPage.module.css"

export default function AuthorPage() {
    const {theme} = useTheme()
    const themeClass = getThemeClass(theme, styles);

    return (
        <div className={`${styles["author-container"]} ${themeClass}`}>
           
            <GetAuthor />
        </div>
    )
}