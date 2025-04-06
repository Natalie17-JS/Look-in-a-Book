"use client"

import { useQuery } from "@apollo/client"
import { GET_AUTHORBOOK_CHAPTERS } from "@/app/GraphqlOnClient/queries/chapterQueries"
import { useUser } from "@/app/context/authContext"
import { Chapter } from "@/app/types/chapterTypes"
import Link from "next/link"
import { useBook } from "@/app/context/bookContext"
import { GetAuthorBookChaptersData } from "@/app/types/chapterTypes"
import styles from "./Chapters.module.css"

const AuthorBookChapters = () => {
    const { user } = useUser()
     const { currentBook } = useBook();
     const slug = currentBook?.slug;
     console.log(slug)

     const accessToken = localStorage.getItem("token");

    const { loading, error, data } = useQuery<GetAuthorBookChaptersData>(GET_AUTHORBOOK_CHAPTERS, {
        
            context: {
              headers: {
                Authorization: accessToken ? `Bearer ${accessToken}` : "",
              },
            },
            
       skip: !slug, // Пропускаем запрос, если book slug отсутствует
        variables: { slug }, // Передаём book slug в запрос
        
})

    if (loading) return <p>Loading chapters...</p>;
    if (error) return <p>Error loading chapters</p>;

    return (
        <div className={styles["chapters-inwardly-container"]}>
            <h1>Chapters</h1>
            {data?.getAuthorBookChapters ? (
                <ul className={styles["chapters-list"]}>
                {data?.getAuthorBookChapters.map((chapter: Chapter) => (
                    
                        <li className={styles["chapters-item"]} key={chapter.id}>
                             <Link href={`/allpages/profile/my-books/${currentBook?.slug}/chapters/${chapter.id}`}>
                            <p>{chapter.title}</p>
                            </Link>
                        </li>
                    
                ))}
                </ul>
            ) : (
                <p>No chapters found.</p>
            )}

            <Link href={`/allpages/profile/my-books/${slug}`}>
            <button>Back</button>
            </Link>
        </div>
    )

}

export default AuthorBookChapters;