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
    getAuthorBookChapters(slug: String!): [Chapter]
  }
type DeleteResponse {
  message: String!
}

  type Mutation {
    createChapterWithBookId(title: String!, content: String!, publishStatus: PStatus!, bookId: Int!): Chapter!
    createChapterWithBookSlug(title: String!, content: String!, publishStatus: PStatus!, slug: String!): Chapter!
    editChapterByBookId(id: String!, title: String, content: String, bookId: Int!): Chapter
    editChapterByBookSlug(id: String!, title: String, content: String, slug: String!): Chapter
    publishChapter(id: String!): Chapter!
    deleteChapterById(id: String!): DeleteResponse!
  }
`;