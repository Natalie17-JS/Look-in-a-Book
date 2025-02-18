import { AdminResolvers } from "../resolversTypes/adminResolversTypes";
import prisma from "@/app/server/prisma/prismaClient";
import { Role } from "@prisma/client";
import argon2 from "argon2";

const adminResolvers: AdminResolvers = {
  Query: {
  async getBannedUsers(_, __, { user }) {
    if (!user) {
      throw new Error("Not authenticated");
    }

    // Проверяем, является ли текущий пользователь администратором
    if (user.role !== "ADMIN") {
      throw new Error("Unauthorized to view banned users");
    }

    try {
      // Получаем пользователей с баном (полный бан или запрет публикаций)
      const bannedUsers = await prisma.user.findMany({
        where: {
          OR: [
            { isBanned: true },      // Полный бан
            { publishBanned: true }  // Бан на публикацию контента
          ]
        },
        select: {
          id: true,
          email: true,
          username: true,
          isBanned: true,
          publishBanned: true,
          createdAt: true,
          updatedAt: true
        }
      });

      return bannedUsers;

    } catch (error) {
      console.error("Error fetching banned users:", error);
      throw new Error("Failed to fetch banned users");
    }
  }
  },
  Mutation: { 
    async createAdmin(_, { username, email, password }, { req }) {
      try {
        // Проверка, имеет ли текущий пользователь права администратора
        if (!req.user || req.user.role !== Role.ADMIN) {
          throw new Error("Not authorized to create an admin");
        }

        // Хэшируем пароль
        const hashedPassword = await argon2.hash(password);

        // Создаём администратора
        const admin = await prisma.user.create({
          data: {
            username,
            email,
            password: hashedPassword,
            role: "ADMIN", // Устанавливаем роль ADMIN
          },
        });

        return admin;
      } catch (error) {
        console.error("Error creating admin:", error);
        throw new Error("Failed to create admin");
      }
    },

    /*async banUser(_, { userId, isBanned, publishBanned, banCount, banEndDate }, { user }) {
      if (!user) {
        throw new Error("Not authenticated");
      }
    
      // Проверяем, является ли текущий пользователь администратором
      if (user.role !== "ADMIN") {
        throw new Error("Not authorized");
      }
    
      // Найти пользователя, которого нужно забанить
      const userToBan = await prisma.user.findUnique({ where: { id: userId } });
      if (!userToBan) {
        throw new Error("User not found");
      }
    
      // Если это второй бан, делаем полный бан
      const isFullBan = userToBan.banCount >= 1;
    
      // Обновляем данные пользователя
      const bannedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          isBanned: isFullBan, // Полный бан, если это второй раз
          publishBanned: !isFullBan, // Первый бан только на публикации
          banCount: userToBan.banCount + 1,
          banEndDate: isFullBan ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) : null, // Бан на месяц
        },
      });
    
      // Добавление уведомления о бане
      await prisma.notification.create({
        data: {
          type: "BAN",
          content: `Your account has been banned. ${
            bannedUser.banCount >= 2
              ? "This is your second ban, and your account will be permanently deleted if this continues."
              : ""
          }`,
          userId: userToBan.id,
        },
      });
    
      return { 
        bannedUser: {
          id: bannedUser.id,
          username: bannedUser.username,
          email: bannedUser.email,
          isBanned: bannedUser.isBanned,
          publishBanned: bannedUser.publishBanned,
          createdAt: bannedUser.createdAt,
          updatedAt: bannedUser.updatedAt,
        } ,
        success: true 
      };
    }
    },
    
    async unbanUser(_, { userId }, { user }) {
      if (!user) {
        throw new Error("Not authenticated");
      }
    
      // Проверяем, является ли текущий пользователь администратором
      if (user.role !== "ADMIN") {
        throw new Error("Not authorized");
      }
    
      // Найти пользователя, которого нужно разбанить
      const userToUnban = await prisma.user.findUnique({ where: { id: userId } });
      if (!userToUnban) {
        throw new Error("User not found");
      }
    
      // Проверка, что пользователь имеет хотя бы один из этих статусов
      if (!userToUnban.isBanned && !userToUnban.publishBanned) {
        throw new Error("User is not banned or blocked from publishing");
      }
    
      // Разбаниваем пользователя
      const unbannedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          isBanned: false, // Снимаем бан
          publishBanned: false, // Снимаем блокировку публикаций
          banCount: userToUnban.banCount > 0 ? userToUnban.banCount - 1 : 0, // Уменьшаем количество банов на 1
          banEndDate: null, // Убираем дату окончания бана
        },
      });
    
      // Добавление уведомления о разбане
      await prisma.notification.create({
        data: {
          type: "BAN",
          content: "Your account has been unbanned.",
          userId: userToUnban.id,
        },
      });
    
      return { 
        unbannedUser: {
          id: unbannedUser.id,
          username: unbannedUser.username,
          email: unbannedUser.email,
          isBanned: unbannedUser.isBanned,
          publishBanned: unbannedUser.publishBanned,
          createdAt: unbannedUser.createdAt,
          updatedAt: unbannedUser.updatedAt,
        }, 
        success: true 
      };*/
    }
    
   
    
    }

    export default adminResolvers;
  