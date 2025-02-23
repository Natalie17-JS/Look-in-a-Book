"use client";

import Image from "next/image";
import notebookday from "@/app/images/notebook-day.svg";
import notebooknight from "@/app/images/notebook-night.svg";
import { useTheme } from "@/app/context/themeContext";
import styles from "./Notebook.module.css";
import Link from "next/link";
import LogoutButton from "../Logout/LogoutButton";

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
      <LogoutButton className={styles["signout-btn"]} />
        <Link href="/allpages/profile/edit-profile">
          <button className={styles["settings-btn"]}>Edit profile</button>
        </Link>
      </div>
    </div>
  );
}
