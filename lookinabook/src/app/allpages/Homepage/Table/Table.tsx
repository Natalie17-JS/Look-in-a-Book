"use client";

import React, { useState } from "react";
import tableday from "@/images/table-day.svg";
import tablenight from "@/images/table-night.svg";
import Image from "next/image";
//import SignInModal from "./SignInModal";
import { useTheme } from "@/app/context/themeContext";
import styles from "./componentsStyles/Table.module.css";

export default function Table() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const { theme } = useTheme();

  let tableImage;
  switch (theme) {
    case "dark":
      tableImage = tablenight;
      break;
    case "gray":
      tableImage = tableday;
      break;
    default:
      tableImage = tableday;
  }

  return (
    <div className={styles["table-container"]}>
      <div onClick={openModal} className={styles.table}>
        <Image
          src={tableImage}
          className={styles["table-image"]}
          alt="table-day"
        />
      </div>
      <SignInModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
