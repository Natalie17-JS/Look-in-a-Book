"use client"

import Book from "./components/GetBook";
import { useTheme } from "@/app/context/themeContext";
import styles from "./MainPage.module.css"

export default function BookPage() {
  const {theme} = useTheme()

  const themeClass =
    theme === "dark"
      ? styles["dark"]
      : theme === "gray"
      ? styles["gray"]
      : styles["light"];

  return(
    <div  className={`${styles["book-container"]} ${themeClass}`}>
    <Book />
    </div>
  )
}