"use client"

import watsappicon from "@/app/images/wa-icon.png"
import facebookicon from "@/app/images/fb-icon.png"
import mailicon from "@/app/images/mail-icon.png"
import styles from "./Contacts.module.css"
import Image from "next/image"

export default function Contacts() {

    return(
        <div>
            <h3>Our contacts</h3>
        <div className={styles["contacts-container"]}>
            <Image src={facebookicon} alt="FB" className={styles["fb-icon"]}/>
            <Image src={watsappicon} alt="WA" className={styles["wa-icon"]}/>
            <Image src={mailicon} alt="mail" className={styles["mail-icon"]}/>
        </div>
        </div>
    )
}