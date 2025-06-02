import prisma from "@/app/server/prisma/prismaClient"
import { DateTime } from "../resolversTypes/dateTime";
import { getUserFromRequest } from "../../auth/authMiddleware";
import {CommentsResolversTypes} from "../resolversTypes/commentsResolversTypes"
import { CommentType } from "@prisma/client";

const commentsResolvers: CommentsResolversTypes = {
    DateTime,

    Query: {
        getCommentById: async (_parent, {id}) => {
            try {
                const comment = await prisma.comment.findUnique({
                    where: {id},
                     include: { author: true,  
                      replies: {
    include: {
      author: true,
    },
  }, parentComment: true },
                })
                return comment;
            } catch (error) {
                console.error("Error fetching comment:", error);
                throw new Error ("Failed to fetch comment")
            }
        },

        getCommentsByBook: async (_parent, { bookId }) => {
    try {
      const commentsByBook =  await prisma.comment.findMany({
        where: { bookId },
        include: { author: true,  
          replies: {
    include: {
      author: true,
    },
  }, },
      });
      return commentsByBook;
    } catch (error) {
      console.error('Error fetching comments for book:', error);
      throw new Error('Failed to get comments for this book');
    }
  },
  getCommentsByChapter: async (_parent, {chapterId}) => {
    try{
        const commentsByChapter = await prisma.comment.findMany({
            where: {chapterId},
            include: {author: true,  
              replies: {
    include: {
      author: true,
    },
  },}
        })
        return commentsByChapter;
    } catch (error) {
        console.error('Error fetching comments for chapter:', error);
      throw new Error('Failed to get comments for this chapter');
    }
  },

  getCommentsByPost: async (_parent, { postId }) => {
    try {
      const commentsByPost = await prisma.comment.findMany({
        where: { postId },
        include: { author: true,  
          replies: {
    include: {
      author: true,
    },
  }, },
      });
      return commentsByPost;
    } catch (error) {
      console.error('Error fetching comments for post:', error);
      throw new Error('Failed to get comments for this post');
    }
  },

   getRepliesToComment: async (_parent, { parentCommentId }) => {
    try {
      const repliesToComment = await prisma.comment.findMany({
        where: { parentCommentId },
        include: { author: true, 
           parentComment: {
      include: {
        author: true, // 👈 сюда, чтобы получить имя пользователя, на чей комментарий ответили
      },
    },
          replies: {
    include: {
      author: true,
    },
  }, },
      });
      return repliesToComment;
    } catch (error) {
      console.error('Error fetching replies:', error);
      throw new Error('Failed to get replies for this comment');
    }
  },

  getUserComments: async (_parent, _args, {req, res}) => {
  try {
     const user = await getUserFromRequest(req, res);
        if (!user) {
          throw new Error("Not authenticated");
        }
    const userComments = await prisma.comment.findMany({
      where: {
        authorId: user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        book: true,
        post: true,
        chapter: true,
        parentComment: true,
      },
    });
    return userComments;
  } catch (error) {
    console.error('Error fetching user comments', error);
    throw new Error('Failed to get user comments');
  }
},

    },

    Mutation: {
  createComment: async (_parent, { content, commentType, targetId, parentCommentId  }, { req, res, prisma }) => {
    try {
    const user = await getUserFromRequest(req, res);
    if (!user) {
      throw new Error("Not authenticated");
    }

    const data: any = {
      content,
      commentType,
      author: { connect: { id: user.id } },
    };

    // Обработка типа комментария
    switch (commentType) {
      case CommentType.BOOKCOMMENT:
        data.book = { connect: { id: Number(targetId) } };
        break;
      case CommentType.POSTCOMMENT:
        data.post = { connect: { id: String(targetId) } };
        break;
      case CommentType.CHAPTERCOMMENT:
        data.chapter = { connect: { id: String(targetId) } };
        break;
      case CommentType.REPLYCOMMENT:
        // replies не привязываются к книге/посту/главе — только к родительскому комментарию
        if (!parentCommentId) {
          throw new Error("Missing parentCommentId for REPLYCOMMENT");
        }
        data.parentComment = { connect: { id: Number(parentCommentId) } };
        break;
      default:
        throw new Error("Invalid comment type");
    }

    const newComment = await prisma.comment.create({
      data,
      include: {
        author: true,
        book: true,
        chapter: true,
        post: true,
        parentComment: true,
        replies: true,
      },
    });

    return newComment;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw new Error("Failed to create a comment");
  }
  },

  editComment: async (_parent, { id, content } , { req, res } ) => {
    try {
         const user = await getUserFromRequest(req, res);
        if (!user) {
          throw new Error("Not authenticated");
        }

    const comment = await prisma.comment.findUnique({
        where: { id },
        include: { author: true },
            });

        if (!comment) {
            throw new Error("Comment not found");
        }

         // Проверка, что коммент редактирует автор
    if (comment.authorId !== user.id) {
      throw new Error("Not authorized to edit this comment");
    }
        
      const updatedComment =  await prisma.comment.update({
        where: { id },
        data: { content },
        include: {
          author: true,
        },
      });
      return updatedComment;
    } catch (error) {
      console.error('Error editing comment:', error);
      throw new Error('Filed to update a comment');
    }
  },

  deleteComment: async (_parent, { id }, { req, res }) => {
    try {
        const user = await getUserFromRequest(req, res);
        if (!user) {
          throw new Error("Not authenticated");
        }
        const comment = await prisma.comment.findUnique({
        where: { id },
        include: { author: true },
            });

        if (!comment) {
          throw new Error("Post not found");
        }

        if (user.id !== comment.authorId && user.role !== "ADMIN") {
          throw new Error("You are not allowed to delete this post");
        }
       await prisma.comment.delete({
        where: { id },
        include: {
          author: true,
        },
      });
      return { message: "Comment deleted successfully" };
    } catch (error) {
      console.error('Error deleting comment:', error);
      throw new Error('Filed to delete a comment');
    }
  },
},

}
export default commentsResolvers;