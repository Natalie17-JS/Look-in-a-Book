import { gql } from "@apollo/client";

export const GET_BOOKS = gql `
    query getBooks {
        getBooks {
            id
            title
            annotation
            slug
            author {
                username
            }
            createdAt
        }
    }
`

export const GET_BOOK_BY_SLUG = gql`
  query GetBookBySlug($slug: String!) {
    getBookBySlug(slug: $slug) {
      id
      title
      annotation
      cover
      slug
      genre
      category
      writingStatus
      author {
        id
        username
      }
    }
  }
`;

export const GET_BOOK_DRAFTS = gql`
  query GetBookDrafts {
    getBookDrafts {
      id
      title
      annotation
      cover
      slug
      genre
      category
      writingStatus
      author {
        id
        username
      }
    }
  }
`
