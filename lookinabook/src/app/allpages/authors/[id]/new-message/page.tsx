"use client"

import NewMessage from "./components/NewMessage"
import { useTheme } from "@/app/context/themeContext"

export default function NewMessagePage() {
    const {theme} = useTheme()

    return(
<div>
    <NewMessage/>
</div>
    )
}