"use client";

import Image from "next/image";
import notebookday from "@/images/notebook-day.svg";
import notebooknight from "@/images/notebook-night.svg";
import { useTheme } from "@/app/context/themeContext";
import styles from "./componentsStyles/Notebook.module.css";

export default function Notebook() {
  const { theme } = useTheme();

  let notebookImage;
  switch (theme) {
    case "dark":
      notebookImage = notebooknight;
      break;
    case "gray":
      notebookImage = notebookday;
      break;
    default:
      notebookImage = notebookday;
  }
  return (
    <div className={styles.notebook}>
      <Image
        src={notebookImage}
        alt="notebook"
        className={styles["notebook-image"]}
      />

      <div className={styles.buttons}>
        <button className={styles["signout-btn"]}>Sign out</button>
        <button className={styles["settings-btn"]}>Edit profile</button>
      </div>
    </div>
  );
}
