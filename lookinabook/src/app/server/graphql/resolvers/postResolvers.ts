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
          include: { author: true, comments: true },
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
    getAuthorPostById: async (_, { id }, { req, res, prisma }) => {
      try {
        const user = await getUserFromRequest(req, res);
        if (!user) {
          throw new Error("Not authenticated");
        }
        
        const post = await prisma.post.findUnique({
          where: { id },
          include: { author: true, comments: true },
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

    /*getAllPosts: async () => {
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
            comments: true,
            
          },
          orderBy: { createdAt: "desc" },
          take: 5,
        });
      } catch (error) {
        console.error("Error fetching posts:", error);
        throw new Error("Failed to fetch posts");
      }
    },*/
      getAllPosts: async (_: any, args: { sortBy?: string }, { prisma }) => {
  const { sortBy } = args;

  const posts = await prisma.post.findMany({
    where: { publishStatus: "PUBLISHED" },
    include: {
      author: {
        select: {
          id: true,
          username: true,
          email: true,
        },
      },
      comments: true,
      _count: {
        select: {
          likes: true,
          comments: true,
        },
      },
    },
  });

  const sortedPosts = [...posts].sort((a, b) => {
    if (sortBy === "likes") {
      return b._count.likes - a._count.likes;
    } else if (sortBy === "comments") {
      return b._count.comments - a._count.comments;
    } else {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  // Возвращаем первые 5
  return sortedPosts.slice(0, 5);
},


    getUserPosts: async (_, { authorId }) => {
      try {
        return await prisma.post.findMany({
          where: { authorId, publishStatus: "PUBLISHED" },
          include: {comments: true},
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
          where: { authorId: user.id, publishStatus: "PUBLISHED" },
          include: {
            author: {
              select: { id: true, username: true },
            },
            comments: true,
            likes: true
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

    editPost: async (_, { id, title, content, image, publishStatus, category }, { req, res }) => {
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

    async publishPost(_, { id }, { req, res }) {
        try {
          const user = await getUserFromRequest(req, res);
          if (!user) {
            throw new Error("Not authenticated");
          }
    
          const post = await prisma.post.findUnique({ where: { id } });
    
          if (!post) {
            throw new Error("Post not found");
          }
    
          // Проверяем, является ли пользователь автором книги
          if (user.id !== post.authorId) {
            throw new Error("You are not allowed to publish this book");
          }
    
          // Проверяем, что книга находится в статусе "DRAFT"
          if (post.publishStatus === "PUBLISHED") {
            throw new Error("This post is already published");
          }
    
          // Обновляем статус на "PUBLISHED"
          const updatedPost = await prisma.post.update({
            where: { id },
            data: { publishStatus: "PUBLISHED" },
            include: { author: true }, // Возвращаем автора книги
          });
    
          return updatedPost;
        } catch (error) {
          console.error("Error publishing post:", error);
          throw new Error("Failed to publish post");
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
     Post: {
    likesCount: async (parent, _, { prisma }) => {
      return prisma.like.count({
        where: {
          postId: parent.id,
        },
      });
    },
     commentsCount: async (parent, _, { prisma }) => {
    return prisma.comment.count({
      where: {
        postId: parent.id,
      },
    });
  },

    likedByCurrentUser: async (parent, _, { prisma, req, res }) => {
    const user = await getUserFromRequest(req, res);
        if (!user) {
          //throw new Error("Not authenticated");
           return false;
        }

    const existingLike = await prisma.like.findFirst({
      where: {
        postId: parent.id,
        userId: user.id,
      },
    });

    return !!existingLike;
  },
  }
}

export default postResolvers;