import { getUserFromRequest } from "../../auth/authMiddleware";
import { DateTime } from "../resolversTypes/dateTime";
import prisma from "@/app/server/prisma/prismaClient"


const messageResolvers: MessageResolversTypes = {
DateTime,
Query:{
     // Получить сообщение по id
    getMessageById: async (_: any, { id }: { id: number }, context: any) => {
      try {
        const message = await prisma.message.findUnique({ where: { id } });
        if (!message) throw new Error("Message not found");
        return message;
      } catch (error) {
        console.error("Error getting message:", error);
        throw new Error("Failed to retrieve message.");
      }
    },

    // Получить все сообщения пользователя (и отправленные, и полученные)
    getUserMessages: async (_: any, { userId }: { userId: number }, context: any) => {
      try {
        const messages = await prisma.message.findMany({
          where: {
            OR: [
              { senderId: userId },
              { recipientId: userId },
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
  },

  Mutation: {
    // Создание сообщения
    createMessage: async (_: any, { input }: any, context: any) => {
      const { userId } = context;
      try {
        const { text, recipientId, type } = input;

        const newMessage = await prisma.message.create({
          data: {
            text,
            recipientId,
            senderId: userId,
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
    updateMessage: async (_: any, { input }: any, context: any) => {
      try {
        const { id, text, isRead } = input;

        const updatedMessage = await prisma.message.update({
          where: { id },
          data: {
            ...(text !== undefined && { text }),
            ...(isRead !== undefined && { isRead }),
          },
        });

        return updatedMessage;
      } catch (error) {
        console.error("Error updating message:", error);
        throw new Error("Failed to update message.");
      }
    },

    // Удаление сообщения
    deleteMessage: async (_: any, { id }: { id: number }, context: any) => {
      try {
        const deletedMessage = await prisma.message.delete({ where: { id } });
        return deletedMessage;
      } catch (error) {
        console.error("Error deleting message:", error);
        throw new Error("Failed to delete message.");
      }
    },
  },



}
