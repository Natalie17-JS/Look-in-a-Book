import { gql } from "@apollo/client";

export const CREATE_CHAT = gql`
mutation CreateChat($recipientId: Int!) {
  createChat(recipientId: $recipientId){
     id
      participants {
        user {
					id
					username
				}
      }
      createdAt

  }
}
`

export const CREATE_MESSAGE = gql `
mutation CreateMessage($text: String!, $chatId: Int!, $replyToId: Int) {
  createMessage(text: $text, chatId: $chatId, replyToId: $replyToId) {
    id
    text
    isRead
    chatId
    createdAt
    senderId
    sender {
        id
        username
    }
    replyToId
    replyTo {
        id
        text 
        sender { 
        id
        username
         }   
    }
  }
}
  `
  export const EDIT_MESSAGE = gql `
  mutation EditMessage($id: Int!, $text: String) {
  editMessage(id: $id, text: $text) {
    id
    text
    createdAt
  }
}
  `

  export const MARK_MESSAGES_AS_READ = gql`
  mutation MarkMessagesAsRead($chatId: Int!) {
  markMessagesAsRead(chatId: $chatId)
}
 `

  export const DELETE_MESSAGE = gql`
  mutation DeleteMessage($id: Int!) {
  deleteMessage(id: $id) {
   message
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