"use client"

import { useTheme } from "@/app/context/themeContext"
import GetAllPosts from "./components/AllPosts"
import { getThemeClass } from "@/app/themeclass"
import styles from "./MainPage.module.css"
import GoBackDoor from "./components/GoBackDoor"

export default function AllPostsPage() {
    const {theme} = useTheme()
    const themeClass = getThemeClass(theme, styles);

    return (
        <div className={`${styles["posts-container"]} ${themeClass}`}>
            <GoBackDoor/>
            <GetAllPosts />
        </div>
    );
}