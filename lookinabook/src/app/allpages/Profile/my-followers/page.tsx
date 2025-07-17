"use client"

import MyFollowersList from "./components/Followers"
import {useTheme} from "@/app/context/themeContext"
import styles from "./MainPage.module.css"
import { getThemeClass } from "@/app/themeclass";

export default function MyFollowersPage(){
    const {theme} = useTheme()
    const themeClass = getThemeClass(theme, styles);

    return (
        <div className={`${styles["myfollowers-container"]} ${themeClass}`}>
        <MyFollowersList/>
        </div>
    )
}