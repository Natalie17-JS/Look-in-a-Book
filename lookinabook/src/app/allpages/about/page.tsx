"use client"

import House from "./components/House"
import welcome from "@/app/images/lib-welcome.svg"

import styles from "./MainPage.module.css"
import Image from "next/image"
import { useTheme } from "@/app/context/themeContext"
import { getThemeClass } from "@/app/themeclass"
import Link from "next/link"

export default function AboutUsPage() {
     const { theme } = useTheme()
    const themeClass = getThemeClass(theme, styles)
      

    return(
        <div className={`${styles["house-page-container"]} ${themeClass}`}>

            <div className={styles.left}>
            <div className={styles.welcome}>
                    <Image src={welcome} alt="welcome" className={styles["welcome-image"]}/>
                </div>

                    <House/>
                    </div>

                    <div className={styles.about}>
                        <div className={styles["about-info"]}>
                            <p className={styles["welcome-text"]}>Welcome to </p>
                        </div>
                    </div>

                    <Link href="/">
                    <button>Back</button>
                    </Link>

        </div>

    )
}