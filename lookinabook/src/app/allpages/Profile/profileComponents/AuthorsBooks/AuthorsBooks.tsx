import books from "@/images/books.svg";
import styles from "./AuthorsBooks.module.css";
import Image from "next/image";
import Link from "next/link";

const AuthorsBooks = () => {
  return (
    <div className={styles["author-books-container"]}>
      <Link href="/allpages/profile/my-books">
        <Image
          src={books}
          alt="books"
          className={styles["authors-books-image"]}
        />
      </Link>
    </div>
  );
};

export default AuthorsBooks;
