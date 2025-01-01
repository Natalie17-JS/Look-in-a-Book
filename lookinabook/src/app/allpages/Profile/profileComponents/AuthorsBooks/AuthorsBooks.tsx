import books from "@/images/books.svg";
import styles from "./AuthorsBooks.module.css";
import Image from "next/image";

const AuthorsBooks = () => {
  return (
    <div>
      <Image
        src={books}
        alt="books"
        className={styles["authors-books-image"]}
      />
    </div>
  );
};

export default AuthorsBooks;
