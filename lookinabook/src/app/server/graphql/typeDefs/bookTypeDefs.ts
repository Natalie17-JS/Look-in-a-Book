const bookTypeDefs = `
scalar DateTime

enum PStatus {
  DRAFT
  PUBLISHED
  
}

enum WStatus {
  ONGOING
  COMPLETED
}

enum Category {
  FICTION
  NON_FICTION
}

enum Genre {
  DRAMA
  ADVENTURE
  SCIENCE_FICTION
  POST_APOCALYPSE
  APOCALYPSE
  HUMOR
  HISTORY
  SHORT_STORY
  POETRY
  DETECTIVE
  THRILLER
}

type Book {
    id: Int!
    title: String!
    annotation: String
    slug: String!
    cover: String
    author: User!
    category: Category!
    genre: Genre!
    publishStatus: PStatus!
    writingStatus: WStatus!

    #chapters: [Chapter!]
    #comments: [Comment!]
    #likes: [Like!]

    createdAt: DateTime!
    updatedAt: DateTime!
}
    type Query {
    getBookById(id: Int!): Book
    getBookBySlug(slug: String!): Book
    getBooks: [Book!]
    getMyBooks: [Book!]
    getBookDrafts: [Book!]
}

type DeleteResponse {
  message: String!
}

type Mutation {
    createBook(
    title: String!, 
    annotation: String, 
    cover: String, 
    category: Category!, 
    genre: Genre!, 
    publishStatus: PStatus!,
    writingStatus: WStatus!
     ): Book!

    updateBookById(
    id: Int!, 
    title: String, 
    annotation: String, 
    slug: String, 
    cover: String,
    category: Category, 
    genre: Genre, 
    publishStatus: PStatus,
    writingStatus: WStatus!
    ): Book!

    updateBookBySlug(
    slug: String!, 
    title: String, 
    annotation: String,  
    cover: String,
    category: Category, 
    genre: Genre, 
    publishStatus: PStatus,
    writingStatus: WStatus!
    ): Book!


    publishBook(slug: String!): Book

    deleteBookById(id: Int!): DeleteResponse!

    deleteBookBySlug(slug: String!): DeleteResponse!
}
`
export default bookTypeDefs;