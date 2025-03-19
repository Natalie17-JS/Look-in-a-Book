export const chapterTypeDefs = `
  scalar DateTime

  enum PublishStatus {
    PUBLISHED
    DRAFT
  }

  type Chapter {
    id: String!
    title: String!
    content: String!
    bookId: Int!
    publishStatus: PublishStatus!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    getChapterById(id: String!): Chapter
    getChapters(bookId: Int!): [Chapter]
    getChapterDrafts(bookId: Int!): [Chapter]
    getAuthorBookChapters(bookId: Int!): [Chapter]
  }

  type Mutation {
    createChapter(title: String!, content: String!, bookId: Int!): Chapter
    editChapter(id: String!, title: String, content: String, bookId: Int!): Chapter
    deleteChapterById(id: String!): Boolean
  }
`;