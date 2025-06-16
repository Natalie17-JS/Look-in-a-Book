"use client"

import curtain from "@/app/images/curtain.svg"
import overcurtain from "@/app/images/overcurtain.svg"
import Image from "next/image"
import styles from "./Curtain.module.css"

export default function Curtain() {

    return(
        <div className={styles.curtain}>
        <div className={styles["curtain-container"]}>
            <Image src={curtain} alt="curtain" className={styles["curtain-image"]}/>

            <div className={styles["overcurtain-container"]}>
                <Image src={overcurtain} alt="overcurtain" className={styles["overcurtain-image"]}/>
            </div>
        </div>
        </div>
    )
}