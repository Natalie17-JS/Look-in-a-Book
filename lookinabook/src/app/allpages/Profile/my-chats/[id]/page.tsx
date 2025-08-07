"use client"

import { useTheme } from "@/app/context/themeContext";
import Chat from "./components/GetChat"
import { getThemeClass } from "@/app/themeclass";
import styles from "./MainPage.module.css"
import GoBackDoor from "./components/GoBackDoor";
import SideShelf from "../../profileComponents/SideShelf/SideShelf";

export default function ChatPage() {
  const {theme} = useTheme()
      const themeClass = getThemeClass(theme, styles);

  return(
    <div className={`${styles["chat-container"]} ${themeClass}`}>
    <Chat/>

     <div className={styles["shelf-door"]}>
            <SideShelf/>
            <GoBackDoor/>
        </div>
    </div>
  )
}