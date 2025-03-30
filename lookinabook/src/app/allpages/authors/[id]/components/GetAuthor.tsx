"use client"

import { useQuery } from "@apollo/client"
import { GET_USER_BY_ID } from "@/app/GraphqlOnClient/queries/userQueries"
//import { useEffect } from "react"
import { useParams } from "next/navigation";
import { formatLastActive } from "./LastActive";
import { Book } from "@/app/types/bookTypes";

export default function GetAuthor() {
    const params = useParams();
  const userId = Number(params.id); 

  const { data, loading, error } = useQuery(GET_USER_BY_ID, {
    variables: { id: userId },
    skip: !userId,
    pollInterval: 10000, // Обновляет данные каждые 10 секунд
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data?.getUser) return <p>User not found</p>;

  const user = data.getUser;
  console.log(user);


  return (
    <div>
      <h2>{user.username}</h2>
      <p>
        {user.isOnline ? (
          <span>🟢 At office</span>
        ) : (
          <span>{formatLastActive(user.lastActive)}</span>
        )}
      </p>
      <h3>Books:</h3>
      <ul>
        {user.books.map((book: Book) => (
          <li key={book.id}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
};

