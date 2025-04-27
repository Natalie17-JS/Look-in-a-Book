export const postTypeDefs = `
scalar DateTime

enum PublishStatus {
  DRAFT
  PUBLISHED
}

enum PostCategory {
  THOUGHTS
  NEWS
  NEW_BOOK_PROMOTION
  BOOK_REVIEW
  OTHER
}

type Post {
  id: String!
  title: String!
  content: String!
  image: String
  publishStatus: PublishStatus!
  category: PostCategory!
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
  getAuthorPosts: [Post!]!
}


type Mutation {
  createPost(
    title: String!
    content: String!
    image: String
    publishStatus: PublishStatus!
    category: PostCategory!
  ): Post!

  updatePost(
    id: String!
    title: String
    content: String
    image: String
    publishStatus: PublishStatus
    category: PostCategory
  ): Post!

  deletePost(id: String!): DeleteResponse!
}

`