"use client";

import dayroof from "@/app/images/house-roof-day.svg"
import cloudsroof from "@/app/images/house-roof-clouds.svg"
import nightroof from "@/app/images/house-roof-night.svg"
import { useTheme } from "@/app/context/themeContext"
import Image from "next/image";
import styles from "./Roof.module.css";

export default function Roof() {
  const { theme } = useTheme();

  let roofImage;
  switch (theme) {
    case "dark":
      roofImage = nightroof;
      break;
    case "gray":
      roofImage = cloudsroof;
      break;
    default:
      roofImage = dayroof;
  }

  return (
    <div className={styles.roof}>
      <Image src={roofImage} alt="roof" className={styles["roof-image"]} />
    </div>
  );
}
