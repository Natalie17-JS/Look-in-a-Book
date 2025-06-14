"use client"

import UserLetters from "./components/MyMessages"
import { useTheme } from "@/app/context/themeContext"

export default function UserMessagesPage() {
    const {theme} = useTheme()

    return(
        <div>
            <UserLetters/>
        </div>

    )
}