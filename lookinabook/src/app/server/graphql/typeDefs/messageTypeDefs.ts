const adminTypeDefs = `
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

input CreateMessageInput {
  text: String!
  recipientId: Int!
  type: MessageType!
}

input UpdateMessageInput {
  id: Int!
  text: String
  isRead: Boolean
}

type Query {
  getMessageById(id: Int!): Message
  getUserMessages(userId: Int!): [Message!]!
}

type Mutation {
  createMessage(input: CreateMessageInput!): Message!
  updateMessage(input: UpdateMessageInput!): Message!
  deleteMessage(id: Int!): Message!
}


`