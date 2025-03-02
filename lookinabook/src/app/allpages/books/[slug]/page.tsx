"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@apollo/client";
import { GET_BOOK_BY_SLUG } from "@/app/GraphqlOnClient/queries/bookQueries";
import { Book } from "@/app/types/bookTypes";

export default function BookPage() {
  const { slug } = useParams(); // Получаем slug из URL

  const { data, loading, error } = useQuery<{ book: Book }>(GET_BOOK_BY_SLUG, {
    variables: { slug },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading book.</p>;
  if (!data?.book) return <p>Book not found.</p>;

  const { title, annotation, author } = data.book;

  return (
    <div>
      <h1>{title}</h1>
      <p>{annotation}</p>
      <p>Author: {author.username}</p>
    </div>
  );
}
