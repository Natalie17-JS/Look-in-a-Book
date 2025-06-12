"use client";

import doorday from "@/app/images/door-day.svg";
import doornight from "@/app/images/door-night.svg";
import { useTheme} from "@/app/context/themeContext"
import Image from "next/image";
import Link from "next/link";
import styles from "./Door.module.css";
import { useUser } from "@/app/context/authContext"
import SignInModal from "../Signin-modal-window/SignInModal";
import { useState } from "react";

export default function Door() {
  const { theme } = useTheme();
  const {user} = useUser();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

  const handleClick = () => {
    if (!user) {
      setIsModalOpen(true); // Открываем модальное окно, если пользователь не авторизован
    }
  };

  return (
    <>
      {user ? (
        <Link href="/allpages/profile">
          <div className={styles["door-container"]}>
            <div className={styles.door}>
              <Image src={doorImage} alt="door" className={styles["door-image"]} />
            </div>
          </div>
        </Link>
      ) : (
        <div onClick={handleClick} className={styles["door-container"]}>
          <div className={styles.door}>
            <Image src={doorImage} alt="door" className={styles["door-image"]} />
          </div>
        </div>
      )}

      {/* Окно логина */}
      <SignInModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
