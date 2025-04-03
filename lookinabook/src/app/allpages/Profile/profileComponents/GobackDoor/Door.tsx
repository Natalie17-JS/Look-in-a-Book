"use client";

import doorday from "@/app/images/go-back-door-day.svg";
import doornight from "@/app/images/go-back-door-night.svg";
import { useTheme } from "@/app/context/themeContext";
import Image from "next/image";

import styles from "./GobackDoor.module.css";

export default function Door() {
  const { theme } = useTheme();

  let doorImage;
  switch (theme) {
    case "dark":
      doorImage = doornight;
      break;
    case "gray":
      doorImage = doorday;
      break;
    default:
      doorImage = doorday;
  }

  return (
   
      <div className={styles.door}>
       
          <Image
            src={doorImage}
            alt="go-back-door"
            className={styles["gobackdoor-image"]}
          />
       
      </div>
    
  );
}
