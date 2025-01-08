import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles["navbar-shelf"]}>
      <div className={styles.menu}>
        <div className={styles.menubox}>
          <div className={styles.tag}></div>
          <p>About us</p>
        </div>
        <div className={styles.menubox}>
          <div className={styles.tag}></div>
          <p>Books</p>
        </div>
        <div className={styles.menubox}>
          <div className={styles.tag}></div>
          <p>Authors</p>
        </div>
        <div className={styles.menubox}>
          <div className={styles.tag}></div>
          <p>Blog</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
