"use client"

import MessageForm from "./components/MessageForm"
import { useTheme } from "@/app/context/themeContext"
import styles from "./MainPage.module.css"
import { getThemeClass } from "@/app/themeclass"
import { useParams } from "next/navigation"

export default function NewMessagePage() {
    const params = useParams();
    const chatId = Number(params.id);
  //const chatId = parseInt(params.chatId, 10);
    const {theme} = useTheme()
    const themeClass = getThemeClass(theme, styles);

    if (isNaN(chatId)) {
    return <p>Invalid chat ID</p>;
  }

    return(
<div className={`${styles["write-message-container"]} ${themeClass}`}>
    <MessageForm chatId={chatId}/>
</div>
    )
}