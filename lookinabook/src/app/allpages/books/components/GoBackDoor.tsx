import Door from "@/app/allpages/profile/profileComponents/GobackDoor/Door";
import styles from "./GoBackDoor.module.css"
import Link from "next/link";

export default function GoBackDoor() {

    return(
        <Link href="/">
       <Door
                className={styles["goback-door"]}
                imageClassName={styles["goback-door-image"]}
              />
        </Link>
    )
}