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

  chatId: Int
  chat: Chat

  replyToId: Int
  replyTo: Message
  replies: [Message!]!
}
 

type Chat {
  id: Int!
  participants: [User!]!
  messages: [Message!]!
  invitations: [ChatInvite!]!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type ChatInvite {
  id: Int!
  chat: Chat!
  chatId: Int!
  inviter: User!
  inviterId: Int!
  target: User!
  targetId: Int!
  status: InviteStatus!
  createdAt: DateTime!
}

enum InviteStatus {
  PENDING
  ACCEPTED
  REJECTED
}

enum MessageType {
  LETTER
  MESSAGE
}

type DeleteResponse {
  message: String!
}

type Respond {
  success: Boolean!
}

type Query {
  getMessageById(id: Int!): Message
  getUserReadLetters: [Message!]
  getUserUnreadLetters: [Message!]
  getUserSentLetters: [Message!]
  countUnreadMessages: Int!
  countUnreadLetters: Int!
  getUserChats: [Chat]!
  getPendingInvites: [ChatInvite!]!
  getUserMessages(chatId: Int!): [Message!]!
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

  addChatParticipant(chatId: Int!, targetUserId: Int!): ChatInvite!

  respondToInvite(inviteId: Int!, accept: Boolean!): Respond!

  deleteChat(chatId: Int!): DeleteResponse!

}
`