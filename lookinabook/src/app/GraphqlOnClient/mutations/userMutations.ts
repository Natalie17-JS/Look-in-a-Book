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
