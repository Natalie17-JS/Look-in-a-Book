"use client";

import dayuserwindow from "@/app/images/user-window-day.svg"
import cloudsuserwindow from "@/app/images/user-window-clouds.svg"
import nightuserwindow from "@/app/images/user-window-night.svg"
import { useTheme } from "@/app/context/themeContext"
import Image from "next/image";
import styles from "./UserWindow.module.css";

export default function UserWindow() {
  const { theme } = useTheme();

  let windowImage;
  switch (theme) {
    case "dark":
      windowImage = nightuserwindow;
      break;
    case "gray":
      windowImage = cloudsuserwindow;
      break;
    default:
      windowImage = dayuserwindow;
  }

  return (
    <div className={styles["user-window"]}>
      <Image src={windowImage} alt="user-window" className={styles["user-window-image"]} />
    </div>
  );
}
