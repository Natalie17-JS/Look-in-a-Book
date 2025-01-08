import styles from "./Bookcase.module.css";
import Navbar from "./Navbar/Navbar";
import FictionShelf from "./Fiction/FictionShelf";
import NonFictionShelf from "./Non-fiction/NonFictionShelf";

const Bookcase = () => {
  return (
    <div className={styles.bookcase}>
      <div className={styles.books}>
        <Navbar />
        <FictionShelf />
        <NonFictionShelf />
      </div>
    </div>
  );
};

export default Bookcase;
