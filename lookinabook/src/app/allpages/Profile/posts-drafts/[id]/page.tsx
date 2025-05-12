"use client"

import { useTheme } from "@/app/context/themeContext";
import DraftPost from "./components/DraftPost";
import { getThemeClass } from "@/app/themeclass";
import styles from "./MainPage.module.css"
import GoBackDoor from "./components/GoBackDoor";
import SideShelf from "../../profileComponents/SideShelf/SideShelf";

export default function DraftPostPage() {
     const {theme} = useTheme()
        const themeClass = getThemeClass(theme, styles);

    return (
    <div className={`${styles["draft-post-container"]} ${themeClass}`}>
    <DraftPost/>
    <div className={styles["shelf-door"]}>
    <SideShelf/>
    <GoBackDoor/> 
   </div>
    </div>
    )
}