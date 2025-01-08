import styles from "./FictionShelf.module.css";
import Link from "next/link";

const FictionShelf = () => {
  return (
    <Link href="/allpages/fiction">
      <div className={styles["bookshelf-fiction"]}>
        <p>Fiction books</p>
        <div className={styles.shelf}>
          <div className={`${styles.book} ${styles.first}`}></div>
          <div className={`${styles.book} ${styles.second}`}></div>
          <div className={`${styles.book} ${styles.third}`}></div>
          <div className={`${styles.book} ${styles.forth}`}></div>
          <div className={`${styles.book} ${styles.fifth}`}></div>
          <div className={`${styles.book} ${styles.sixth}`}></div>
          <div className={`${styles.book} ${styles.seventh}`}></div>
          <div className={`${styles.book} ${styles.eighth}`}></div>
          <div className={`${styles.book} ${styles.ninth}`}></div>
          <div className={`${styles.book} ${styles.tenth}`}></div>
          <div className={`${styles.book} ${styles.eleventh}`}></div>
          <div className={`${styles.book} ${styles.twelfth}`}></div>
          <div className={`${styles.book} ${styles.thirteenth}`}></div>
          <div className={`${styles.book} ${styles.fourteenth}`}></div>
          <div className={`${styles.book} ${styles.fifteenth}`}></div>
          <div className={`${styles.book} ${styles.sixteenth}`}></div>
        </div>
      </div>
    </Link>
  );
};

export default FictionShelf;
