import CreateBtn from "../CreateButton/CreateBtn";
import styles from "./Posts.module.css";
import Link from "next/link";

const Posts = () => {
  return (
    <div className={styles["posts-container"]}>
      <Link href="/allpages/profile/new-post">
        <CreateBtn />
      </Link>
      <div className={styles["posts-text"]}>
        <p>Your posts</p>
      </div>
    </div>
  );
};

export default Posts;
