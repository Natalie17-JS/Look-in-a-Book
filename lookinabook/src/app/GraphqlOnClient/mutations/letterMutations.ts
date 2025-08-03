import { gql } from "@apollo/client";

export const CREATE_LETTER = gql `
mutation CreateLetter($text: String!, $recipientId: Int!) {
  createLetter(text: $text, recipientId: $recipientId) {
    id
    text
    isRead
    createdAt
    senderId
    recipientId
  }
}
  `

export const REPLY_TO_LETTER = gql`
mutation ReplyToLetter($text: String!, $replyToId: Int!) {
  replyToLetter(text: $text, replyToId: $replyToId) {
    id
    text
    createdAt
    sender {
      id
      username
    }
    recipient {
      id
      username
    }
  }
}
`

  export const MARK_LETTER_AS_READ = gql`
    mutation MarkLetterAsRead($id: Int!) {
    markLetterAsRead(id: $id) {
    id
    isRead
  }
}

    `

  export const DELETE_LETTER = gql`
  mutation DeleteLetter($id: Int!) {
  deleteLetter(id: $id) {
    id
    text
  }
}
  `