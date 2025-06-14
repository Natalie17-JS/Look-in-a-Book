export const messageTypeDefs = `
scalar DateTime

type Message {
  id: Int!
  text: String!
  createdAt: String!
  senderId: Int
  recipientId: Int
  isRead: Boolean!
  type: MessageType!
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
  getUserMessages(userId: Int!): [Message!]!
  countUnreadMessages: Int!
}

type Mutation {
  createMessage( text: String!
  recipientId: Int!
  type: MessageType!): Message!
  
  editMessage( id: Int!
  text: String
  isRead: Boolean): Message!

  markMessageAsRead(id: Int!): Message

  deleteMessage(id: Int!): DeleteResponse!
}


`