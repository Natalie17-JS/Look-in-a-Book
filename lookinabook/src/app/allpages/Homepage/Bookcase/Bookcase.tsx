import styles from "./Bookcase.module.css";
import Navbar from "./Navbar/Navbar";
import FictionShelf from "./Fiction/FictionShelf";
import NonFictionShelf from "./Non-fiction/NonFictionShelf";
import Contacts from "./contacts/Contacts";
import WelcomeText from "./welcome-text/Text";

const Bookcase = () => {
  return (
    <div className={styles.bookcase}>
      <WelcomeText/>
      <div className={styles.books}>
        <Navbar />
        <FictionShelf />
        <NonFictionShelf />
        <Contacts/>
      </div>
    </div>
  );
};

export default Bookcase;
