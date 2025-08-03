export const letterTypeDefs = `
scalar DateTime

type Letter {
  id: Int!
  text: String!
  createdAt: DateTime!
  senderId: Int!
  recipientId: Int!
  isRead: Boolean!

  sender: User!
  recipient: User!

  replyToId: Int
  replyTo: Letter
  replies: [Letter!]!
}
 
type DeleteResponse {
  message: String!
}

type Respond {
  success: Boolean!
}

type Query {
  getLetterById(id: Int!): Letter
  getUserReadLetters: [Letter!]!
  getUserUnreadLetters: [Letter!]!
  getUserSentLetters: [Letter!]!
  countUnreadLetters: Int!
}

type Mutation {
  createLetter(text: String!
  recipientId: Int!
  ): Letter!

  replyToLetter(text: String!, replyToId: Int!): Letter!

  markLetterAsRead(id: Int!): Letter

  deleteLetter(id: Int!): DeleteResponse!
}
`