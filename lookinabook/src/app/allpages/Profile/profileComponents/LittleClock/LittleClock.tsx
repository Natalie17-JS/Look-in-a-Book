"use client";

import styles from "./LittleClock.module.css";
import Image from "next/image";
import littleClockLight from "@/app/images/clock-day.svg";
import littleClockClouds from "@/app/images/clock-grey.svg";
import littleClockNight from "@/app/images/clock-night.svg";
import { useTheme } from "@/app/context/themeContext";

const LittleClock = () => {
  const { theme } = useTheme();

  let littleClockImage;
  switch (theme) {
    case "dark":
      littleClockImage = littleClockNight;
      break;
    case "gray":
      littleClockImage = littleClockClouds;
      break;
    default:
      littleClockImage = littleClockLight;
  }

  return (
    <div className={styles.littleclock}>
      <Image
        src={littleClockImage}
        alt="little-clock"
        className={styles["little-clock-image"]}
      />
    </div>
  );
};

export default LittleClock;
