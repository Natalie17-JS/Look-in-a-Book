"use client"

import Chapter from "./components/GetChapter";
import { useTheme } from "@/app/context/themeContext";
import { getThemeClass } from "@/app/themeclass";
import styles from "./MainPage.module.css"

export default function ChapterPage() {
    const { theme } = useTheme();
    const themeClass = getThemeClass(theme, styles);

    return (
        <div className={`${styles["chapter-container"]} ${themeClass}`}>
            <Chapter />
        </div>
    );
}