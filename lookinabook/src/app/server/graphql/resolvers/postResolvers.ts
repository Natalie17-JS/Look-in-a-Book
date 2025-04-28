import { GraphQLError } from "graphql";
import prisma from "@/app/server/prisma/prismaClient";
import { DateTime } from "../resolversTypes/dateTime";
import { getUserFromRequest } from "../../auth/authMiddleware";
import { PostResolversTypes } from "../resolversTypes/postResolversTypes";

const postResolvers: PostResolversTypes = {
  DateTime,

  Query: {
    getPostById: async (_, { id }) => {
      try {
        const post = await prisma.post.findUnique({
          where: { id },
          include: { author: true },
        });
        if (!post) {
          throw new GraphQLError("Post not found");
        }
        return post;
      } catch (error) {
        console.error("Error fetching post:", error);
        throw new Error("Failed to fetch post");
      }
    },

    getAllPosts: async () => {
      try {
        return await prisma.post.findMany({
          where: { publishStatus: "PUBLISHED" },
          include: {
            author: {
              select: {
                id: true,
                username: true,
                email: true,
              },
            },
          },
          orderBy: { createdAt: "desc" },
          take: 5,
        });
      } catch (error) {
        console.error("Error fetching posts:", error);
        throw new Error("Failed to fetch posts");
      }
    },

    getUserPosts: async (_, { authorId }) => {
      try {
        return await prisma.post.findMany({
          where: { authorId, publishStatus: "PUBLISHED" },
          orderBy: { createdAt: "desc" },
        });
      } catch (error) {
        console.error("Error fetching user posts:", error);
        throw new Error("Failed to fetch user posts");
      }
    },

    getPostDrafts: async (_, __, { req, res, prisma }) => {
      try {
        const user = await getUserFromRequest(req, res);
        if (!user) {
          throw new Error("Not authenticated");
        }
         const postsDrafts = await prisma.post.findMany({
          where: { authorId: user.id, publishStatus: "DRAFT" },
          include: {
            author: {
              select: { id: true, username: true },
            }
          },
          orderBy: { createdAt: "desc" },
        });
        return postsDrafts;
      } catch (error) {
        console.error("Error fetching post drafts:", error);
        throw new Error("Failed to fetch post drafts");
      }
    },

    getAuthorPosts: async (_, __, { req, res }) => {
      try {
        const user = await getUserFromRequest(req, res);
        if (!user) {
          throw new Error("Not authenticated");
        }
        return await prisma.post.findMany({
          where: { authorId: user.id },
          include: {
            author: {
              select: { id: true, username: true },
            }
          },
          orderBy: { createdAt: "desc" },
        });
      } catch (error) {
        console.error("Error fetching my posts:", error);
        throw new Error("Failed to fetch my posts");
      }
    },
  },

  Mutation: {
    createPost: async (_, { title, content, image, publishStatus, category  }, { req, res }) => {
      try {
        const user = await getUserFromRequest(req, res);
        if (!user) {
          throw new Error("Not authenticated");
        }

        return await prisma.post.create({
          data: {
            title,
            content,
            image: image || null,
            publishStatus,
            category,
            authorId: user.id, // Добавил связь с автором
          },
          include: {
            author: true, 
          },
        });
      } catch (error) {
        console.error("Error creating post:", error);
        throw new Error("Failed to create post");
      }
    },

    updatePost: async (_, { id, title, content, image, publishStatus, category }, { req, res }) => {
      try {
        const user = await getUserFromRequest(req, res);
        if (!user) {
          throw new Error("Not authenticated");
        }

        const post = await prisma.post.findUnique({ where: { id } });
        if (!post) {
          throw new Error("Post not found");
        }

        return await prisma.post.update({
          where: { id },
          data: { title, content, image, publishStatus, category, updatedAt: new Date() },
        });
      } catch (error) {
        console.error("Error updating post:", error);
        throw new Error("Failed to update post");
      }
    },

    deletePost: async (_, { id }, { req, res }) => {
      try {
        const user = await getUserFromRequest(req, res);
        if (!user) {
          throw new Error("Not authenticated");
        }

        const post = await prisma.post.findUnique({ where: { id } });
        if (!post) {
          throw new Error("Post not found");
        }

        if (user.id !== post.authorId && user.role !== "ADMIN") {
          throw new Error("You are not allowed to delete this post");
        }

        await prisma.post.delete({ where: { id } });
        return { message: "Post deleted successfully" };
      } catch (error) {
        console.error("Error deleting post:", error);
        throw new Error("Failed to delete post");
      }
    },
  },
};
export default postResolvers