import { gql } from "@apollo/client";

export const CREATE_BOOK = gql`
  mutation CreateBook($title: String!, $annotation: String, $cover: String, $category: Category!, $genre: Genre! ) {
    createBook(title: $title, annotation: $annotation, cover: $cover, category: $category, genre: $genre) {
      title
      annotation
      cover
      category
      genre
       author {
        id
        username
      }
    }
  }
`;


export const UPDATE_BOOK = gql`
  mutation UpdateBook($id: ID!, $title: String!, $annotation: String) {
    updateBook(id: $id, title: $title, annotation: $annotation) {
      id
      title
      annotation
      cover
    }
  }
`;