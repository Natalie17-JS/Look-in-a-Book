"use client"

import CursivText from "@/app/allpages/authors/components/CursivText"
import styles from "./Text.module.css"

export default function WelcomeText() {

    return(
        <div className={styles["welcome-text-container"]}>
             <CursivText className={styles.cursivtext}>
                <p>Sleep, eat and cook... </p>
                <p>But don't forget to look in a book!</p>
             </CursivText>
        </div>
    )
}