"use client"

import CreatePost from "./components/CreatePost";
import Link from "next/link";
import { useTheme } from "@/app/context/themeContext";
import { getThemeClass } from "@/app/themeclass";
import styles from "./MainPage.module.css"
import SideShelf from "../../profileComponents/SideShelf/SideShelf";
import GoBackDoor from "./GoBackDoor";

export default function NewPost() {
  const {theme} = useTheme()
  const themeClass = getThemeClass(theme, styles);

  return (
    <div className={`${styles["new-post-container"]} ${themeClass}`}>
      <CreatePost />

      <div className={styles["shelf-door"]}>
      <SideShelf/>
      <GoBackDoor/> 
</div>
  </div>
  );
}
