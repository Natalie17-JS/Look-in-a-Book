"use client";

import sidewindowday from "@/images/long-window-day.svg";
import sidewindowclouds from "@/images/long-window-clouds.svg";
import sidewindownight from "@/images/long-window-night.svg";
import { useTheme } from "@/app/context/themeContext";
import Image from "next/image";
import styles from "./Sidewindow.module.css";

export default function SideWindow() {
  const { theme } = useTheme();

  let sidewindowimage;
  switch (theme) {
    case "dark":
      sidewindowimage = sidewindownight;
      break;
    case "gray":
      sidewindowimage = sidewindowclouds;
      break;
    case "light":
      sidewindowimage = sidewindowday;
      break;
  }
  return (
    <div
      className={`${styles["sidewindow"]} 
    ${
      theme === "dark"
        ? styles["dark"]
        : theme === "gray"
        ? styles["gray"]
        : styles["light"]
    }`}
    >
      <Image
        src={sidewindowimage}
        alt="sidewindow"
        className={styles["sidewindow-image"]}
      />
    </div>
  );
}
