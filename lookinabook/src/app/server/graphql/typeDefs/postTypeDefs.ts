export const postTypeDefs = `
scalar DateTime

enum PublishStatus {
  DRAFT
  PUBLISHED
}

type Post {
  id: Int!
  title: String!
  content: String!
  image: String
  publishStatus: PublishStatus!
  createdAt: String!
  updatedAt: String!
  author: User!
}

type DeleteResponse {
  message: String!
}

type Query {
  getPostById(id: Int!): Post
  getAllPosts: [Post!]!
  getUserPosts(authorId: ID!): [Post!]!
  getPostDrafts: [Post!]!
  getMyPosts: [Post!]!
}


type Mutation {
  createPost(
    title: String!
    content: String!
    image: String
    publishStatus: PublishStatus!
  ): Post!

  updatePost(
    id: Int!
    title: String
    content: String
    image: String
    publishStatus: PublishStatus
  ): Post!

  deletePost(id: Int!): DeleteResponse!
}

`