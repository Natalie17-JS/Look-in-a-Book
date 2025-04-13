import { gql } from "@apollo/client";

export const CREATE_CHAPTER_WITH_BOOKID = gql `
mutation createChapterWithBookId(
  $title: String!, 
  $content: String!, 
  $publishStatus: PStatus!, 
  $bookId: Int!
) {
  createChapterWithBookId(
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
  $publishStatus: PStatus!, 
  $slug: String!
) {
  createChapterWithBookSlug(
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
    
  }
}
`

export const PUBLISH_CHAPTER = gql`
  mutation PublishChapter($id: String!) {
    publishChapter(id: $id) {
      id
      title
      publishStatus
      updatedAt
    }
  }
`;

export const DELETE_CHAPTER = gql`
mutation DeleteChapter($id: String!) {
  deleteChapter(id: $id) {
    message
  }
}
`
export const EDIT_CHAPTER = gql `
mutation editChapter(
  $id: String!
  $title: String, 
  $content: String, 
  $publishStatus: PStatus, 
) {
  editChapter(
    id:  $id,
    title: $title,
    content: $content,
    publishStatus: $publishStatus,
  ) {
    id
    title
    content
    publishStatus
    createdAt
    
  }
}

`


