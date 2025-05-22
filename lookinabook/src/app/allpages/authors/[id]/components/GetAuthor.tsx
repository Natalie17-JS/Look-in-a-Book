"use client"

import { useQuery } from "@apollo/client"
import { GET_USER_BY_ID } from "@/app/GraphqlOnClient/queries/userQueries"
//import { useEffect } from "react"
import { useParams } from "next/navigation";
import { formatLastActive } from "./LastActive";
import { Book } from "@/app/types/bookTypes";
import { Post } from "@/app/types/postTypes";

export default function GetAuthor() {
    const params = useParams();
  const userId = Number(params.id); 

  const { data, loading, error } = useQuery(GET_USER_BY_ID, {
    variables: { id: userId },
    skip: !userId,
    fetchPolicy: 'network-only',
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
    {user.books.length > 0 ? (
      <ul>
        {user.books.map((book: Book) => (
          <li key={book.id}>{book.title}</li>
        ))}
      </ul>
    ) : (
      <p>No books yet.</p>
    )}

    <h3>Posts:</h3>
    {user.posts.length > 0 ? (
      <ul>
        {user.posts.map((post: Post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    ) : (
      <p>No posts yet.</p>
    )}
  </div>
);

};

