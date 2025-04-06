"use client"

import { useChapter } from "@/app/context/chapterContext"  
import styles from "./Chapter.module.css"
import Link from "next/link"
import { useBook } from "@/app/context/bookContext"

export default function AuthorBookChapter() {
    const { currentChapter } = useChapter()
    const{currentBook} = useBook()
    const slug = currentBook?.slug
    console.log("Chapter is:", currentChapter?.id)

    if (!currentChapter) return <p>Loading...</p>

    return (
        <div className={styles["chapter-inwardly-container"]}>
            <h1 className={styles["chapter-title"]}>{currentChapter.title}</h1>
            <p className={styles["chapter-content"]}>{currentChapter.content}</p>

<Link href={`/allpages/profile/my-books/${slug}/chapters`}>
            <button>Back to chapters page</button>
            </Link>
        </div>
    )
}

