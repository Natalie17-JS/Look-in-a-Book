import styles from "./SideShelf.module.css"
import Image from "next/image"
import flowers from "@/app/images/flowers-on-shelf-1.svg"

export default function SideShelf() {

    return (
        <div className={styles["sideshelf-container"]}>
            
            <div className={styles.flowers}>
            <Image
              src={flowers}
              alt="flowers"
              className={styles["flowers-image"]}
            ></Image>
          </div>
            </div>
            
                
          

    )
}