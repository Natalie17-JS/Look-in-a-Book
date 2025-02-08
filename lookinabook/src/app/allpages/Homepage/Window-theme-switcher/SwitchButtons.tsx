import Image from "next/image";
import { useState, useEffect } from "react";
import cloudsSwitcher from "@/app/images/clouds-switcher.svg";
import sunSwitcher from "@/app/images/sun-switcher.svg";
import moonSwitcher from "@/app/images/moon-switcher.svg";
import { useTheme } from "@/app/context/themeContext";
import styles from "./ThemeSwitcher.module.css";

interface SwitchButtonsProps {
  onSwitch: (imageIndex: number) => void; // Функция для переключения, принимает индекс изображения
}

const SwitchButtons: React.FC<SwitchButtonsProps> = ({ onSwitch }) => {
  const { theme, toggleTheme } = useTheme();
  const [activeButton, setActiveButton] = useState<number | null>(null); // Индекс активной кнопки
  const [buttonClicked, setButtonClicked] = useState<boolean>(false);

  useEffect(() => {
    if (theme === "light") {
      setActiveButton(0);
    } else if (theme === "gray") {
      setActiveButton(1);
    } else if (theme === "dark") {
      setActiveButton(2);
    }
  }, [theme]);

  const handleSwitch = (imageIndex: number) => {
    if (imageIndex !== activeButton || !buttonClicked) {
      onSwitch(imageIndex);
      setButtonClicked(true);
      setActiveButton(imageIndex);
      toggleTheme(
        imageIndex === 0 ? "light" : imageIndex === 1 ? "gray" : "dark"
      );
    }
  };

  return (
    <div className={styles["switch-btn-container"]}>
      <button
        className={`${styles["switch-btn"]} ${
          activeButton === 0 ? styles["active"] : ""
        }`}
        onClick={() => handleSwitch(0)}
      >
        <Image
          src={sunSwitcher}
          alt="Sun"
          className={styles["switchbtn-image"]}
          priority 
        />
      </button>
      <button
        className={`${styles["switch-btn"]} ${
          activeButton === 1 ? styles["active"] : ""
        }`}
        onClick={() => handleSwitch(1)}
      >
        <Image
          src={cloudsSwitcher}
          alt="Clouds"
          className={styles["switchbtn-image"]}
        />
      </button>
      <button
        className={`${styles["switch-btn"]} ${
          activeButton === 2 ? styles["active"] : ""
        }`}
        onClick={() => handleSwitch(2)}
      >
        <Image
          src={moonSwitcher}
          alt="Night"
          className={styles["switchbtn-image"]}
        />
      </button>
    </div>
  );
};

export default SwitchButtons;
