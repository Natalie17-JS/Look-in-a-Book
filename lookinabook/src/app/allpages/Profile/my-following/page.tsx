"use client"

import { getThemeClass } from "@/app/themeclass";
import MyFollowingList from "./components/Following"
import {useTheme} from "@/app/context/themeContext"
import styles from "./MainPage.module.css"

export default function MyFollowingsPage(){
    const {theme} = useTheme()
    const themeClass = getThemeClass(theme, styles);

    return (
    <div className={`${styles["myfollowings-container"]} ${themeClass}`}>
    <MyFollowingList/>
    </div>
)
}