"use client"

import { useQuery } from "@apollo/client"
import { GET_AUTHORBOOK_CHAPTERS } from "@/app/GraphqlOnClient/queries/chapterQueries"
import { useUser } from "@/app/context/authContext"
import { Chapter } from "@/app/types/chapterTypes"
import Link from "next/link"
import { useBook } from "@/app/context/bookContext"

const AuthorBookChapters = () => {
    const { user } = useUser()
     const { currentBook } = useBook();
     const slug = currentBook?.slug;
     console.log(slug)

    const { loading, error, data } = useQuery<Chapter[]>(GET_AUTHORBOOK_CHAPTERS, {
       skip: !slug, // Пропускаем запрос, если book slug отсутствует
        variables: { slug }, // Передаём book slug в запрос
        
    })
    if (loading) return <p>Loading chapters...</p>;
    if (error) return <p>Error loading chapters</p>;

    return (
        <div>
            <h1>Chapters</h1>
            {data?.getAuthorBookChapters ? (
                data?.getAuthorBookChapters.map((chapter: Chapter) => (
                    <ul>
                        <li key={chapter.id}>
                            <p>{chapter.title}</p>
                        </li>
                    </ul>
                ))
            )}
        </div>
    )

}