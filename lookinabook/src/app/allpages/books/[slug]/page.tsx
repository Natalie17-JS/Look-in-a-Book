"use client"

import BookContent from "./components/Book";
import { useTheme } from "@/app/context/themeContext";
import styles from "./MainPage.module.css"
import { Book } from "@/app/types/bookTypes";
import { useBook } from "@/app/context/bookContext";
import GoBackDoor from "./components/GoBackDoor";

type PublicBookProps = {
  book: Book;
};

export default function PublicBookPage({ book }: PublicBookProps) {
  const {theme} = useTheme()
  const {currentBook} = useBook()

  const themeClass =
    theme === "dark"
      ? styles["dark"]
      : theme === "gray"
      ? styles["gray"]
      : styles["light"];

  return(
    <div  className={`${styles["book-container"]} ${themeClass}`}>
      <GoBackDoor/>
    <BookContent book={currentBook} />
    </div>
  )
}