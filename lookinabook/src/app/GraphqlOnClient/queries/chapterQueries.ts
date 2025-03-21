import { gql } from "@apollo/client";

export const GET_CHAPTERS = gql`
query getChapters ($bookId: Int!) {
    getChapters(bookId: $bookId) {
        id
        title
        content
        
   
  }
    }
`

export const GET_CHAPTER_DRAFTS = gql`
query GetChapterDrafts($bookId: Int!) {
    getChapterDrafts(bookId: $bookId) {
      id
      title
      content
    }
  }
`

export const GET_CHAPTER_BY_ID = gql`
query GetChapterByID($id: String) {
    getChapterById(id: $id) {
    id
    title
    content
    publishStatus
    }
}
`