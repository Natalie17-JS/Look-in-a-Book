import Door from "@/app/allpages/profile/profileComponents/GobackDoor/Door";
import Link from "next/link";
import styles from "./GoBackDoor.module.css"

export default function GoBackDoor() {

    return(
        <Link href="/allpages/books">
         <Door
                        className={styles["goback-door"]}
                        imageClassName={styles["goback-door-image"]}
                      />
        </Link>
    )
}