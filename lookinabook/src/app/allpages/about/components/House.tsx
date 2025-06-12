"use client";

import dayhouse from "@/app/images/house-day.svg"
import cloudshouse from "@/app/images/house-clouds.svg"
import nighthouse from "@/app/images/house-night.svg"
import { useTheme } from "@/app/context/themeContext"
import Image from "next/image";
import styles from "./House.module.css";

export default function House() {
  const { theme } = useTheme();

  let houseImage;
  switch (theme) {
    case "dark":
      houseImage = nighthouse;
      break;
    case "gray":
      houseImage = cloudshouse;
      break;
    default:
      houseImage = dayhouse;
  }

  return (
    <div className={styles.house}>
      <Image src={houseImage} alt="house" className={styles["house-image"]} />
    </div>
  );
}
