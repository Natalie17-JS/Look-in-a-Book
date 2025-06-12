"use client"

import House from "./components/House"
import welcome from "@/app/images/lib-welcome.svg"
import grass from "@/app/images/kusty-right.svg"
import styles from "./MainPage.module.css"
import Image from "next/image"

export default function AboutUsPage() {

    return(
        <div className={styles["house-page-container"]}>
            <div className={styles["house-welcome"]}>
                <House/>

                <div className={styles.welcome}>
                    <Image src={welcome} alt="welcome" className={styles["welcome-image"]}/>
                </div>
            </div>
            
            <div className={styles.grass}>
        <Image src={grass} alt="grass" className={styles["grass-image"]}/>
            </div>
        </div>

    )
}