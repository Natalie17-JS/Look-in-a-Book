"use client"

import MessageForm from "./components/MessageForm"
import { useParams } from "next/navigation";
import { useTheme } from "@/app/context/themeContext"
import styles from "./MainPage.module.css"
import { getThemeClass } from "@/app/themeclass"

export default function NewMessagePage() {
    const params = useParams();
    const recipientId = Number(params.id);
    const {theme} = useTheme()
    const themeClass = getThemeClass(theme, styles);

    return(
<div className={`${styles["write-letter-container"]} ${themeClass}`}>
    <MessageForm recipientId={recipientId} type="LETTER" />
</div>
    )
}