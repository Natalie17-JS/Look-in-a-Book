"use client"

import Image from "next/image"
import sunView from "@/app/images/smallwindow-day.svg"
import cloudsView from "@/app/images/smallwindow-clouds.svg"
import nightView from "@/app/images/smallwindow-night.svg"
import { useTheme } from "@/app/context/themeContext"
import styles from "./SmallWindow.module.css"

export default function SmallWindow() {
const {theme} = useTheme()

let viewImage;
switch (theme) {
  case "dark":
    viewImage = nightView;
    break;
  case "gray":
    viewImage = cloudsView;
    break;
  default:
    viewImage = sunView;
}

return(
  <div className={styles["small-window-container"]}>
    <Image src={viewImage} alt="window-view" className={styles["window-view-image"]} width={180} />
   </div>
)
}