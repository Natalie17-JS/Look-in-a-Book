"use client"

import { useParams } from "next/navigation";
import { useTheme } from "@/app/context/themeContext"
import styles from "./MainPage.module.css"
import { getThemeClass } from "@/app/themeclass"
import LetterForm from "./components/LetterForm";

export default function NewLetterPage() {
    const params = useParams();
    const recipientId = Number(params.id);
    const {theme} = useTheme()
    const themeClass = getThemeClass(theme, styles);

    return(
<div className={`${styles["write-letter-container"]} ${themeClass}`}>
    <LetterForm recipientId={recipientId}/>
</div>
    )
}