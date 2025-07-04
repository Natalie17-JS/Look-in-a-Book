import { gql } from "@apollo/client";

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    getCurrentUser {
      id
      username
      email
      bio
      avatar
      role
    }
  }
`;

export const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      username
      books {
        id
        title
      }
      posts {
        id
        title
      }
        isOnline
    }
  }
`

export const GET_USER_BY_ID = gql`
  query GetUser($id: Int!) {
  getUser(id: $id) {
    username
    email
    bio
    isOnline
    lastActive
    books {
      id
      title
      annotation
      category
      cover
      genre
      slug
      publishStatus
      writingStatus
      coverLikeCount
      plotLikeCount
      writingStyleLikeCount
      likedByCurrentUserPlot
      likedByCurrentUserCover
      likedByCurrentUserWritingStyle
      createdAt
    }
      posts {
        id
        title
        content
      }
    createdAt
    points
  }
}

`
