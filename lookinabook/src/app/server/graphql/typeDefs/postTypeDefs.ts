export const postTypeDefs = `
scalar DateTime

enum PublishStatus {
  DRAFT
  PUBLISHED
}

type Post {
  id: String!
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
  getPostById(id: String!): Post
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
    id: String!
    title: String
    content: String
    image: String
    publishStatus: PublishStatus
  ): Post!

  deletePost(id: String!): DeleteResponse!
}

`