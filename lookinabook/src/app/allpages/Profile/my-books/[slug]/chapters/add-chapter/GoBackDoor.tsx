"use client"

import Door from "@/app/allpages/profile/profileComponents/GobackDoor/Door";
import Link from "next/link";
import styles from "./GoBackDoor.module.css"
import { useBook } from "@/app/context/bookContext";

export default function GoBackDoor() {
     const { currentBook } = useBook();
        const slug = currentBook?.slug;
        if (!slug) {
            return <p>Book not found</p>;
        }

    return(
        <Link href={`/allpages/profile/my-books/${slug}/chapters`}>
        <div className={styles["goback-door"]}>
            <Door />
        </div>
        </Link>
    )
}