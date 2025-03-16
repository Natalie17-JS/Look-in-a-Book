"use client"

import CreateBookForm from "./components/CreateBookForm";
import { useTheme } from "@/app/context/themeContext";
import styles from "./MainPage.module.css"
import SideShelf from "../profileComponents/SideShelf/SideShelf";

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
            
            <CreateBookForm />
            <SideShelf/>
           
        </div>
    );
}