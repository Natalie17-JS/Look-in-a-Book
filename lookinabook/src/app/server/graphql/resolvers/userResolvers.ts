import prisma from "@/app/server/prisma/prismaClient";
import argon2 from "argon2";
import { UserResolvers } from "../resolversTypes/UserResolversTypes";
import { DateTime } from "@/app/server/graphql/resolversTypes/dateTime";
import { generateAccessToken, generateRefreshToken } from "../../auth/auth";
import { sendVerificationEmail } from "../../sendemails/emailService";
import { GraphQLError } from "graphql";
//import { refreshAccessToken } from "../../auth/auth";
import { cookies } from "next/headers";
import { getUserFromRequest } from "../../auth/authMiddleware";
import { userRegisterValidation } from "../../validation/userValidation";

const userResolvers: UserResolvers = {
  DateTime,

  Query: {
    // Получить пользователя по ID
    async getUser(_, { id }) {
      try {
        return await prisma.user.findUnique({
          where: { id },
          include: {
            books: true,
            posts: true
          }
           /* comments: true,
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
        return await prisma.user.findMany({
          include:{
            books: true,
            posts: true
          }
        });
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
      },

      async getUserFollowers(_, {id}) {
        const user = await prisma.user.findUnique({
          where: {id},
          include: {
            subscriptionsAsSubscribedTo: {
              include: {
                subscriber: true
              }
            }
          }
        })
        if (!user) {
          throw new Error("User not found")
        }

         return user.subscriptionsAsSubscribedTo.map(sub => sub.subscriber);
      },

      async getMyFollowers(_, __, { req, res, prisma }){
  const currentUser = await getUserFromRequest(req, res);
  if (!currentUser) {
    throw new Error("Not authenticated");
  }

  const user = await prisma.user.findUnique({
    where: { id: currentUser.id },
    include: {
      subscriptionsAsSubscribedTo: {
        include: {
          subscriber: true
        }
      }
    }
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user.subscriptionsAsSubscribedTo.map(sub => sub.subscriber);
},

async getUserFollowing(_, {id}) {
  const user = await prisma.user.findUnique({
    where: {id},
    include: {
      subscriptionsAsSubscriber: {
        include: {
          subscribedTo: true
        }
      }
    }
  })
  if (!user) {
    throw new Error("User not found")
  }
  return user.subscriptionsAsSubscriber.map(sub => sub.subscribedTo);
},

async getMyFollowing(_, __, {req, res}) {
   const currentUser = await getUserFromRequest(req, res);
  if (!currentUser) {
    throw new Error("Not authenticated");
  }
const user = await prisma.user.findUnique({
    where: { id: currentUser.id },
    include: {
      subscriptionsAsSubscriber: {
        include: {
          subscribedTo: true
        }
      }
    }
  });
 if (!user) {
    throw new Error("User not found")
  }
  return user.subscriptionsAsSubscriber.map(sub => sub.subscribedTo);
} 
  },

  Mutation: {
    // Регистрация нового пользователя
    async registerUser(_, { username, email, password, bio, avatar}) {
      try {
        // Проверяем входные данные
      const validationResult = userRegisterValidation.safeParse({ username, email, password });

      if (!validationResult.success) {
        console.error("Validation errors:", validationResult.error.errors); // Логируем ошибки
  
        throw new GraphQLError("Validation error", {
          extensions: {
            code: "BAD_USER_INPUT",
            errors: validationResult.error.errors.map(err => ({
              field: err.path.join("."),
              message: err.message
            }))
          }
        });
      }
        const hashedPassword = await argon2.hash(password);
    
        // Генерируем 6-значный код подтверждения
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        const codeExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // Код действует 24 часа
    
        const user = await prisma.user.create({
          data: {
            username,
            email,
            password: hashedPassword,
            bio: bio || null,
            avatar: avatar || null,
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
    async deleteUser(_, { id }, { req, res, prisma, user }) {
      try {
        const user = await getUserFromRequest(req, res);
        if (!user) throw new Error("Not authenticated");
        
    
        // Если пользователь не админ и пытается удалить не свой аккаунт, запрещаем
        if (user.role !== "ADMIN" && user.id !== id) {
          throw new Error("Not authorized to delete this user");
        }
    
        console.log(`User ${user.id} is deleting user ${id}`);
    
        // Удаляем пользователя
        const deletedUser = await prisma.user.delete({
          where: { id },
        });
    
        // Если пользователь удаляет сам себя, удаляем refreshToken из куков (как в logout)
        if (user.id === id) {
          const cookieStore = await cookies();
          cookieStore.set("refreshToken", "", {
            httpOnly: true,
            sameSite: "lax",
            path: "/",
            maxAge: 0,  // Устанавливаем maxAge в 0, чтобы удалить токен
          });
          res.cookies.set("refreshToken", "", {
  httpOnly: true,
  sameSite: "lax",
  path: "/",
  maxAge: 0, // Удаляем cookie
});
        }
    
        return deletedUser;
      } catch (error) {
        console.error("Error deleting user:", error);
        throw new Error("Failed to delete user");
      }
    },
    
    

    // Вход в систему
    async loginUser(_, { email, password }, { res }) {
      try {
        console.log("Trying to login user with email:", email);
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
        data: { isOnline: true, lastActive: new Date(), },
        
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

      // ✅ Устанавливаем refreshToken в cookie с использованием cookies() из next/headers
    const cookieStore = await cookies();
    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      path: "/",
      maxAge: 604800, // 7 дней
      // secure: true, // Включать только на продакшн, если нужен https
      sameSite: "lax",
    });
   /* res.cookies.set("refreshToken", refreshToken, {
  httpOnly: true,
  path: "/",
  maxAge: 604800,
  sameSite: "lax",
});*/

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
    async logoutUser(_, __, { req, res, prisma }) {
      try {
        const user = await getUserFromRequest(req, res);
        if (!user) throw new Error("Not authenticated");
    
        console.log("Logging out user:", user.id);
    
        // Используем cookies() для удаления refreshToken
    const cookieStore = await cookies();
    cookieStore.set("refreshToken", "", {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 0,  // Устанавливаем maxAge в 0, чтобы удалить токен
    });
        await prisma.user.update({
          where: { id: user.id },
          data: { isOnline: false, lastActive: new Date(), },
        });
    
        return true;
      } catch (error) {
        console.error("Error during logout:", error);
        throw new Error("Failed to logout");
      }
    },

    async subscribeToUser(_, { userId }, { req, res, prisma }) {
  try {
    const currentUser = await getUserFromRequest(req, res);
    if (!currentUser) throw new Error("Not authenticated");

    if (currentUser.id === userId) {
      throw new Error("You cannot subscribe to yourself.");
    }

    const targetUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!targetUser) {
      throw new Error("User you want to subscribe to doesn't exist");
    }

    const existingSubscription = await prisma.subscription.findUnique({
      where: {
        subscriberId_subscribedToId: {
          subscriberId: currentUser.id,
          subscribedToId: userId,
        },
      },
    });

    if (existingSubscription) {
      throw new Error("Already subscribed to this user.");
    }

    const subscription = await prisma.subscription.create({
      data: {
        subscriber: { connect: { id: currentUser.id } },
        subscribedTo: { connect: { id: userId } },
      },
    });

    return subscription;

  } catch (error) {
    console.error("Error in subscribeToUser:", error);
    throw new Error("Failed to subscribe to user.");
  }
},


 async unsubscribeFromUser(_, { userId }, { req, res, prisma }) {
  try {
    const currentUser = await getUserFromRequest(req, res);
    if (!currentUser) throw new Error("Not authenticated");

    await prisma.subscription.delete({
      where: {
        subscriberId_subscribedToId: {
          subscriberId: currentUser.id,
          subscribedToId: userId,
        },
      },
    });

    return { message: "You successfully unsubscribed from this user" };

  } catch (error) {
    console.error("Error in unsubscribeFromUser:", error);
    throw new Error("Failed to unsubscribe from user.");
  }
},

} 
};

export default userResolvers;