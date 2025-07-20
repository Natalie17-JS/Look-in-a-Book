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
      recipient: true,
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
          some: { id: user.id },
        },
      },
      include: {
        participants: true,
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
            recipientId: user.id,
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


    // Получить все сообщения пользователя (и отправленные, и полученные)
    getUserMessages: async (_, __,  { req, res, prisma }) => {
      try {
        const user = await getUserFromRequest(req, res);
                if (!user) {
                  throw new Error("Not authenticated");
                }
        const messages = await prisma.message.findMany({
          where: {
      type: 'MESSAGE',
      recipientId: user.id,
    },
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      sender: true,
      replies: true
    }
        });
        return messages;
      } catch (error) {
        console.error("Error fetching user messages:", error);
        throw new Error("Failed to fetch user messages.");
      }
    },

    getUserReadLetters: async (_,__, { req, res, prisma }) => {
   try {
        const user = await getUserFromRequest(req, res);
                if (!user) {
                  throw new Error("Not authenticated");
                }
        const readLetters = await prisma.message.findMany({
          where: {
      type: 'LETTER',
      recipientId: user.id,
       isRead: true,
    },
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      sender: true,
      replies: true
    }
        });
        return readLetters;
      } catch (error) {
        console.error("Error fetching user messages:", error);
        throw new Error("Failed to fetch user messages.");
      }
},

   getUserUnreadLetters: async (_,__, { req, res, prisma }) => {
   try {
        const user = await getUserFromRequest(req, res);
                if (!user) {
                  throw new Error("Not authenticated");
                }
        const readLetters = await prisma.message.findMany({
          where: {
      type: 'LETTER',
      recipientId: user.id,
       isRead: false,
    },
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      sender: true,
      replies: true
    }
        });
        return readLetters;
      } catch (error) {
        console.error("Error fetching user messages:", error);
        throw new Error("Failed to fetch user messages.");
      }
},

getUserSentLetters: async (_, __, { req, res, prisma }) => {
  try {
    const user = await getUserFromRequest(req, res);
    if (!user) {
      throw new Error("Not authenticated");
    }

    const sentLetters = await prisma.message.findMany({
      where: {
        type: 'LETTER',
        senderId: user.id,
      },
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        recipient: true,  // Важно — recipient!
        replies: true
      }
    });

    return sentLetters;
  } catch (error) {
    console.error("Error fetching sent letters:", error);
    throw new Error("Failed to fetch sent letters.");
  }
},


    countUnreadMessages: async (_,__, { req, res, prisma }) => {
  const user = await getUserFromRequest(req, res);
  if (!user) throw new Error("Not authenticated");

  const count = await prisma.message.count({
    where: {
      recipientId: user.id,
      isRead: false,
      type: 'MESSAGE'
    },
  });

  return count;
},
countUnreadLetters: async (_, __, { req, res, prisma }) => {
  const user = await getUserFromRequest(req, res);
  if (!user) throw new Error("Not authenticated");

  const count = await prisma.message.count({
    where: {
      recipientId: user.id,
      isRead: false,
      type: 'LETTER'
    },
  });

  return count;
}


  },

  Mutation: {
    // Создание сообщения
    createMessage: async (_, { text, recipientId, type },{ req, res, prisma } ) => {
      
      try {
        const user = await getUserFromRequest(req, res);
                if (!user) {
                  throw new Error("Not authenticated");
                }
      if (user.id === recipientId) {
    throw new Error("Cannot send a message to yourself.");
  }
  let chatId = null;

  if (type === "MESSAGE") {
    const existingChats = await prisma.chapter.findMany({
      where: {
        participants: {some: {id: user.id}},
      },
      include: {participants: true}
    })

    const chat = existingChats.find(
      c =>
c.participants.length === 2 && c.participants.some(p => p.id === recipientId)
    )

    if (chat) {
      chatId = chat.id
    } else {
      const newChat = await prisma.chat.create({
        data: {
          participants: {
            connect: [{ id: user.id }, { id: recipientId }],
          }
        }
      })
      chatId = newChat.id;
    }
  }

        const newMessage = await prisma.message.create({
          data: {
            text,
            recipientId,
            senderId: user.id,
            type,
            chatId
          },
        });

        return newMessage;
      } catch (error) {
        console.error("Error creating message:", error);
        throw new Error("Failed to create message.");
      }
    },

    replyToLetter: async (_, { text, replyToId }, { req, res, prisma }) => {
  const user = await getUserFromRequest(req, res);
  if (!user) throw new Error("Not authenticated");

  const original = await prisma.message.findUnique({
    where: { id: replyToId },
    include: { replies: true }
  });

  if (!original || original.type !== 'LETTER') {
    throw new Error("Original letter not found or is not a letter");
  }

  if (original.recipientId !== user.id) {
    throw new Error("You can reply only to letters sent to you");
  }

  if (original.replies.length > 0) {
    throw new Error("You already replied to this letter");
  }

  const reply = await prisma.message.create({
    data: {
      text,
      type: 'LETTER',
      senderId: user.id,
      recipientId: original.senderId,
      replyToId: replyToId
    },
  });

  return reply;
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

    markMessageAsRead: async (_, { id }, { req, res, prisma }) => {
  try {
    const user = await getUserFromRequest(req, res);
    if (!user) throw new Error("Not authenticated");

    const message = await prisma.message.findUnique({ where: { id } });
    if (!message) throw new Error("Message not found");

    // Убедись, что только получатель может прочитать сообщение
    if (message.recipientId !== user.id) {
      throw new Error("You are not authorized to read this message");
    }

    if (message.isRead) return message; // уже прочитано

    const updated = await prisma.message.update({
      where: { id },
      data: { isRead: true },
    });

    return updated;
  } catch (error) {
    console.error("Error marking message as read:", error);
    throw new Error("Failed to mark message as read");
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

    requestAddParticipant: async (_, { chatId, targetUserId }, { req, res, prisma }) => {
  const user = await getUserFromRequest(req, res);
  if (!user) throw new Error("Not authenticated");

  const chat = await prisma.chat.findUnique({
    where: { id: chatId },
    include: { participants: true },
  });

  if (!chat || !chat.participants.some(p => p.id === user.id)) {
    throw new Error("Access denied to this chat");
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
      inviterId: user.id,
      targetId: targetUserId,
    },
  });

  return invite;
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