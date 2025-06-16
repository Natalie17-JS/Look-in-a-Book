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
                            <p className={styles["welcome-text"]}>Welcome to the project <span className={styles.libtext}> Look in a book</span>! Here, you will be able to unlock your potential and try something you've long dreamed of — writing your first book and receiving honest feedback on it. You will find like-minded people, friends, and inspiration for your creativity. Improve your craft and help others do the same — together with us!</p>
                        </div>
                    </div>

                    <Link href="/">
                    <button className={styles["back-btn"]}>Back</button>
                    </Link>

        </div>

    )
}