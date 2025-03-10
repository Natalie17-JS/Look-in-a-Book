import { gql } from "@apollo/client";

export const CREATE_BOOK = gql`
  mutation CreateBook(
  $title: String!, 
  $annotation: String, 
  $cover: String, 
  $category: Category!, 
  $genre: Genre! 
  $publishStatus: PublishStatus!,
  $writingStatus: WritingStatus!
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
  $writingStatus: WritingStatus
  ) {
    updateBook(
    id: $id, 
    title: $title, 
    annotation: $annotation
    cover: $cover,
    writingStatus: $writingStatus,
    ) {
      id
      title
      annotation
      cover
      writingStatus
    }
  }
`;