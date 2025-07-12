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

export const GET_USER_FOLLOWERS = gql`
query GetUserFollowers($userId: Int!){
  getUserFollowers(userId: $userId){
    username
    bio
  }
}
`
export const GET_USER_FOLLOWING = gql`
query GetUserFollowing($userId: Int!){
  getUserFollowing(userId: $userId){
    username
    bio
  }
}
`
export const GET_MY_FOLLOWERS = gql`
query GetMyFollowers{
  getMyFollowers{
    username
    bio
  }
}
`
export const GET_MY_FOLLOWING = gql`
query GetMyFollowing{
  getMyFollowing{
    username
    bio
  }
}
`
