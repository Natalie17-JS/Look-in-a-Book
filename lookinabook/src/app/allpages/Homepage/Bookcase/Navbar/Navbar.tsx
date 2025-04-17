import styles from "./Navbar.module.css";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className={styles["navbar-shelf"]}>
      <div className={styles.menu}>
        <div className={styles.menubox}>
          <div className={styles.tag}></div>
          <p>About us</p>
        </div>

        <Link href="/allpages/books">
        <div className={styles.menubox}>
          <div className={styles.tag}></div>
          <p>Books</p>
        </div>
        </Link>

        <Link href="/allpages/authors">
        <div className={styles.menubox}>
          <div className={styles.tag}></div>
          <p>Authors</p>
        </div>
        </Link>
        
        <Link href="/allpages/blog">
        <div className={styles.menubox}>
          <div className={styles.tag}></div>
          <p>Blog</p>
        </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
