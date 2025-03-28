import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation RegisterUser(
    $username: String!
    $email: String!
    $password: String!
    $bio: String
    $avatar: String
  ) {
    registerUser(
      username: $username
      email: $email
      password: $password
      bio: $bio
      avatar: $avatar
    ) {
      id
      username
      email
      bio
      avatar
      role
      isVerified
      createdAt
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      user {
        id
        username
        email
        role
      }
      accessToken
    }
  }
`;

export const LOGOUT_USER = gql`
  mutation LogoutUser {
    logoutUser
  }
`;

export const UPDATE_USER = gql`
 mutation UpdateUser($id: Int!, $username: String, $email: String, $password: String, $bio: String) {
    updateUser(id: $id, username: $username, email: $email, password: $password, bio: $bio) {
      id
      username
      email
      bio
    }
  }
    `

  export const DELETE_USER = gql `
    mutation DeleteUser($id: Int!) {
    deleteUser(id: $id) {
      id
    }
  }
  `