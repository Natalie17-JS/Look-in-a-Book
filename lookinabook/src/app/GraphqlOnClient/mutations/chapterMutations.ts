import { gql } from "@apollo/client";

export const CREATE_CHAPTER = gql `
mutation createChapter(
  $title: String!, 
  $content: String!, 
  $publishStatus: String!, 
  $bookId: Int!
) {
  createChapter(
    title: $title,
    content: $content,
    publishStatus: $publishStatus,
    bookId: $bookId
  ) {
    id
    title
    content
    publishStatus
    bookId
    createdAt
    updatedAt
  }
}
`