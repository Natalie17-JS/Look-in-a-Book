"use client";

import dayuserwindow from "@/app/images/user-window-day.svg"
import cloudsuserwindow from "@/app/images/user-window-clouds.svg"
//import nightuserwindow from "@/app/images/user-window-night.svg"
import nightuserwindow_online from "@/app/images/user-window-night-online.svg"
import nightuserwindow_offline from "@/app/images/user-window-night-offline.svg"
import { useTheme } from "@/app/context/themeContext"
import Image from "next/image";
import styles from "./UserWindow.module.css";

type UserWindowProps = {
  isOnline: boolean;
};

export default function UserWindow({ isOnline }: UserWindowProps) {
  const { theme } = useTheme();

  let windowImage;

  if (theme === "dark") {
    windowImage = isOnline ? nightuserwindow_online : nightuserwindow_offline;
  } else if (theme === "gray") {
    windowImage = cloudsuserwindow;
  } else {
    windowImage = dayuserwindow;
  }

  return (
    
      <Image
        src={windowImage}
        alt={isOnline ? "User is online" : "User is offline"}
        className={styles["user-window-image"]}
      />
  
  );
}