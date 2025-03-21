"use client"

import { useQuery } from "@apollo/client"
import { GET_CHAPTERS } from "@/app/GraphqlOnClient/queries/chapterQueries"
import { ChaptersData } from "@/app/types/chapterTypes"
import { useBook } from "@/app/context/bookContext"
import Link from "next/link"

const Chapters = () => {
    const { currentBook } = useBook(); 
    const bookId = currentBook?.id;
    console.log(bookId)

    const { loading, error, data } = useQuery<ChaptersData>(GET_CHAPTERS, {
        skip: !bookId, // Пропускаем запрос, если bookId отсутствует
        variables: { bookId }, // Передаём bookId в запрос
    })
    
if (!bookId) return <p>Select a book to view chapters.</p>;
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    

        return (
            <div>
                {data?.chapters ? (
                    <ul>
                        {data?.chapters.map(chapter => (
                            <li key={chapter.id}>
                                <p>{chapter.title}</p>
                                <p>{chapter.content}</p>
                            </li>
                            
                        ))}
                    </ul>
                ) : (
                    <p>No chapters found. Create a first one.</p>
                )}
               <Link href={`/allpages/books/${currentBook.slug}`}>
                <button>Back to Books page</button>
            </Link>

            <Link href={`/allpages/books/${currentBook.slug}/add-chapter`}>
                <button>Add chapter</button>
            </Link>
           
            </div>
        );
}

export default Chapters