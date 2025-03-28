"use client"

import { useChapter } from "@/app/context/chapterContext"  

export default function Chapter() {
    const { currentChapter } = useChapter()
    console.log("Chapter is:", currentChapter?.id)

    if (!currentChapter) return <p>Loading...</p>

    return (
        <div>
            <h1>{currentChapter.title}</h1>
            <p>{currentChapter.content}</p>
        </div>
    )
}

