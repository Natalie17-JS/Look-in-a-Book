import { gql } from "@apollo/client";

export const CREATE_MESSAGE = gql `
mutation CreateMessage($text: String!, $recipientId: Int!, $type: MessageType!) {
  createMessage(text: $text, recipientId: $recipientId, type: $type) {
    id
    text
    type
    isRead
    createdAt
    senderId
    recipientId
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