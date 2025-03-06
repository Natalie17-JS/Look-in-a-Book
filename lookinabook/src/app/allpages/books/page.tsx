"use client"

import { useTheme } from "@/app/context/themeContext";
import Books from "./components/AllBooks"
import Link from "next/link"
import styles from "./MainPage.module.css"

export default function BooksPage() {
    const {theme} = useTheme()

    const themeClass =
    theme === "dark"
      ? styles["dark"]
      : theme === "gray"
      ? styles["gray"]
      : styles["light"];

    return (  
    <div  className={`${styles["books-container"]} ${themeClass}`}>
       
        <Books />
        <Link href="/">
        <button>Back to homepage</button>
        </Link>
    </div>
    ) 
}