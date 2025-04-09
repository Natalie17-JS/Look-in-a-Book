"use client"

import CreateChapter from "./components/CreateChapter";
import { useTheme } from "@/app/context/themeContext";
import { getThemeClass } from "@/app/themeclass";
import styles from "./MainPage.module.css"
import GoBackDoor from "./GoBackDoor";

export default function CreateChapterPage() {
    const { theme } = useTheme();
    const themeClass = getThemeClass(theme, styles);


    return (
        <div className={`${styles["add-chapter-container"]} ${themeClass}`}>
            <CreateChapter />
            <GoBackDoor/>
        </div>
    );
 }
