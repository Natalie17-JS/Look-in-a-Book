"use client";

import Shelf from "./profileComponents/Shelf/Shelf";
import Worktable from "./profileComponents/Worktable/Worktable";
import LittleClock from "./profileComponents/LittleClock/LittleClock";
import GoBackDoor from "./profileComponents/GobackDoor/GobackDoor";
import styles from "./MainPage.module.css";
import { useTheme } from "@/app/context/themeContext";

const ProfilePage = () => {
  const { theme } = useTheme();

  const themeClass =
    theme === "dark"
      ? styles["dark"]
      : theme === "gray"
      ? styles["gray"]
      : styles["light"];

  return (
    <div className={`${styles["profile-container"]} ${themeClass}`}>
      <Shelf />
      <Worktable />
      <LittleClock />
      <GoBackDoor />
    </div>
  );
};

export default ProfilePage;
