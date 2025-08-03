import { gql } from "@apollo/client";

export const CREATE_CHAT = gql`
mutation CreateChat($recipientId: Int!) {
  createChat(recipientId: $recipientId){
     id
      participants {
        id
        username
      }
      messages {
          id
          text
        }
      invitations {
          id
          chatId
        }
      createdAt

  }
}
`

export const CREATE_MESSAGE = gql `
mutation CreateMessage($text: String!, $chatId: Int!) {
  createMessage(text: $text, chatId: $chatId) {
    id
    text
    isRead
    chatId
    createdAt
    senderId
  }
}
  `
  export const EDIT_MESSAGE = gql `
  mutation EditMessage($id: Int!, $text: String, $isRead: Boolean) {
  editMessage(id: $id, text: $text, isRead: $isRead) {
    id
    text
    createdAt
  }
}
  `

  export const MARK_MESSAGE_AS_READ = gql`
    mutation MarkMessageAsRead($id: Int!) {
    markMessageAsRead(id: $id) {
    id
    isRead
  }
}

    `

  export const DELETE_MESSAGE = gql`
  mutation DeleteMessage($id: Int!) {
  deleteMessage(id: $id) {
    id
    text
  }
}
  `

export const ADD_CHAT_PARTICIPANT = gql`
mutation GetChatParticipant($chatId: Int!, $targetUserId: Int!) {
  addChatParticipant(chatId: $chatId, targetUserd: $targetUserId) {
  id
  chat
  chatId
  inviter {
      id
      username
    }
  target {
      id
      username
    }
  status
  createdAt
  }
}
`

export const RESPOND_TO_INVITE = gql`
mutation RespondToInvite($inviteId: Int!, $accept: Boolean!) {
  respondToInvite(inviteId: $inviteId, accept: $accept){
    success
  }
}
`