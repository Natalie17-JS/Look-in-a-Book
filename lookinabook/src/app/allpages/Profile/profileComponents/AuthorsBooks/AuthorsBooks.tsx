import books from "@/app/images/books.svg";
import styles from "./AuthorsBooks.module.css";
import Image from "next/image";
import Link from "next/link";

type AuthorsBooksPileProps = {
  onClick: React.MouseEventHandler<HTMLDivElement>; // Тип для обработчика кликов
};

export default function AuthorsBooksPile({ onClick }: AuthorsBooksPileProps) {
  return (
    <div onClick={onClick} className={styles["author-books-container"]}>
      {/*<Link href="/allpages/profile/my-books">*/}
      <Image
        src={books}
        alt="books"
        className={styles["authors-books-image"]}
      />
      {/*</Link>*/}
    </div>
  );
}
