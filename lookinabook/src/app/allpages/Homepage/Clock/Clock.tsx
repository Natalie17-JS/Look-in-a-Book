"use client";

import clockday from "@/images/clock-day.svg";
import clockdark from "@/images/clock-night.svg";
import clockgrey from "@/images/clock-grey.svg";
import { useTheme } from "@/app/context/themeContext";
import Image from "next/image";
import styles from "./Clock.module.css";

export default function Clock() {
  const { theme } = useTheme();

  let clockImage;
  switch (theme) {
    case "dark":
      clockImage = clockdark;
      break;
    case "gray":
      clockImage = clockgrey;
      break;
    default:
      clockImage = clockday;
  }

  return (
    <div className={styles.clock}>
      <Image src={clockImage} alt="clock" className={styles["clock-image"]} />
    </div>
    /*<div className='clock'>
<Image src={`${theme === 'dark' ? clockdark : theme === 'gray' ? clockgrey : clock}`} className='clock-day' alt="clock-day"  />
</div>*/
  );
}
