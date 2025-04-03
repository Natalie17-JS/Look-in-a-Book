import Door from "./Door";
import styles from "./GobackDoor.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function GoBackDoor() {

    const router = useRouter();
  return (
    <div className={styles.gobackdoor} onClick={() => router.push("/")}>
      <Door />
    </div>
  );
}