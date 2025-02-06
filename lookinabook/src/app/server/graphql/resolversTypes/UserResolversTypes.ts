import { Role, User } from "@prisma/client";
import { GraphQLScalarType, Kind, ValueNode } from "graphql";
import { NextApiResponse } from "next";
import { CustomApiRequest } from "../../auth/authMiddleware";
import prisma from "../../prisma/prismaClient";

export const DateTime = new GraphQLScalarType({
  name: "DateTime",
  description: "A valid date-time value",
  serialize(value: unknown): string {
    if (!(value instanceof Date)) {
      throw new TypeError("Value is not an instance of Date");
    }
    return value.toISOString();
  },
  parseValue(value: unknown): Date {
    if (typeof value !== "string") {
      throw new TypeError("Value is not a valid ISO string");
    }
    return new Date(value);
  },
  parseLiteral(ast: ValueNode): Date | null {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    return null;
  },
});

export type CreateUserArgs = {
  username: string;
  email: string;
  password: string;
  bio?: string;
  avatar?: string;
  isVerified: boolean;
  verificationCode: string;
  codeExpiresAt: Date;
  verificationAttempts: number;
  lastVerificationRequest: Date | null;
};

// Аргументы для создания администратора
export type CreateAdminArgs = {
  username: string;
  email: string;
  password: string;
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
};

// Ответ при логине (с токенами)
export type LoginResponse = {
  user: User;
  accessToken: string;
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
  req: CustomApiRequest;
  res: NextApiResponse;
  prisma: typeof prisma;
  user?: User | null;
}

export type UserResolvers = {
  Query: {
    getUser: (parent: unknown, args: { id: number }) => Promise<User | null>;
    getUsers: () => Promise<User[]>;
    getCurrentUser: (
      parent: unknown,
      args: unknown,
      context: IContext
    ) => Promise<User | null>;
  };
  Mutation: {
    registerUser: (
      parent: unknown,
      args: CreateUserArgs,
      context: IContext
    ) => Promise<User>;
    createAdmin: (
      parent: unknown,
      args: CreateAdminArgs,
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
    refreshAccessTokenResolver: (
      parent: unknown, 
      args: unknown, 
      context: IContext
    ) => Promise<AuthResponse>;
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
    logout: (
      parent: unknown,
      args: unknown,
      context: IContext
    ) => Promise<boolean>;
  };
  DateTime: GraphQLScalarType;
};
