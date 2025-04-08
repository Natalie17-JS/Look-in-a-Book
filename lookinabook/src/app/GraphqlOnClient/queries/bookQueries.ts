import { gql } from "@apollo/client";

export const GET_BOOKS = gql `
    query getBooks {
        getBooks {
            id
            title
            annotation
            slug
            writingStatus
            author {
                id
                username
            }
            createdAt
        }
    }
`

export const GET_AUTHOR_BOOKS = gql `
  query GetMyBooks {
    getMyBooks {
      id
      title
      annotation
      slug
      genre
      category
      writingStatus
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
      publishStatus
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
