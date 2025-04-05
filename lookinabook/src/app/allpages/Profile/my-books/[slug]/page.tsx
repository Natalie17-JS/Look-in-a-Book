// components/AuthorBook.tsx
"use client";

import { useBook } from "@/app/context/bookContext";
import { useUser } from "@/app/context/authContext";
import BookContent from "@/app/allpages/books/[slug]/components/Book";
import { getThemeClass } from "@/app/themeclass";
import { useTheme } from "@/app/context/themeContext";
import styles from "./MainPage.module.css"
import GoBackDoor from "./GoBackDoor";

export default function AuthorBook() {
  const { currentBook } = useBook();
  const { user } = useUser();
  const { theme } = useTheme();
  const themeClass = getThemeClass(theme, styles);

  const isAuthor = user?.id === currentBook?.author?.id;

  return (
    <div className={`${styles["author-book-container"]} ${themeClass}`}>
  <BookContent book={currentBook} showEditActions={isAuthor} />
<GoBackDoor/>
  </div>
  )
}
