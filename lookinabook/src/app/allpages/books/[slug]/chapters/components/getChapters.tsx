"use client"

import { useQuery } from "@apollo/client"
import { GET_CHAPTERS_BY_BOOKSLUG } from "@/app/GraphqlOnClient/queries/chapterQueries"
import { ChaptersData } from "@/app/types/chapterTypes"
import { useBook } from "@/app/context/bookContext"
import Link from "next/link"
import { useUser } from "@/app/context/authContext"
import styles from "./Chapters.module.css"
import SmallWindow from "../../components/SmallWindow"

const Chapters = () => {
    const { currentBook } = useBook(); 
    const { user } = useUser();
    const slug = currentBook?.slug;
    console.log(slug)

    const { loading, error, data } = useQuery<ChaptersData>(GET_CHAPTERS_BY_BOOKSLUG, {
        skip: !slug, // Пропускаем запрос, если book slug отсутствует
        variables: { slug }, // Передаём book slug в запрос
    })
    
if (!slug) return <p>Select a book to view chapters.</p>;
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

     // Проверяем, является ли текущий пользователь автором книги
     const isAuthor = user && currentBook?.author.id === user.id;
    

        return (
            <div className={styles["chapters-container"]}>
                <SmallWindow/>

                <div className={styles["chapters-list-container"]}>
                    <h1>Chapters</h1>
                {data?.getChaptersByBookSlug ? (
                    <ul className={styles["chapters-list"]}>
                        {data?.getChaptersByBookSlug.map(chapter => (
                            <li key={chapter.id}>
                                <Link href={`/allpages/books/${currentBook.slug}/chapters/${chapter.id}`}>
                                    <p>{chapter.title}</p>
                                </Link>
                               
                                <p>{chapter.content}</p>
                                <p>{chapter.publishStatus}</p>
                            </li>
                            
                        ))}
                    </ul>
                ) : (
                    <p>No chapters found. Create a first one.</p>
                )}
               <Link href={`/allpages/books/${currentBook.slug}`}>
                <button>Back to Book page</button>
            </Link>

            {isAuthor && (
                <Link href={`/allpages/books/${currentBook.slug}/chapters/add-chapter`}>
                    <button>Add chapter</button>
                </Link>
            )}

</div>
           
            </div>
        );
}

export default Chapters