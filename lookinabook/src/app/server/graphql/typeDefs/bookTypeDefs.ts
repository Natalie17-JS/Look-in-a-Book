const bookTypeDefs = `
scalar DateTime

type Book {
    id: Int!
    title: String!
    annotation: String!
    slug: String!
    cover: String
    author: User!
    chapters: [Chapter!]
    comments: [Comment!]
    likes: [Like!]
    createdAt: String!
    updatedAt: String!
}
    type Query {
    getBook(id: Int!): Book
    getBooks: [Book!]
}

type Mutation {
    createBook(title: String!, annotation: String, slug: String!, cover: String, authorId: Int!): Book!
    updateBook(id: Int!, title: String, annotation: String, slug: String, cover: String): Book!
    deleteBook(id: Int!): Boolean!
}
`
export default bookTypeDefs;