"use client"

import SmallWindow from "./SmallWindow"
import leftshelf from "@/app/images/left-books-shelf.svg"
import rightshelf from "@/app/images/right-books-shelf.svg"
import Image from "next/image"
import styles from "./BookShelves.module.css"
import { getThemeClass } from "@/app/themeclass"
import { useTheme } from "@/app/context/themeContext"

export default function LibraryUpperPart() {
    const {theme} = useTheme()
    const themeClass = getThemeClass(theme, styles);

    return (
        <div className={`${styles["shelves-window"]} ${themeClass}`}>
            <div className={styles["left-shelf"]}>
              <Image src={leftshelf} alt="left-shelf" className={styles["left-books-shelf"]} />
            </div>
            <SmallWindow/>
            <div className={styles["right-shelf"]}>
            <Image src={rightshelf} alt="right-shelf" className={styles["right-books-shelf"]} />
            </div>
          </div>
    )
}