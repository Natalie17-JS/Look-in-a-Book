"use client"

import { getThemeClass } from "@/app/themeclass";
import UsersList from "./components/GetUsers";
import GoBackDoor from "./components/GoBackDoor";
import { useTheme } from "@/app/context/themeContext";
import styles from "./MainPage.module.css"
import CursivText from "./components/CursivText";

export default function Authors() {
 const {theme} = useTheme()
    const themeClass = getThemeClass(theme, styles);
    
    return (
        <div className={`${styles["authors-container"]} ${themeClass}`}>
           <div className={styles["text-door"]}>
            <CursivText className={styles.cursivtext}>Our authors</CursivText>
            
            <GoBackDoor/>
            </div>
            <UsersList />
        </div>
    );
 }
