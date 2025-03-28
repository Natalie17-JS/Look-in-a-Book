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
    publishStatus: PStatus!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    getChapterById(id: String!): Chapter
    getChaptersByBookId(bookId: Int!): [Chapter]
    getChaptersByBookSlug(slug: String!): [Chapter]
    getChapterDrafts(bookId: Int!): [Chapter]
    getAuthorBookChapters(bookId: Int!): [Chapter]
  }
type DeleteResponse {
  message: String!
}

  type Mutation {
    createChapterWithBookId(title: String!, content: String!, publishStatus: PStatus!, bookId: Int!): Chapter!
    createChapterWithBookSlug(title: String!, content: String!, publishStatus: PStatus!, slug: String!): Chapter!
    editChapter(id: String!, title: String, content: String, bookId: Int!): Chapter
    publishChapter(id: String!): Chapter!
    deleteChapterById(id: String!): DeleteResponse!
  }
`;