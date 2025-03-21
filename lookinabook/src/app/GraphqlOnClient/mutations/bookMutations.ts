import { gql } from "@apollo/client";

export const CREATE_BOOK = gql`
  mutation CreateBook(
  $title: String!, 
  $annotation: String, 
  $cover: String, 
  $category: Category!, 
  $genre: Genre! 
  $publishStatus: PStatus!,
  $writingStatus: WStatus!
  ) {
    createBook(
    title: $title, 
    annotation: $annotation, 
    cover: $cover, 
    category: $category, 
    genre: $genre,
    publishStatus: $publishStatus,
    writingStatus: $writingStatus,
    ) {
      title
      annotation
      cover
      category
      genre
      publishStatus
      writingStatus
       author {
        id
        username
      }
    }
  }
`;


export const UPDATE_BOOK_BY_ID = gql`
  mutation UpdateBook(
  $id: ID!, 
  $title: String!, 
  $annotation: String, 
  $cover: String,
  $category: Category, 
  $genre: Genre,
  $publishStatus: PStatus,
  $writingStatus: WStatus
  ) {
    updateBook(
    id: $id, 
    title: $title, 
    annotation: $annotation,
    cover: $cover,
    category: $category, 
    genre: $genre,
    publishStatus: $publishStatus,
    writingStatus: $writingStatus,
    ) {
      id
      title
      annotation
      cover
      category
      genre
      publishStatus
      writingStatus
      updatedAt
    }
  }
`;

export const UPDATE_BOOK_BY_SLUG = gql`
  mutation UpdateBook(
  $slug: String, 
  $title: String, 
  $annotation: String, 
  $cover: String,
  $category: Category, 
  $genre: Genre,
  $publishStatus: PStatus,
  $writingStatus: WStatus
  ) {
    updateBook(
    slug: $slug, 
    title: $title, 
    annotation: $annotation,
    cover: $cover,
    category: $category, 
    genre: $genre,
    publishStatus: $publishStatus,
    writingStatus: $writingStatus,
    ) {
      id
      title
      slug
      annotation
      cover
      category
      genre
      publishStatus
      writingStatus
      updatedAt
    }
  }
`;

export const DELETE_BOOK_BY_ID = gql`
  mutation DeleteBook($id: Int!) {
  deleteBookById(id: $id) {
    message
  }
}
`
export const DELETE_BOOK_BY_SLUG = gql`
  mutation DeleteBook($slug: String!) {
  deleteBookBySlug(slug: $slug) {
    message
  }
}
`

export const PUBLISH_BOOK = gql`
  mutation PublishBook($slug: String!) {
  publishBook(slug: $slug) {
    id
    title
    publishStatus
  }
}
`