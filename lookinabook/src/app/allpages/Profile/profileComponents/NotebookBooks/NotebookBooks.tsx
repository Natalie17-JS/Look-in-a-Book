import Notebook from "../Notebook/Notebook";
import AuthorsBooks from "../AuthorsBooks/AuthorsBooks";
import styles from "./NotebookBooks.module.css";

export default function NotebookBooks() {
  return (
    <div className={styles["notebook-books"]}>
      <Notebook />
      <AuthorsBooks />
    </div>
  );
}
