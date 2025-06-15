"use client"

import Letter from "./components/Letter";
import { useTheme } from "@/app/context/themeContext";
import { getThemeClass } from "@/app/themeclass";
import styles from "./MainPage.module.css"
import GoBackDoor from "./components/GoBackDoor";

export default function LetterPage() {
    const {theme} = useTheme()
    const themeClass = getThemeClass(theme, styles);

    return ( 
        <div className={`${styles["letter-container"]} ${themeClass}`}> 
        <Letter/>
        <GoBackDoor/>
        </div>
    )
   
}