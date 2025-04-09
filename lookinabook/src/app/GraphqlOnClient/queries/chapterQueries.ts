import { gql } from "@apollo/client";

export const GET_CHAPTERS_BY_BOOKID = gql`
query GetChaptersByBookId ($bookId: Int!) {
    getChaptersByBookId(bookId: $bookId) {
        id
        title
        content
        publishStatus
   
  }
    }
`

export const GET_CHAPTERS_BY_BOOKSLUG = gql`
query GetChaptersByBookSlug ($slug: String!) {
    getChaptersByBookSlug(slug: $slug) {
        id
        title
        content
        publishStatus
   
  }
    }
`

export const GET_CHAPTER_DRAFTS = gql`
query GetChapterDrafts($bookId: Int!) {
    getChapterDrafts(bookId: $bookId) {
      id
      title
      content
      publishStatus
    }
  }
`

export const GET_AUTHORBOOK_CHAPTERS = gql`
  query GetAuthorBookChapters($slug: String!) {
    getAuthorBookChapters(slug: $slug) {
    id
    title
    content
    publishStatus
    }
    }
`

export const GET_CHAPTER_BY_ID = gql`
query GetChapterByID($id: String!) {
    getChapterById(id: $id) {
    id
    title
    content
    publishStatus
   createdAt
    }
}
`