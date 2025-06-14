"use client"

import UserLetters from "./components/MyLetters"
import { useTheme } from "@/app/context/themeContext"

export default function UserLettersPage() {
    const {theme} = useTheme()

    return(
        <div>
            <UserLetters/>
        </div>

    )
}