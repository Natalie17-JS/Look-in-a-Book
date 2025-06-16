"use client";

import React, { useState } from "react";
import tumbaday from "@/app/images/tumba-day.svg";
import tumbanight from "@/app/images/tumba-night.svg";
import Image from "next/image";

import { useTheme } from "@/app/context/themeContext";
import styles from "./Tumba.module.css";

export default function Tumba() {

  const { theme } = useTheme();

  let tumbaImage;
  switch (theme) {
    case "dark":
      tumbaImage = tumbanight;
      break;
    case "gray":
      tumbaImage = tumbaday;
      break;
    default:
      tumbaImage = tumbaday;
  }

  return (
    <div className={styles["tumba-container"]}>
     
        <Image
          src={tumbaImage}
          className={styles["tumba-image"]}
          alt="tumba"
        />
      </div>
      
  );
}
