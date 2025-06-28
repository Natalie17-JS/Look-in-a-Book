export const messageTypeDefs = `
scalar DateTime

type Message {
  id: Int!
  text: String!
  createdAt: DateTime!
  senderId: Int
  recipientId: Int
  isRead: Boolean!
  type: MessageType!
  sender: User
  recipient: User
  replies: [Message!]!
}

enum MessageType {
  LETTER
  MESSAGE
}

type DeleteResponse {
  message: String!
}

type Query {
  getMessageById(id: Int!): Message
  getUserMessages: [Message!]
  getUserLetters: [Message!]
  getUserSentLetters: [Message!]
  countUnreadMessages: Int!
  countUnreadLetters: Int!
}

type Mutation {
  createMessage( text: String!
  recipientId: Int!
  type: MessageType!): Message!
  
  editMessage( id: Int!
  text: String
  isRead: Boolean): Message!

  replyToLetter(text: String!, replyToId: Int!): Message!

  markMessageAsRead(id: Int!): Message

  deleteMessage(id: Int!): DeleteResponse!
}


`