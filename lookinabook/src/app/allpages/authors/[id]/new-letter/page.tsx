"use client"

import NewLetter from "./components/NewLetter"
import { useTheme } from "@/app/context/themeContext"

export default function NewMessagePage() {
    const {theme} = useTheme()

    return(
<div>
    <NewLetter/>
</div>
    )
}