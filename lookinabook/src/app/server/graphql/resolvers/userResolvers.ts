import prisma from "@/app/server/prisma/prismaClient";
import argon2 from "argon2";
import { UserResolvers } from "../resolversTypes/UserResolversTypes";
import { DateTime } from "@/app/server/graphql/resolversTypes/dateTime";
import { generateAccessToken, generateRefreshToken } from "../../auth/auth";
import { Role } from "@prisma/client";
import { sendVerificationEmail } from "../../sendemails/emailService";
import { GraphQLError } from "graphql";
//import { refreshAccessToken } from "../../auth/auth";
import { getUserFromRequest } from "../../auth/authMiddleware";


const userResolvers: UserResolvers = {
  DateTime,

  Query: {
    // Получить пользователя по ID
    async getUser(_, { id }) {
      try {
        return await prisma.user.findUnique({
          where: { id },
          /*include: {
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
          },*/
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
    /*async getCurrentUser(_, __, { req, res, prisma }) {
      try {
        console.log("Request headers:", req.headers);
    
       // Используем метод get() для получения заголовка
    const authHeader = req.headers.get("authorization");
    if (!authHeader) throw new Error("Unauthorized");
    
        const accessToken = authHeader.split(" ")[1];
    
        let decodedUser;
        try {
          decodedUser = verifyAccessToken(accessToken); // Проверяем accessToken
          req.user = decodedUser; // Сохраняем информацию о пользователе в req.user
        } catch (error) {
          console.log("Access token expired, trying to refresh...");
    
          const refreshToken = res.cookies.get("refreshToken")?.value;
          if (!refreshToken) {
            throw new Error("Refresh token not found");
          }
    
          try {
            // Создаем новый accessToken
            const newAccessToken = refreshAccessToken(refreshToken);
            console.log("New access token:", newAccessToken);
    
            // Обновляем accessToken в заголовке ответа
            res.headers.set("Authorization", `Bearer ${newAccessToken}`);
    
            // Расшифровываем новый accessToken
            decodedUser = verifyAccessToken(newAccessToken);
            req.user = decodedUser; // Сохраняем пользователя в контексте
          } catch (refreshError) {
            throw new Error("Refresh token expired, please log in again");
          }
        }
    
        console.log("Decoded User:", decodedUser);
    
        if (!decodedUser.id) {
          throw new Error("User ID is missing from the token");
        }
    
        const currentUser = await prisma.user.findUnique({
          where: { id: decodedUser.id },
        });
    
        if (!currentUser) {
          throw new Error("User not found");
        }
    
        console.log("Current User:", currentUser);
    
        return currentUser;
      } catch (error) {
        console.error("Error fetching current user:", error);
        throw new Error("Failed to fetch current user");
      }
    }*/
      async getCurrentUser(_, __, { req, res, prisma }) {
        try {
          const user = await getUserFromRequest(req, res);
          if (!user) throw new Error("Unauthorized");
      
          const currentUser = await prisma.user.findUnique({
            where: { id: user.id },
          });
      
          if (!currentUser) throw new Error("User not found");
      
          return currentUser;
        } catch (error) {
          console.error("Error fetching current user:", error);
          throw new Error("Failed to fetch current user");
        }
      }
    
    
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

    verifyCode: async (_: unknown, { email, code }: { email: string; code: string }): Promise<string> => {
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        throw new GraphQLError("User not found.");
      }

      // Проверяем, совпадает ли код
      if (!user.verificationCode || user.verificationCode !== code) {
        throw new GraphQLError("Invalid verification code.");
      }

      // Проверяем срок действия кода
      if (!user.codeExpiresAt || new Date() > user.codeExpiresAt) {
        throw new GraphQLError("Verification code expired. Please request a new one.");
      }

      // Если код действителен, активируем пользователя
      await prisma.user.update({
        where: { email },
        data: {
          isVerified: true,
          verificationCode: null,
          codeExpiresAt: null,
          verificationAttempts: 0, // Сбрасываем количество попыток
          lastVerificationRequest: null,
        },
      });

      return "Email verified successfully!";
    },

    // Запрос нового кода
    requestVerificationCode: async (_: unknown, { email }: { email: string }): Promise<string> => {
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        throw new GraphQLError("User not found.");
      }

      const now = new Date();

      // Проверяем, не превышен ли лимит 3 запроса в день
      const lastRequestDate = user.lastVerificationRequest
        ? new Date(user.lastVerificationRequest)
        : null;

      const isSameDay =
        lastRequestDate &&
        lastRequestDate.getUTCFullYear() === now.getUTCFullYear() &&
        lastRequestDate.getUTCMonth() === now.getUTCMonth() &&
        lastRequestDate.getUTCDate() === now.getUTCDate();

      if (isSameDay && user.verificationAttempts >= 3) {
        throw new GraphQLError(
          "You have reached the daily limit for verification code requests. Please try again tomorrow."
        );
      }

      // Проверяем, не запрашивал ли пользователь новый код слишком быстро (лимит 5 минут между запросами)
      if (user.lastVerificationRequest && now.getTime() - user.lastVerificationRequest.getTime() < 5 * 60 * 1000) {
        throw new GraphQLError("You can request a new verification code only once every 5 minutes.");
      }

      // Генерируем новый код и срок его действия
      const newVerificationCode = Math.floor(100000 + Math.random() * 900000).toString();
      const newCodeExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // Код действует 24 часа

      // Если день тот же, увеличиваем счётчик попыток, иначе сбрасываем
      const newVerificationAttempts = isSameDay ? user.verificationAttempts + 1 : 1;

      // Обновляем данные пользователя
      await prisma.user.update({
        where: { email },
        data: {
          verificationCode: newVerificationCode,
          codeExpiresAt: newCodeExpiresAt,
          verificationAttempts: newVerificationAttempts,
          lastVerificationRequest: now, // Запоминаем время последнего запроса
        },
      });

      // Отправляем новый код на email
      await sendVerificationEmail(email, newVerificationCode);

      return "A new verification code has been sent to your email.";
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
    updateUser: async (_, { id, username, email, password, bio, avatar }) => {
      try {
        // Проверка, что id передан и существует
        if (!id) {
          throw new Error("User ID is required.");
        }

        // Найдем пользователя, чтобы убедиться, что он существует
        const existingUser = await prisma.user.findUnique({ where: { id } });
        if (!existingUser) {
          throw new Error("User not found.");
        }

        // Формируем объект с обновленными данными
        const updatedData: Partial<{
          username: string;
          email: string;
          password?: string;
          bio?: string;
          avatar?: string;
        }> = {};

        if (username) updatedData.username = username;
        if (email) updatedData.email = email;
        if (bio) updatedData.bio = bio;
        if (avatar) updatedData.avatar = avatar;

        // Если пароль был передан, хешируем его
        if (password) {
          updatedData.password = await argon2.hash(password);
        }

        // Обновляем пользователя в базе данных
        const updatedUser = await prisma.user.update({
          where: { id },
          data: updatedData,
        });

        return updatedUser;
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

         // Обновляем статус isOnline на true
      await prisma.user.update({
        where: { id: user.id },
        data: { isOnline: true },
      });

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

       // ✅ Устанавливаем refreshToken в cookie
     
      res.cookies.set("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/",
        maxAge: 604800, // 7 дней
        //secure: true,
        sameSite: "lax",
});
        console.log(res.cookies)
        console.log("Refresh token set:", refreshToken);

        return {
          user,
          accessToken,
          refreshToken
        };
        
      } catch (error) {
        console.error("Error during login:", error);
        throw new Error("Failed to login");
      }
    },

    /*async refreshAccessTokenResolver(_, __, { req, res }) {
      try {
        // 1. Достать refresh token из cookies
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) throw new Error("Refresh token not found");

        // 2. Проверить refresh token и создать новый access token
        const newAccessToken = refreshAccessToken(refreshToken);

        return { accessToken: newAccessToken };
      } catch (error) {
        console.error("Error refreshing token:", error);
        throw new Error("Failed to refresh token");
      }
    },*/

    // Выход из системы (удаление токена)
    async logout(_, __, { req, res, prisma }) {
      try {
        const user = await getUserFromRequest(req, res);
        if (!user) throw new Error("Not authenticated");
    
        console.log("Logging out user:", user.id);
    
        res.cookies.set("refreshToken", "", {
          httpOnly: true,
          sameSite: "lax",
          path: "/",
          maxAge: 0,
        });
    
        await prisma.user.update({
          where: { id: user.id },
          data: { isOnline: false },
        });
    
        return true;
      } catch (error) {
        console.error("Error during logout:", error);
        throw new Error("Failed to logout");
      }
    }
  }
};

export default userResolvers;

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
