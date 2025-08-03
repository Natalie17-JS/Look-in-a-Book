import { getUserFromRequest } from "../../auth/authMiddleware";
import { DateTime } from "../resolversTypes/dateTime";
import { MessageResolversTypes } from "../resolversTypes/messageResolversTypes";

const messageResolvers: MessageResolversTypes = {
DateTime,
Query:{
     // Получить сообщение по id
    getMessageById: async (_, { id }, { req, res, prisma }) => {
      try {
         const user = await getUserFromRequest(req, res);
                if (!user) {
                  throw new Error("Not authenticated");
                }
        const message = await prisma.message.findUnique({ 
          where: { id } , 
          include: {
      sender: true,
      replies: true
          }
    });
        if (!message) throw new Error("Message not found");
        return message;
      } catch (error) {
        console.error("Error getting message:", error);
        throw new Error("Failed to retrieve message.");
      }
    },

  getUserChats: async (_, __, { req, res, prisma }) => {
  try {
    const user = await getUserFromRequest(req, res);
    if (!user) throw new Error("Not authenticated");

    const chats = await prisma.chat.findMany({
      where: {
        participants: {
          some: { userId: user.id },
        },
      },
      include: {
        participants: {
          include: {
            user: true, // если хочешь имена пользователей
          },
        },
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1, // только последнее сообщение
          include: {
            sender: true,
          },
        },
        _count: {
          select: {
            messages: true,
          },
        },
      },
    });

    // Подсчёт количества непрочитанных сообщений для каждого чата вручную
    const chatsWithUnread = await Promise.all(
      chats.map(async (chat) => {
        const unreadCount = await prisma.message.count({
          where: {
            chatId: chat.id,
            isRead: false,
            senderId: {
              not: user.id, // не считать свои собственные сообщения
            },
          },
        });

        return {
          ...chat,
          lastMessage: chat.messages[0] ?? null,
          unreadCount,
        };
      })
    );

    return chatsWithUnread;
  } catch (error) {
    console.error("Error fetching user chats:", error);
    throw new Error("Failed to fetch user chats.");
  }
},

getChat: async (_, { chatId }, { req, res, prisma } ) => {
  try {
    const user = await getUserFromRequest(req, res);
    if (!user) throw new Error("Not authenticated");

      const chat = await prisma.chat.findUnique({
        where: { id: chatId },
        include: {
          participants: true,
          messages: {
            orderBy: { createdAt: "desc" },
            take: 1 // можно убрать, если не нужен последний месседж
          }
        }
      });

      if (!chat) {
        throw new Error("Chat not found");
      }

      return chat;
    } catch (error) {
    console.error("Error fetching user chats:", error);
    throw new Error("Failed to fetch user chats.");
  }
    },

getPendingInvites: async (_, __, { req, res, prisma }) => {
  const user = await getUserFromRequest(req, res);
  if (!user) throw new Error("Not authenticated");

  const invites = await prisma.chatInvite.findMany({
    where: {
      targetId: user.id,
      status: 'PENDING',
    },
    include: {
      chat: true,
      inviter: true,
    },
  });

  return invites;
}, 

    // Получить все сообщения пользователя (и отправленные, и полученные)
    getChatMessages: async (_, { chatId }, { req, res, prisma }) => {
  try {
    const user = await getUserFromRequest(req, res);
    if (!user) {
      throw new Error("Not authenticated");
    }

    // Проверяем, что пользователь — участник чата
    const isParticipant = await prisma.chat.findFirst({
      where: {
        id: chatId,
        participants: {
          some: { id: user.id },
        },
      },
    });

    if (!isParticipant) {
      throw new Error("Access denied. You are not a participant of this chat.");
    }

    // Получаем сообщения чата
    const messages = await prisma.message.findMany({
      where: {
        chatId: chatId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        sender: true,
        replies: true,
      },
    });

    return messages;
  } catch (error) {
    console.error("Error fetching chat messages:", error);
    throw new Error("Failed to fetch chat messages.");
  }
},

countUnreadMessagesByChat: async (_, { chatId }, { req, res, prisma }) => {
  const user = await getUserFromRequest(req, res);
  if (!user) throw new Error("Not authenticated");

  const count = await prisma.message.count({
    where: {
      chatId,
      isRead: false,
      senderId: { not: user.id }, // свои сообщения не считаем
    },
  });

  return count;
},


    

  },

  Mutation: {
    // Создание сообщения
createChat: async (_, { recipientId }, { req, res, prisma }) => {
  try {
    const user = await getUserFromRequest(req, res);
    if (!user) throw new Error("Not authenticated");

    if (user.id === recipientId) {
      throw new Error("Cannot create a chat with yourself.");
    }

    // Ищем чаты, в которых участвует текущий пользователь
    const existingChats = await prisma.chat.findMany({
      where: {
        participants: {
          some: { userId: user.id },
        },
      },
      include: {
        participants: true,
      },
    });

    // Проверяем, есть ли уже чат с этим участником
    const chat = existingChats.find(
      (c) =>
        c.participants.length === 2 &&
        c.participants.some((p) => p.userId === recipientId)
    );

    if (chat) return chat;

    // Создаем новый чат
    const newChat = await prisma.chat.create({
      data: {
        participants: {
          create: [
            { user: { connect: { id: user.id } } },
            { user: { connect: { id: recipientId } } },
          ],
        },
      },
      include: {
        participants: {
          include: { user: true },
        },
      },
    });

    return newChat;
  } catch (error) {
    console.error("Error creating chat:", error);
    throw new Error("Failed to create chat.");
  }
},

createMessage: async (_, { text, chatId }, { req, res, prisma }) => {
  try {
    const user = await getUserFromRequest(req, res);
    if (!user) throw new Error("Not authenticated");

    const chat = await prisma.chat.findUnique({
      where: { id: chatId },
      include: { participants: true },
    });

    if (!chat) throw new Error("Chat not found");

    const isParticipant = chat.participants.some((p) => p.userId === user.id);
    if (!isParticipant) throw new Error("You are not a participant of this chat");

    const message = await prisma.message.create({
      data: {
        text,
        senderId: user.id,
        chatId,
        isRead: false,
      },
    });

    return message;
  } catch (error) {
    console.error("Error creating message:", error);
    throw new Error("Failed to send message.");
  }
},

    // Обновление сообщения
    editMessage: async (_, { id, text}, { req, res, prisma }) => {
      try {
         const user = await getUserFromRequest(req, res);
                if (!user) {
                  throw new Error("Not authenticated");
                }
    

        const message = await prisma.message.findUnique({ where: { id } });
          
              if (!message) {
                throw new Error("Message not found");
              }

        const editedMessage = await prisma.message.update({
          where: { id },
          data: {
            ...(text !== undefined && { text }),
            
          },
        });

        return editedMessage;
      } catch (error) {
        console.error("Error updating message:", error);
        throw new Error("Failed to update message.");
      }
    },

markMessagesAsRead: async (_, { chatId }, { req, res, prisma }) => {
  try {
    const user = await getUserFromRequest(req, res);
    if (!user) throw new Error("Not authenticated");

    const result = await prisma.message.updateMany({
      where: {
        chatId,
        isRead: false,
        senderId: { not: user.id }, // не отмечаем свои сообщения
      },
      data: {
        isRead: true,
      },
    });

    return result.count;
  } catch (error) {
    console.error("Error marking messages as read:", error);
    throw new Error("Failed to mark messages as read.");
  }
},

    // Удаление сообщения
    deleteMessage: async (_, { id },{ req, res, prisma } ) => {
      try {
         const user = await getUserFromRequest(req, res);
                if (!user) {
                  throw new Error("Not authenticated");
                }
                 const message = await prisma.message.findUnique({ where: { id } });
          
              if (!message) {
                throw new Error("Message not found");
              }

        const deletedMessage = await prisma.message.delete({ where: { id } });
       return { message: "Message was successfully deleted" };
      } catch (error) {
        console.error("Error deleting message:", error);
        throw new Error("Failed to delete message.");
      }
    },

    deleteChat: async (_, { chatId }, { req, res, prisma }) => {
  try {
    const user = await getUserFromRequest(req, res);
    if (!user) {
      throw new Error("Not authenticated");
    }

    // Проверяем, существует ли чат и входит ли пользователь в него
    const chat = await prisma.chat.findUnique({
      where: { id: chatId },
      include: { participants: true },
    });

    if (!chat) {
      throw new Error("Chat not found");
    }

    const isParticipant = chat.participants.some(p => p.userId === user.id);
    if (!isParticipant) {
      throw new Error("You are not a participant of this chat");
    }

    // Удаляем все связанные сообщения (если onDelete в Prisma не настроен)
    await prisma.message.deleteMany({
      where: { chatId },
    });

    // Удаляем все приглашения (если используются)
    await prisma.chatInvite.deleteMany({
      where: { chatId },
    });

    // Удаляем сам чат
    await prisma.chat.delete({
      where: { id: chatId },
    });

    return { message: "Chat and its messages were successfully deleted" };

  } catch (error) {
    console.error("Error deleting chat:", error);
    throw new Error("Failed to delete chat.");
  }
},

    addChatParticipant: async (_, { chatId, targetUserId }, { req, res, prisma }) => {
  const user = await getUserFromRequest(req, res);
  if (!user) throw new Error("Not authenticated");

  const chat = await prisma.chat.findUnique({
    where: { id: chatId },
    include: { participants: true },
  });

  if (!chat) throw new Error("Chat not found");

  const inviterParticipant = chat.participants.find(p => p.userId === user.id);
  if (!inviterParticipant) {
    throw new Error("You are not a participant of this chat");
  }
  // 🔒 Ограничение по участникам
  if (chat.participants.length >= 4) {
    throw new Error("Maximum number of participants reached (4).");
  }

  // 🔒 Проверка на существующий pending-инвайт
  const existingInvite = await prisma.chatInvite.findFirst({
    where: {
      chatId,
      targetId: targetUserId,
      status: 'PENDING',
    },
  });

  if (existingInvite) {
    throw new Error("An invitation is already pending for this user.");
  }

  // Создаем приглашение
  const invite = await prisma.chatInvite.create({
    data: {
      chatId,
      inviterId: inviterParticipant.id,
      targetId: targetUserId,
    },
  });

  return invite;
},



respondToInvite: async (_, { inviteId, accept }, { req, res, prisma }) => {
  const user = await getUserFromRequest(req, res);
  if (!user) throw new Error("Not authenticated");

  const invite = await prisma.chatInvite.findUnique({
    where: { id: inviteId },
    include: {
      chat: {
        include: { participants: true },
      },
    },
  });

  if (!invite || invite.targetId !== user.id) {
    throw new Error("Invite not found or unauthorized.");
  }

  if (invite.status !== 'PENDING') {
    throw new Error("Invite already responded to.");
  }

  if (accept) {
    // 🔒 Ограничение
    if (invite.chat.participants.length >= 4) {
      throw new Error("Cannot accept invite. Maximum chat size (4) reached.");
    }

    await prisma.chat.update({
      where: { id: invite.chatId },
      data: {
        participants: {
          connect: { id: invite.targetId },
        },
      },
    });
  }

  await prisma.chatInvite.update({
    where: { id: inviteId },
    data: {
      status: accept ? 'ACCEPTED' : 'REJECTED',
    },
  });

  return { success: true };
}


  },
}

export default messageResolvers;