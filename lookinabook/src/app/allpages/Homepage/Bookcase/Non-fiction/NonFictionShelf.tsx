import styles from "./NonFictionShelf.module.css";

const NonFictionShelf = () => {
  return (
  <div className={styles["non-fiction-shelf"]}>
    <p>Fiction books</p>
        <div className={styles.shelf}>
          <div className={styles["book-container"]}>
            <div className={`${styles.book} ${styles.first}`}></div>
          </div>
          <div className={styles["book-container"]}>
            <div className={`${styles.book} ${styles.second}`}></div>
          </div>
          <div className={styles["book-container"]}>
            <div className={`${styles.book} ${styles.third}`}></div>
          </div>
          <div className={styles["book-container"]}>
            <div className={`${styles.book} ${styles.forth}`}></div>
          </div>
          <div className={styles["book-container"]}>
            <div className={`${styles.book} ${styles.fifth}`}></div>
          </div>
          <div className={styles["book-container"]}>
            <div className={`${styles.book} ${styles.sixth}`}></div>
          </div>
          <div className={styles["book-container"]}>
            <div className={`${styles.book} ${styles.seventh}`}></div>
          </div>
          <div className={styles["book-container"]}>
            <div className={`${styles.book} ${styles.eighth}`}></div>
          </div>
          <div className={styles["book-container"]}>
            <div className={`${styles.book} ${styles.ninth}`}></div>
          </div>
          <div className={styles["book-container"]}>
            <div className={`${styles.book} ${styles.tenth}`}></div>
          </div>
          <div className={styles["book-container"]}>
            <div className={`${styles.book} ${styles.eleventh}`}></div>
          </div>
          <div className={styles["book-container"]}>
            <div className={`${styles.book} ${styles.twelfth}`}></div>
          </div>
          <div className={styles["book-container"]}>
            <div className={`${styles.book} ${styles.thirteenth}`}></div>
          </div>
          <div className={styles["book-container"]}>
            <div className={`${styles.book} ${styles.fourteenth}`}></div>
          </div>
          <div className={styles["book-container"]}>
            <div className={`${styles.book} ${styles.fifteenth}`}></div>
          </div>
          <div className={styles["book-container"]}>
            <div className={`${styles.book} ${styles.sixteenth}`}></div>
          </div>
          <div className={styles["book-container"]}>
            <div className={`${styles.book} ${styles.eighteen}`}></div>
          </div>
           <div className={styles["book-container"]}>
            <div className={`${styles.book} ${styles.nineteen}`}></div>
          </div>
           <div className={styles["book-container"]}>
            <div className={`${styles.book} ${styles.twenty}`}></div>
          </div>
        </div>
  </div>

)
  
  
};

export default NonFictionShelf;
