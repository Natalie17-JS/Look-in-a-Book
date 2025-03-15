"use client"

import BookForm from "../../new-book/components/BookForm";
import { useTheme } from "@/app/context/themeContext";
import styles from "./MainPage.module.css"
import SideShelf from "../../profileComponents/SideShelf/SideShelf";

export default function EditBookPage() {
    const {theme} = useTheme()

    const themeClass =
      theme === "dark"
        ? styles["dark"]
        : theme === "gray"
        ? styles["gray"]
        : styles["light"];
  
    return (
        <div className={`${styles["edit-book-container"]} ${themeClass}`}>
            
            <BookForm isEditing={true} />
            <SideShelf/>
           
        </div>
    );
}