export const chapterTypeDefs = `
  scalar DateTime

  enum PStatus {
    PUBLISHED
    DRAFT
  }

  type Chapter {
    id: String!
    title: String!
    content: String!
    bookId: Int!
    publishStatus: PStatus!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    getChapterById(id: String!): Chapter
    getChapters(bookId: Int!): [Chapter]
    getChapterDrafts(bookId: Int!): [Chapter]
    getAuthorBookChapters(bookId: Int!): [Chapter]
  }
type DeleteResponse {
  message: String!
}

  type Mutation {
    createChapter(title: String!, content: String!, publishStatus: PStatus!, bookId: Int!): Chapter!
    editChapter(id: String!, title: String, content: String, bookId: Int!): Chapter
    publishChapter(id: String!): Chapter!
    deleteChapterById(id: String!): DeleteResponse!
  }
`;