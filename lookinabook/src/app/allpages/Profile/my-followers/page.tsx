"use client"

import MyFollowersList from "./components/Followers"
import {useTheme} from "@/app/context/themeContext"
import styles from "./MainPage.module.css"
import { getThemeClass } from "@/app/themeclass";
import SideShelf from "../profileComponents/SideShelf/SideShelf";
import GoBackDoor from "./components/GoBackDoor";

export default function MyFollowersPage(){
    const {theme} = useTheme()
    const themeClass = getThemeClass(theme, styles);

    return (
        <div className={`${styles["myfollowers-container"]} ${themeClass}`}>
        <MyFollowersList/>

         <div className={styles["shelf-door"]}>
            <SideShelf/>
            <GoBackDoor/>
        </div>
        </div>
    )
}