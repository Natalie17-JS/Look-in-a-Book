"use client"

import Image from "next/image"
import window from "@/app/images/small-window.svg"
import sunView from "@/app/images/small-window-day.svg"
import cloudsView from "@/app/images/small-window-clouds.svg"
import nightView from "@/app/images/small-window-night.svg"
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
  
   
    <Image src={viewImage} alt="window-view" className={styles["window-view-image"]} />

)
}