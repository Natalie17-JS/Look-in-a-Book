import Image from "next/image"
import flower from "@/app/images/flowers-on-shelf-1.svg"
import styles from "./CommentsCase.module.css"

export default function CommentsCase() {

    return(
        <div className={styles["comments-case-container"]}>
            <div className={styles["image-wrapper"]}>
            <Image src={flower} alt="flower" className={styles["flower-image"]}/>
            </div>

            <div className={styles["comments-case"]}>

            </div>
        </div>
    )
}