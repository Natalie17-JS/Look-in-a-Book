import { gql } from "@apollo/client";

export const GET_COMMENT_BY_ID = gql`
  query GetCommentById($id: Int!) {
    getCommentById(id: $id) {
      id
      content
      createdAt
      author {
        id
        username
      }
      replies {
        id
        content
        author {
          id
          username
        }
      }
      parentComment {
        id
        content
      }
    }
  }
`;

export const GET_COMMENTS_BY_BOOK = gql`
  query GetCommentsByBook($bookId: Int!) {
    getCommentsByBook(bookId: $bookId) {
      id
      content
      createdAt
      author {
        id
        username
      }
      replies {
        id
        content
      }
    }
  }
`;

export const GET_COMMENTS_BY_CHAPTER = gql`
  query GetCommentsByChapter($chapterId: String!) {
    getCommentsByChapter(chapterId: $chapterId) {
      id
      content
      createdAt
      author {
        id
        username
      }
      replies {
        id
        content
      }
    }
  }
`;

export const GET_COMMENTS_BY_POST = gql`
  query GetCommentsByPost($postId: String!) {
    getCommentsByPost(postId: $postId) {
      id
      content
      createdAt
      author {
        id
        username
      }
      replies {
        id
        content
        createdAt
        author {
          id
          username
        }
          parentComment {
          id
          author {
            id
            username
          }
        }
      }
    }
  }
`;

export const GET_REPLIES_TO_COMMENT = gql`
  query GetRepliesToComment($parentCommentId: Int!) {
    getRepliesToComment(parentCommentId: $parentCommentId) {
      id
      content
      createdAt
      author {
        id
        username
      }
        parentComment {
        id
        author{
          id
          username
        }
        }
    }
  }
`;

export const GET_USER_COMMENTS = gql`
  query GetUserComments {
    getUserComments {
      id
      content
      createdAt
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
      parentComment {
        id
        content
      }
    }
  }
`;
