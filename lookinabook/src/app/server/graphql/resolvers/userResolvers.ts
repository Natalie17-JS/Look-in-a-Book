import prisma from "@/app/server/prisma/prismaClient";
import argon2 from "argon2";
import { UserResolvers } from "../resolversTypes/UserResolversTypes";
import { DateTime } from "../resolversTypes/UserResolversTypes";
import { generateAccessToken, generateRefreshToken } from "../../auth/auth";
import { Role } from "@prisma/client";
import { sendVerificationEmail } from "../../sendemails/emailService";

export const resolvers: UserResolvers = {
  DateTime,

  Query: {
    // Получить пользователя по ID
    async getUser(_, { id }) {
      try {
        return await prisma.user.findUnique({
          where: { id },
          include: {
            books: true,
            comments: true,
            likes: true,
            posts: true,
            notifications: true,
            subscriptionsAsSubscriber: true,
            subscriptionsAsSubscribedTo: true,
            messagesSent: true,
            messagesReceived: true,
            pointsLogs: true,
          },
        });
      } catch (error) {
        console.error("Error fetching user:", error);
        throw new Error("Failed to fetch user");
      }
    },

    // Получить список всех пользователей
    async getUsers() {
      try {
        return await prisma.user.findMany();
      } catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("Failed to fetch users");
      }
    },

    // Получить текущего авторизованного пользователя
    async getCurrentUser(_, __, { req, prisma }) {
      try {
        // Предполагается, что пользователь добавляется в req.user через middleware
        const user = req.user;
        if (!user) {
          throw new Error("Not authenticated");
        }

        // Ищем пользователя в базе данных
        return await prisma.user.findUnique({
          where: { id: user.id },
          include: {
            books: true,
            comments: true,
            likes: true,
            posts: true,
            notifications: true,
            subscriptionsAsSubscriber: true,
            subscriptionsAsSubscribedTo: true,
            messagesSent: true,
            messagesReceived: true,
            pointsLogs: true,
          },
        });
      } catch (error) {
        console.error("Error fetching current user:", error);
        throw new Error("Failed to fetch current user");
      }
    },
  },

  Mutation: {
    // Регистрация нового пользователя
    async registerUser(_, { username, email, password, bio, avatar }) {
      try {
        const hashedPassword = await argon2.hash(password);
    
        // Генерируем 6-значный код подтверждения
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        const codeExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // Код действует 24 часа
    
        const user = await prisma.user.create({
          data: {
            username,
            email,
            password: hashedPassword,
            bio,
            avatar,
            isVerified: false,
            verificationCode,
            codeExpiresAt,
          },
        });
    
        // Отправляем код на почту
        await sendVerificationEmail(email, verificationCode);
        return user;
      } catch (error) {
        console.error("Error registering user:", error);
        throw new Error("Failed to register user");
      }
    },
    

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

    // Обновление данных пользователя
    async updateUser(_, { id, username, email, password, bio, avatar }) {
      try {
        const updatedData: Partial<{
          username: string;
          email: string;
          password?: string;
          bio?: string;
          avatar?: string;
        }> = {
          username,
          email,
          bio,
          avatar,
        };

        if (password) {
          updatedData.password = await argon2.hash(password);
        }

        return await prisma.user.update({
          where: { id },
          data: updatedData,
        });
      } catch (error) {
        console.error("Error updating user:", error);
        throw new Error("Failed to update user");
      }
    },

    // Удаление пользователя
    async deleteUser(_, { id }) {
      try {
        return await prisma.user.delete({
          where: { id },
        });
      } catch (error) {
        console.error("Error deleting user:", error);
        throw new Error("Failed to delete user");
      }
    },

    // Вход в систему
    async loginUser(_, { email, password }, { res }) {
      try {
        // Проверить, существует ли пользователь с указанным email
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          throw new Error("User not found");
        }

        // Проверить пароль
        const isPasswordValid = await argon2.verify(user.password, password);
        if (!isPasswordValid) {
          throw new Error("Invalid credentials");
        }

        // Создать токены
        const accessToken = generateAccessToken({
          id: user.id,
          email: user.email,
          role: user.role,
        });
        const refreshToken = generateRefreshToken({
          id: user.id,
          email: user.email,
          role: user.role,
        });

        // Установить refreshToken в cookie
        res.setHeader("Set-Cookie", [
          `refreshToken=${refreshToken}; HttpOnly; Path=/; Max-Age=604800; Secure; SameSite=Strict`,
        ]);

        return {
          user,
          accessToken,
        };
      } catch (error) {
        console.error("Error during login:", error);
        throw new Error("Failed to login");
      }
    },

    // Выход из системы (удаление токена)
    async logout(_, __, { res }) {
      try {
        // Установить заголовок Set-Cookie для удаления refreshToken
        res.setHeader("Set-Cookie", [
          `refreshToken=; HttpOnly; Path=/; Max-Age=0; Secure; SameSite=Strict`,
        ]);

        return true;
      } catch (error) {
        console.error("Error during logout:", error);
        throw new Error("Failed to logout");
      }
    },
  },
};

/*async logout(_, __, { res }) {
      try {
        // Удаление refreshToken из cookie
        res.setHeader("Set-Cookie", [
          "refreshToken=; HttpOnly; Path=/; Max-Age=0; Secure; SameSite=Strict",
        ]);

        return true;
      } catch (error) {
        console.error("Error during logout:", error);
        throw new Error("Failed to logout");
      }
    },
  },*/
