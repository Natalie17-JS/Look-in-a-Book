import { gql } from "@apollo/client";

export const CREATE_CHAPTER_WITH_BOOKID = gql `
mutation createChapterWithBookId(
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
    createdAt
    updatedAt
  }
}
`
export const CREATE_CHAPTER_WITH_BOOKSLUG = gql `
mutation createChapterWithBookSlug(
  $title: String!, 
  $content: String!, 
  $publishStatus: String!, 
  $slug: String!
) {
  createChapter(
    title: $title,
    content: $content,
    publishStatus: $publishStatus,
    slug: $slug
  ) {
    id
    title
    content
    publishStatus
    createdAt
    updatedAt
  }
}
`