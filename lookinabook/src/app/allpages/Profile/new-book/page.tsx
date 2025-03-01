"use client"

import BookForm from "./components/BookForm";
import { useTheme } from "@/app/context/themeContext";
import styles from "./MainPage.module.css"

export default function CreateBookPage() {
    const {theme} = useTheme()

    const themeClass =
      theme === "dark"
        ? styles["dark"]
        : theme === "gray"
        ? styles["gray"]
        : styles["light"];
  
    return (
        <div className={`${styles["create-book-container"]} ${themeClass}`}>
            
            <BookForm isEditing={false} />
           
        </div>
    );
}