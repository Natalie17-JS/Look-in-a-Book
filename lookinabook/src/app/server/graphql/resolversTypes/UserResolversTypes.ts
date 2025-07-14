import { Role, Subscription, User } from "@prisma/client";
import { GraphQLScalarType, Kind, ValueNode } from "graphql";
import { NextResponse, NextRequest } from "next/server";
import prisma from "../../prisma/prismaClient";
import { DateTime } from "./dateTime";

export interface CustomRequest extends NextRequest {
  user: { id: number; email: string; role: string };
}


export type CreateUserArgs = {
  username: string;
  email: string;
  password: string;
  bio?: string;
  avatar?: string;
  isVerified?: boolean;
  verificationCode: string;
  codeExpiresAt: Date;
  verificationAttempts: number;
  lastVerificationRequest: Date | null;
};



// Аргументы для входа в систему
export type LoginUserArgs = {
  email: string;
  password: string;
};
// Аргументы для обновления пользователя
export type UpdateUserArgs = {
  id: number;
  username?: string;
  email?: string;
  password?: string;
  bio?: string;
  avatar?: string;
  isOnline?: boolean;
};

// Ответ при логине (с токенами)
export type LoginResponse = {
  user: User & { isOnline: boolean };
  accessToken: string;
  refreshToken: string;
};

export type VerifyCodeArgs = {
  email: string;
  code: string;
};

export type RequestVerificationCodeArgs = {
  email: string;
};

export type AuthResponse = {
  accessToken: string;
};



export interface IContext {
  req: CustomRequest;
  //req: NextRequest;
  res: NextResponse;
  prisma: typeof prisma;
  user?: User;
}

export type UserResolvers = {
  Query: {
    getUser: (parent: unknown, args: { id: number }) => Promise<User | null>;
    getUsers: () => Promise<User[]>;
    getUserFollowers: (parent: unknown, args: { id: number })=> Promise<User[]>;
    getMyFollowers: (parent: unknown, args: unknown, context: IContext)=> Promise<User[]>;
    getUserFollowing: (parent: unknown, args: { id: number }) => Promise<User[]>;
    getMyFollowing: (parent: unknown, args: unknown, context: IContext) => Promise<User[]>;
    getFollowersCount: (parent: unknown, args: { userId: number }) => Promise<number>;
    getFollowingCount: (parent: unknown, args: { userId: number }) => Promise<number>;
    getCurrentUser: (
      parent: unknown,
      args: unknown,
      context: IContext
    ) => Promise<User | null>;
  }
  Mutation: {
    registerUser: (
      parent: unknown,
      args: CreateUserArgs,
      context: IContext
    ) => Promise<User>;
    requestVerificationCode: (
      parent: unknown,
      args: RequestVerificationCodeArgs,
      context: IContext
    ) => Promise<string>;
    verifyCode: (
      parent: unknown,
      args: VerifyCodeArgs,
      context: IContext
    ) => Promise<string>;
    loginUser: (
      parent: unknown,
      args: LoginUserArgs,
      context: IContext
    ) => Promise<LoginResponse>;
    /*refreshAccessTokenResolver: (
      parent: unknown, 
      args: unknown, 
      context: IContext
    ) => Promise<AuthResponse>;*/
    updateUser: (
      parent: unknown,
      args: UpdateUserArgs,
      context: IContext
    ) => Promise<User>;
    deleteUser: (
      parent: unknown,
      args: { id: number },
      context: IContext
    ) => Promise<User>;
    logoutUser: (
      parent: unknown,
      args: unknown,
      context: IContext
    ) => Promise<boolean>;
    subscribeToUser: (
      parent: unknown,
      args: {userId: number},
      context: IContext
    ) => Promise<Subscription>;
    unsubscribeFromUser: (
      parent: unknown,
      args: {userId: number},
      context: IContext
    ) => Promise<{message: string}>;
  };
  DateTime: GraphQLScalarType;
};
