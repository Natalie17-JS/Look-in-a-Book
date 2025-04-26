import Door from "./Door";
import styles from "./GobackDoor.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function GoBackDoor() {
  return (
    <Link href="/">
      <Door
        className={styles.gobackdoor}
        imageClassName={styles["goback-door-image"]}
      />
    </Link>
  );
}