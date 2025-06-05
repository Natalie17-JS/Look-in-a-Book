import prisma from "@/app/server/prisma/prismaClient";
import { getUserFromRequest } from "../../auth/authMiddleware";
import { LikeResolversTypes } from "../resolversTypes/likeResolversTypes";

const likeResolvers: LikeResolversTypes = {
    Query: {
    postLikeCount: async (_, { postId }, { prisma }) => {
      return prisma.like.count({ where: { postId } });
    },

    bookCoverLikeCount: async (_: any, { bookId }: { bookId: number }, { prisma }: any) => {
      return prisma.like.count({ where: { bookId, type: "COVER" } });
    },

    bookPlotLikeCount: async (_: any, { bookId }: { bookId: number }, { prisma }: any) => {
      return prisma.like.count({ where: { bookId, type: "PLOT" } });
    },

    bookWritingStyleLikeCount: async (_: any, { bookId }: { bookId: number }, { prisma }: any) => {
      return prisma.like.count({ where: { bookId, type: "WRITING_STYLE" } });
    },

    bookLikeSummary: async (_: any, { bookId }: { bookId: number }, { prisma }: any) => {
      const grouped = await prisma.like.groupBy({
        by: ["type"],
        where: { bookId },
        _count: { _all: true },
      });

      return grouped.map(({ type, _count }) => ({
        type,
        count: _count._all,
      }));
    },
  },

    Mutation: {
        like: async (_, { type, bookId, postId }, { req, res, prisma }) => {
  try {
    const user = await getUserFromRequest(req, res);
    if (!user) {
      throw new Error("Not authenticated");
    }
    const userId = user.id;

    if (!bookId && !postId) {
      throw new Error("Either bookId or postId must be provided");
    }
    // ✅ Проверка: если лайк книги — `type` должен быть не POST
    if (bookId && type === "POST") {
      throw new Error("Invalid like type for a book");
    }

    // ✅ Проверка: если лайк поста — `type` должен быть POST
    if (postId && type !== "POST") {
      throw new Error("Only POST like type is allowed for posts");
    }


    // Используем findFirst вместо findUnique
    const existing = await prisma.like.findFirst({
      where: {
        userId,
        type,
        ...(bookId ? { bookId } : {}),
        ...(postId ? { postId } : {}),
      },
    });

    if (existing) return true;

    await prisma.like.create({
      data: {
        userId,
        type,
        bookId,
        postId,
      },
    });

    return true;
  } catch (error) {
    console.error("Error in like resolver:", error);
    throw new Error("Failed to like");
  }
},

        unlike: async (_, { type, bookId, postId }, { req, res, prisma }) => {
  try {
    const user = await getUserFromRequest(req, res);
    if (!user) {
      throw new Error("Not authenticated");
    }
    const userId = user.id;

    if (!bookId && !postId) {
      throw new Error("Either bookId or postId must be provided");
    }
    // ✅ Проверка: если лайк книги — `type` должен быть не POST
    if (bookId && type === "POST") {
      throw new Error("Invalid like type for a book");
    }

    // ✅ Проверка: если лайк поста — `type` должен быть POST
    if (postId && type !== "POST") {
      throw new Error("Only POST like type is allowed for posts");
    }


    const existing = await prisma.like.findFirst({
      where: {
        userId,
        type,
        ...(bookId ? { bookId } : {}),
        ...(postId ? { postId } : {}),
      },
    });

    if (!existing) return false;

    await prisma.like.delete({
      where: { id: existing.id },
    });

    return false;
  } catch (error) {
    console.error("Error in unlike resolver:", error);
    throw new Error("Failed to unlike");
  }
}
    }
}

export default likeResolvers;