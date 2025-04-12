"use client"

import EditChapter from "./components/EditChapter"
import { useTheme } from "@/app/context/themeContext"

export default function EditChapterPage() {
    const {theme} = useTheme()

    return(
        <div>
            <EditChapter/>
        </div>
    )

}