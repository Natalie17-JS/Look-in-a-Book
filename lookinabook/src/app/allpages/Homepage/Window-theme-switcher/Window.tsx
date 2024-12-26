import Image from "next/image";
import windows from "@/images/windows.svg";
import cloudsPicture from "@/images/clouds-picture.svg";
import dayPicture from "@/images/day-picture.svg";
import nightPicture from "@/images/night-picture.svg";
import styles from "./ThemeSwitcher.module.css";

interface WindowProps {
  activeImage: number | null;
}

const Window: React.FC<WindowProps> = ({ activeImage }) => {
  return (
    <div className={styles["windows-container"]}>
      {activeImage === 0 && (
        <Image
          src={dayPicture}
          className={styles["image-in-windows"]}
          alt="Day"
        />
      )}
      {activeImage === 1 && (
        <Image
          src={cloudsPicture}
          className={styles["image-in-windows"]}
          alt="Clouds"
        />
      )}
      {activeImage === 2 && (
        <Image
          src={nightPicture}
          className={styles["image-in-windows"]}
          alt="Night"
        />
      )}
      <Image src={windows} alt="windows" className={styles.windows} />
    </div>
  );
};

export default Window;
