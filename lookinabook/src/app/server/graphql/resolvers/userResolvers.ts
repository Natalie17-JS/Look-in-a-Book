import prisma from "@/app/server/prisma/prismaClient";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { UserResolvers } from "../resolversTypes/UserResolversTypes";

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

export const resolvers: UserResolvers = {
  Query: {
    // Получить пользователя по ID
    async getUser(_, { id }) {
      try {
        return await prisma.user.findUnique({
          where: { id },
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
    async getCurrentUser(_, __, { context }) {
      try {
        const { user } = context;
        if (!user) {
          throw new Error("Not authenticated");
        }

        return await prisma.user.findUnique({
          where: { id: user.id },
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

        return await prisma.user.create({
          data: {
            username,
            email,
            password: hashedPassword,
            bio,
            avatar,
          },
        });
      } catch (error) {
        console.error("Error registering user:", error);
        throw new Error("Failed to register user");
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
    async loginUser(_, { email, password }) {
      try {
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          throw new Error("User not found");
        }

        const validPassword = await argon2.verify(user.password, password);
        if (!validPassword) {
          throw new Error("Invalid password");
        }

        const token = jwt.sign({ id: user.id }, SECRET_KEY, {
          expiresIn: "1d",
        });

        return {
          user,
          token,
        };
      } catch (error) {
        console.error("Error during login:", error);
        throw new Error("Failed to login");
      }
    },

    // Выход из системы (удаление токена)
    async logout(_, __, { context }) {
      try {
        const { user } = context;
        if (!user) {
          throw new Error("Not authenticated");
        }

        // Здесь можно реализовать логику удаления токена из клиента
        return true;
      } catch (error) {
        console.error("Error during logout:", error);
        throw new Error("Failed to logout");
      }
    },
  },
};
