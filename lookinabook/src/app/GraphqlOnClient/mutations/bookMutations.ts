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


export const UPDATE_BOOK = gql`
  mutation UpdateBook(
  $id: ID!, 
  $title: String!, 
  $annotation: String, 
  $cover: String,
  $category: Category, 
  $genre: Genre,
  $publishStatus: PStatus!,
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

export const DELETE_BOOK = gql`
  mutation DeleteBook($id: String!) {
  deleteBook(id: $id) {
    message
  }
}
`