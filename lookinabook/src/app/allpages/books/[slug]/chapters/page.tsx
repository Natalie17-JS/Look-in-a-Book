"use client"

import Chapters from "./components/getChapters";
import Link from "next/link";
import { getThemeClass } from "@/app/themeclass";
import { useTheme } from "@/app/context/themeContext";
import styles from "./MainPage.module.css"

export default function ChaptersPage() {
    const {theme} = useTheme()
    const themeClass = getThemeClass(theme, styles);

    return (
        <div className={`${styles["chapters-container"]} ${themeClass}`}>
            <h1>Chapters</h1>
            <Chapters />
        </div>
    );
}