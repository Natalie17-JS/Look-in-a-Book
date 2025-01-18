"use client";

import Notebook from "../Notebook/Notebook";
import { useState } from "react";
import AuthorsBooksPile from "../AuthorsBooks/AuthorsBooks";
import AuthorsBooksCarousel from "../AuthorBooksList/BooksCarousel";
import styles from "./NotebookBooks.module.css";

export default function NotebookBooks() {
  // Состояние для переключения между отображением <Notebook /> и <AuthorsBooks /> или <BooksList />
  const [showBooksList, setShowBooksList] = useState<boolean>(false);

  // Функция для переключения состояния
  const handleAuthorsBooksClick = () => {
    setShowBooksList(true);
  };

  return (
    <div className={styles["notebook-books"]}>
      {showBooksList ? (
        // Показать <BooksList /> если showBooksList = true
        <div className={styles["books-list-container"]}>
          <button className={styles["add-book-btn"]}>Add book</button>
          <AuthorsBooksCarousel />
        </div>
      ) : (
        // Показать <Notebook /> и <AuthorsBooks /> если showBooksList = false
        <>
          <Notebook />
          <AuthorsBooksPile onClick={handleAuthorsBooksClick} />
        </>
      )}
    </div>
  );
}
