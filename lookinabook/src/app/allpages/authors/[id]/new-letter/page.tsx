"use client"

import NewLetter from "./components/NewLetter"
import { useTheme } from "@/app/context/themeContext"
import styles from "./MainPage.module.css"
import { getThemeClass } from "@/app/themeclass"

export default function NewMessagePage() {
    const {theme} = useTheme()
    const themeClass = getThemeClass(theme, styles);

    return(
<div className={`${styles["write-letter-container"]} ${themeClass}`}>
    <NewLetter/>
</div>
    )
}