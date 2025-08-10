import { gql } from "@apollo/client";

export const GET_MESSAGE_BY_ID = gql`
query GetMessageById($id: Int!) {
  getMessageById(id: $id) {
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

export const GET_USER_CHATS = gql `
  query GetUserChats {
    getUserChats {
      id
     participants {
        user {
					id
					username
				}
      }
      messages {
          id
          text
        }
      invitations {
          id
          chatId
        }
      unreadCount
      createdAt
    }  
  }
`

export const GET_CHAT = gql`
  query GetChat($chatId: Int!) {
    getChat(chatId: $chatId) {
      id
      participants {
      user { 
        id
        username
        }
      }
        messages {
          id
          text
          createdAt
        }
    }
  }
`;

export const GET_PENDING_INVITES = gql `
  query GetPendingInvites {
    getPendingInvites{
      id
      chat
      inviter{
        id
        username
      }
      target{
        id
        username
      }
      status
      createdAt
    }
  }
`

export const GET_CHAT_MESSAGES = gql`
query GetChatMessages($chatId: Int!) {
  getChatMessages(chatId: $chatId) {
    id
    chatId
    text
    isRead
    createdAt
    sender{
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

export const UNREAD_MESSAGES_COUNT = gql`
query CountUnreadMessagesByChat($chatId: Int!) {
countUnreadMessagesByChat(chatId: $chatId) 
}
`

