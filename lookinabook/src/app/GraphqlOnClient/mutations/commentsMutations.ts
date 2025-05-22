import { gql } from "@apollo/client";

export const CREATE_COMMENT = gql`
  mutation CreateComment($content: String!, $commentType: CommentType!, $targetId: ID!) {
    createComment(content: $content, commentType: $commentType, targetId: $targetId) {
      id
      content
      createdAt
      author {
        id
        username
      }
      parentComment {
        id
        content
      }
      book {
        id
        title
      }
      post {
        id
        title
      }
      chapter {
        id
        title
      }
    }
  }
`;

export const EDIT_COMMENT = gql`
  mutation EditComment($id: Int!, $content: String!) {
    editComment(id: $id, content: $content) {
      id
      content
      createdAt
      author {
        id
        username
      }
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation DeleteComment($id: Int!) {
    deleteComment(id: $id) {
      message
    }
  }
`;
