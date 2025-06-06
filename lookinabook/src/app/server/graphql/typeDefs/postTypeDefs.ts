export const postTypeDefs = `
scalar DateTime

enum PStatus {
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
  publishStatus: PStatus!
  category: PostCategory!
  createdAt: String!
  updatedAt: String!
  author: User!
  comments: [Comment!]
  likesCount: Int! 
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
    publishStatus: PStatus!
    category: PostCategory!
  ): Post!

  editPost(
    id: String!
    title: String
    content: String
    image: String
    publishStatus: PStatus
    category: PostCategory
  ): Post!

  publishPost(id: String!): Post!

  deletePost(id: String!): DeleteResponse!
}

`