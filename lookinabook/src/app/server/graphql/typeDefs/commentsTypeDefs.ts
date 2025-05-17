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

input CreateCommentInput {
  content: String!
  commentType: CommentType!
  targetId: ID!
  parentCommentId: Int
}

input EditCommentInput {
  id: Int!
  content: String
}

input DeleteCommentInput {
  id: Int!
}

type DeleteResponse {
  message: String!
}

type Mutation {
  createComment(input: CreateCommentInput!): Comment!
  editComment(input: EditCommentInput!): Comment!
  deleteComment(input: DeleteCommentInput!): DeleteResponse!
}

`