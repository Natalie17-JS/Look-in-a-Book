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
        const message = await prisma.message.findUnique({ where: { id } });
        if (!message) throw new Error("Message not found");
        return message;
      } catch (error) {
        console.error("Error getting message:", error);
        throw new Error("Failed to retrieve message.");
      }
    },

    // Получить все сообщения пользователя (и отправленные, и полученные)
    getUserMessages: async (_, { req, res, prisma }) => {
      try {
        const user = await getUserFromRequest(req, res);
                if (!user) {
                  throw new Error("Not authenticated");
                }
        const messages = await prisma.message.findMany({
          where: {
            OR: [
              { senderId: user.id },
              { recipientId: user.id },
            ],
          },
          orderBy: { createdAt: 'desc' },
        });
        return messages;
      } catch (error) {
        console.error("Error fetching user messages:", error);
        throw new Error("Failed to fetch user messages.");
      }
    },
    countUnreadMessages: async (_, { req, res, prisma }) => {
  const user = await getUserFromRequest(req, res);
  if (!user) throw new Error("Not authenticated");

  const count = await prisma.message.count({
    where: {
      recipientId: user.id,
      isRead: false,
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
      

        const newMessage = await prisma.message.create({
          data: {
            text,
            recipientId,
            senderId: user.id,
            type,
          },
        });

        return newMessage;
      } catch (error) {
        console.error("Error creating message:", error);
        throw new Error("Failed to create message.");
      }
    },

    // Обновление сообщения
    editMessage: async (_, { id, text}, { req, res, prisma }) => {
      try {
         const user = await getUserFromRequest(req, res);
                if (!user) {
                  throw new Error("Not authenticated");
                }
    

        const message = await prisma.book.findUnique({ where: { id } });
          
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
                 const message = await prisma.book.findUnique({ where: { id } });
          
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
  },
}

export default messageResolvers;