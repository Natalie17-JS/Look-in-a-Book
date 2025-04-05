"use client";

import { useQuery } from "@apollo/client";
import { GET_AUTHOR_BOOKS } from "@/app/GraphqlOnClient/queries/bookQueries";
import { useUser } from "@/app/context/authContext";
import { Book } from "@/app/types/bookTypes";
import Link from "next/link";

const AuthorBooks = () => {
    const { user, loading: userLoading } = useUser();

    if (userLoading) return <p>Loading user...</p>;
    if (!user) return <p>You must be logged in to view books.</p>; // Проверяем авторизацию

    const accessToken = localStorage.getItem("token");
    const { loading, error, data } = useQuery(GET_AUTHOR_BOOKS, {
        context: {
            headers: {
              Authorization: accessToken ? `Bearer ${accessToken}` : "", 
            },
          }
        //skip: !user, // Пропускаем запрос, если нет пользователя
    });

    if (loading) return <p>Loading books...</p>;
    if (error) return <p>Error loading books</p>;

    return (
        <div>
            <h1>My Books</h1>
            {data?.getMyBooks?.length > 0 ? (
                data.getMyBooks.map((book: Book) => (
                    <ul>
                    <Link href={`/allpages/profile/my-books/${book.slug}`}>
                       
                    <li key={book.id}>
                        <h2>{book.title}</h2>
                    </li>
                   
                    </Link>
                    </ul>
                ))
            ) : (
                <p>No books</p>
            )}
        </div>
    );
};

export default AuthorBooks;
