"use client"

import Door from "@/app/allpages/profile/profileComponents/GobackDoor/Door";
import styles from "./GoBackDoor.module.css"
import Link from "next/link";
import { useBook } from "@/app/context/bookContext";

export default function GoBackDoor() {
    const {currentBook} = useBook()

    return(
        <Link href={`/allpages/profile/my-books/${currentBook?.slug}/chapters`}>
       <Door
                className={styles["goback-door"]}
                imageClassName={styles["goback-door-image"]}
              />
        </Link>
    )
}