"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@apollo/client";
import { GET_BOOK_BY_SLUG } from "@/app/GraphqlOnClient/queries/bookQueries";
//import { Book } from "@/app/types/bookTypes";

export default function BookPage() {
  const params = useParams(); // Получаем slug
  console.log("Params:", params); // Проверь в консоли

  const slug = params?.slug; // Достаем slug
  if (!slug) return <p>Loading...</p>; // Защита от undefined

  const { data, loading, error } = useQuery(GET_BOOK_BY_SLUG, {
    skip: !slug, // Не делаем запрос, если slug нет
    variables: { slug },
    onCompleted: (data) => console.log("Book data:", data), // ✅ Логируем ответ
  onError: (err) => console.error("GraphQL Error:", err), // ✅ Логируем ошибку
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading book.</p>;

  console.log("Final data:", data); // 🔍 Проверяем, что приходит в data

  // Проверяем, что data не undefined
  if (!data) {
    return <p>Book not found.</p>;
  }

  const { title, annotation, author } = data.getBookBySlug;

  return (
    <div>
      <h1>Title: {title}</h1>
      <p>{annotation || "No annotation available"}</p>
      <p>Author: {author?.username || "Unknown"}</p>
    </div>
  );
}
