
/*import { ApolloServer, ApolloServerOptions } from '@apollo/server';
import { userResolvers } from './resolvers/userResolvers';
import { userTypeDefs } from './typeDefs/userTypeDefs';
import prisma from '../prisma/prismaClient';
import { verifyAccessToken } from '../auth/auth';
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest } from 'next/server';
import { IContext } from './resolversTypes/UserResolversTypes';

const apolloServerOptions: ApolloServerOptions = {
    typeDefs: userTypeDefs,
    resolvers: userResolvers,
    context: async (req) => {
        const authorization = req.headers["authorization"] || ""; // Получаем заголовок authorization
        let user = null;
    
        if (authorization) {
          try {
            // Используем verifyAccessToken для извлечения пользователя из токена
            user = verifyAccessToken(authorization.replace("Bearer ", ""));
          } catch (err) {
            console.error("Invalid token", err);
          }
        }
      return {
        req,
        prisma,
        user,
      };
    },
  };
  const apolloServer = new ApolloServer(apolloServerOptions);
  
  //const handler = startServerAndCreateNextHandler(apolloServer as ApolloServer<IContext>);
  const handler = startServerAndCreateNextHandler(apolloServer as any)
  
  export { handler as GET, handler as POST };
  
  // Отключение bodyParser в Next.js
  export const config = {
    api: {
      bodyParser: false, // Отключаем bodyParser для Apollo Server
    },
  };
*/

import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../server/prisma/prismaClient";
import { CustomRequest } from "@/app/server/graphql/resolversTypes/UserResolversTypes";
import schema from "@/app/server/graphql/schema";
import { checkDatabaseConnection } from "../CheckDBConnection";
import { log } from "console";

// Уточняем тип для ApolloServer
const apolloServer = new ApolloServer({
  schema
});

const handler = startServerAndCreateNextHandler<CustomRequest>(apolloServer as any, {
  context: async (req ) => {
    const res = new NextResponse(); // Создаём новый объект ответа

    const dbConnected = await checkDatabaseConnection();
  
    if (!dbConnected) {
      throw new Error('⛔ Database connection error. Try again later');
    }

    
    return {
      /*req: {
        headers: {
          authorization: req.headers.get("authorization") || "", // ✅ Передаём токен авторизации
        },
      },*/
      req,
      res, // ✅ Передаём res, чтобы можно было установить refreshToken
      prisma,
    };
  },
  });

export { handler as GET, handler as POST };

// Отключение bodyParser в Next.js
export const config = {
  api: {
    bodyParser: false, // Отключаем bodyParser для Apollo Server
  },
};

