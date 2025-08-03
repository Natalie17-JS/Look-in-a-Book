import { gql } from "@apollo/client";

export const GET_LETTER_BY_ID = gql`
query GetLetterById($id: Int!) {
  getLetterById(id: $id) {
    id
    text
    isRead
    createdAt
    sender {
      id
      username
    }
    recipientId
    recipient {
      id
      username
    }
    replies {
      id
      text
    }
  }
}

`

export const GET_USER_READ_LETTERS = gql`
query GetUserReadLetters {
  getUserReadLetters {
    id
    text
    isRead
    createdAt
    sender {
      id
      username
    }
      replies {
      id
      text
    }
  }
}

`

export const GET_USER_UNREAD_LETTERS = gql`
query GetUserUnreadLetters {
  getUserUnreadLetters {
    id
    text
    isRead
    createdAt
    sender {
      id
      username
    }
      replies {
      id
      text
    }
  }
}

`

export const GET_USER_SENT_LETTERS = gql`
query GetUserSentLetters {
  getUserSentLetters {
    id
    text
    isRead
    createdAt
    recipient {
      id
      username
    }
      replies {
      id
      text
    }
  }
}

`
export const UNREAD_LETTERS_COUNT = gql`
query CountUnreadLetters {
countUnreadLetters
}
`