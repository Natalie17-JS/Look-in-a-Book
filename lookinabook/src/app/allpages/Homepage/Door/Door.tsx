"use client";

import doorday from "@/images/door-day.svg";
import doornight from "@/images/door-night.svg";
import { useTheme } from "@/app/context/themeContext";
import Image from "next/image";
import Link from "next/link";
import styles from "./Door.module.css";

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
    <Link href="/allPages/myRoom">
      <div className={styles["door-container"]}>
        <div className={styles.door}>
          <Image src={doorImage} alt="door" className={styles["door-image"]} />

          {/*<div className="room-text-container">
    <p className="door-text">My room</p>
    </div>*/}

          <div className="welcome-text-container">
            <p className="door-text">Hello, writer!</p>
            <p className="door-text">
              Welcome to our community where you can create wonderful things
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
