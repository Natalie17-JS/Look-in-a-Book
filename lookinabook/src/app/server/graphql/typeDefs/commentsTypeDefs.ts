export const commentsTypeDefs = `
scalar DateTime

enum CommentType {
  BOOKCOMMENT
  POSTCOMMENT
  CHAPTERCOMMENT
  REPLYCOMMENT
}


type Comment {
  id: Int!
  content: String!
  createdAt: DateTime!
  updatedAt: DateTime!

  author: User
  book: Book
  chapter: Chapter
  post: Post
  parentComment: Comment
  replies: [Comment!]!
}

type Query {
  getCommentById(id: Int!): Comment
  getCommentsByBook(bookId: Int!): [Comment!]!
  getCommentsByChapter(chapterId: String!): [Comment!]!
  getCommentsByPost(postId: String!): [Comment!]!
  getRepliesToComment(parentCommentId: Int!): [Comment!]!
  getUserComments: [Comment!]!
}


type DeleteResponse {
  message: String!id: Int!
  content: String
}

type Mutation {
  createComment(
  content: String!
  commentType: CommentType!
  targetId: ID!
  parentCommentId: Int
  ): Comment!

  editComment(id: Int!
  content: String): Comment!

  deleteComment(id: Int!): DeleteResponse!
}

`