const bookTypeDefs = `
scalar DateTime

type Book {
    id: Int!
    title: String!
    annotation: String
    slug: String!
    cover: String
    author: User!

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
}

type DeleteResponse {
  message: String!
}

type Mutation {
    createBook(title: String!, annotation: String, cover: String): Book!
    updateBook(id: Int!, title: String, annotation: String, slug: String, cover: String): Book!
    deleteBook(id: Int!): DeleteResponse!
}
`
export default bookTypeDefs;