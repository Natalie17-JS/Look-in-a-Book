"use client";

import doorday from "@/app/images/go-back-door-day.svg";
import doornight from "@/app/images/go-back-door-night.svg";
import { useTheme } from "@/app/context/themeContext";
import Image from "next/image";
import Link from "next/link";
import styles from "./GobackDoor.module.css";

export default function GoBackDoor() {
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
    <div className={styles.gobackdoor}>
      <div className={styles.door}>
        <Link href="/">
          <Image
            src={doorImage}
            alt="go-back-door"
            className={styles["gobackdoor-image"]}
          />
        </Link>
      </div>
    </div>
  );
}
