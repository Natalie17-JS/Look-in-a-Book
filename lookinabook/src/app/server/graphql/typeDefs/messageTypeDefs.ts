export const messageTypeDefs = `
scalar DateTime

type Message {
  id: Int!
  text: String!
  createdAt: DateTime!
  senderId: Int!
  isRead: Boolean!
  sender: User!
  chatId: Int!
  chat: Chat!

  replyToId: Int
  replyTo: Message
  replies: [Message!]!
}
 
type Chat {
  id: Int!
  participants: [ChatParticipant!]!
  messages: [Message!]!
  invitations: [ChatInvite!]
  createdAt: DateTime!
  updatedAt: DateTime!
}

type ChatParticipant {
  id: Int!
  chatId: Int!
  userId: Int!
  user: User
}

type ChatInvite {
  id: Int!
  chat: Chat!
  chatId: Int!
  inviter: ChatParticipant!
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

type DeleteResponse {
  message: String!
}

type Respond {
  success: Boolean!
}

type Query {
  getMessageById(id: Int!): Message
  countUnreadMessagesByChat(chatId: Int!): Int!
  getUserChats: [Chat!]!
  getChat(chatId: Int!): Chat
  getPendingInvites: [ChatInvite!]!
  getChatMessages(chatId: Int!): [Message!]!
}

type Mutation {
  createMessage( text: String!
  chatId: Int!
  ): Message!

  createChat(recipientId: Int!): Chat
  
  editMessage( id: Int!
  text: String): Message!

  markMessagesAsRead(chatId: Int!): Boolean!

  deleteMessage(id: Int!): DeleteResponse!

  addChatParticipant(chatId: Int!, targetUserId: Int!): ChatInvite!

  respondToInvite(inviteId: Int!, accept: Boolean!): Respond!

  deleteChat(chatId: Int!): DeleteResponse!

}
`