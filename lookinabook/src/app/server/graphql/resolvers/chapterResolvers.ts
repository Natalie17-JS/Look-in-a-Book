import prisma from "@/app/server/prisma/prismaClient";
import { DateTime } from "../resolversTypes/dateTime";
import { getUserFromRequest } from "../../auth/authMiddleware";
import cuid from 'cuid'; 
import { ChapterResolvers } from "../resolversTypes/chapterResolversTypes";


const chapterResolvers: ChapterResolvers = {
DateTime,

Query: {
    async getChapterById(_, {id}) {
    try{
        const chapter = await prisma.chapter.findUnique({
            where: { id },
            include: {book: true}
        });
        return chapter;
    } catch(error) {
        console.error("Error fetching chapter:", error);
            throw new Error("Failed to fetch chapter");
    }
},

async getChaptersByBookId(_, { bookId }) {
  try {
    if (!bookId) {
      throw new Error("Book ID is required");
    }

    // Проверяем, существует ли такая книга
    const book = await prisma.book.findUnique({
      where: { id: bookId },
      select: { id: true }, // Достаточно только ID
    });

    if (!book) {
      throw new Error("Book not found");
    }

    // Получаем только опубликованные главы этой книги
    const chapters = await prisma.chapter.findMany({
      where: {
        bookId: book.id,
        /*publishStatus: "PUBLISHED",*/
      },
      include: { book: true, comments: true },
    });

    return chapters;
  } catch (error) {
    console.error("Error fetching chapters:", error);
    throw new Error("Failed to fetch chapters");
  }
},

async getChaptersByBookSlug(_, { slug }) {
  try {
    if (!slug) {
      throw new Error("Book slug is required");
    }

    // Проверяем, существует ли книга с таким slug
    const book = await prisma.book.findUnique({
      where: { slug },
      select: { id: true }, // Берем только ID
    });

    if (!book) {
      throw new Error("Book not found");
    }

    // Получаем главы книги
    const chapters = await prisma.chapter.findMany({
      where: {
        bookId: book.id,
        /*publishStatus: "PUBLISHED",*/
      },
      include: { book: true, comments: true },
    });

    return chapters;
  } catch (error) {
    console.error("Error fetching chapters:", error);
    throw new Error("Failed to fetch chapters");
  }
},


async getAuthorBookChapters(_, { bookId }, { req, res, prisma }) {
  try {
    const user = await getUserFromRequest(req, res);
    if (!user) {
      throw new Error("Not authenticated");
    }

    // Проверяем, принадлежит ли книга этому автору
    const book = await prisma.book.findUnique({
      where: { id: bookId, authorId: user.id },
      select: { id: true }, // Достаточно только ID
    });

    if (!book) {
      throw new Error("Book not found or you are not the author");
    }

    // Получаем главы этой книги
    const chapters = await prisma.chapter.findMany({
      where: { bookId: book.id },
      include: { book: true, comments: true },
    });

    return chapters;
  } catch (error) {
    console.error("Error fetching author's book chapters:", error);
    throw new Error("Failed to fetch author's book chapters");
  }
},

async getChapterDrafts(_, { bookId }, { req, res, prisma }) {
  try {
    const user = await getUserFromRequest(req, res);
    if (!user) {
      throw new Error("Not authenticated");
    }

    // Ищем книгу, принадлежащую пользователю
    const book = await prisma.book.findUnique({
      where: {
        id: bookId, 
        authorId: user.id, // Проверяем, что книга принадлежит пользователю
      },
      select: { id: true }, // Нам нужен только ID книги
    });

    if (!book) {
      throw new Error("Book not found or you don't have access to it");
    }

    // Получаем черновики глав для этой книги
    const chapterDrafts = await prisma.chapter.findMany({
      where: {
        publishStatus: "DRAFT",
        bookId: book.id, // Используем ID найденной книги
      },
      include: { book: true, comments: true },
    });

    return chapterDrafts;
  } catch (error) {
    console.error("Error fetching chapter drafts:", error);
    throw new Error("Failed to fetch chapter drafts");
  }
}

},
Mutation: {
    async createChapterWithBookId(_, { title, content,publishStatus, bookId }, { req, res, prisma }) {
        try {
          const user = await getUserFromRequest(req, res);
          if (!user) {
            throw new Error("Not authenticated");
          }
      
          // Проверка существования книги
          const bookExists = await prisma.book.findUnique({
            where: { id: bookId },
          });
      
          if (!bookExists) {
            throw new Error("Book not found");
          }
      
          // Создание новой главы с уникальным ID (cuid)
          const newChapter = await prisma.chapter.create({
            data: {
              id: cuid(), // Генерация уникального ID для главы
              title: title,
              content: content,
              bookId: bookId,
              publishStatus: publishStatus
            },
          });
      
          return newChapter;
        } catch (error) {
          console.error("Error creating chapter:", error);
          throw new Error("Failed to create chapter");
        }
      },

      async createChapterWithBookSlug(_, { title, content,publishStatus, slug }, { req, res, prisma }) {
        try {
          const user = await getUserFromRequest(req, res);
          if (!user) {
            throw new Error("Not authenticated");
          }
      
          // Проверка существования книги
          const bookExists = await prisma.book.findUnique({
            where: { slug },
          });
      
          if (!bookExists) {
            throw new Error("Book not found");
          }
      
          // Создание новой главы с уникальным ID (cuid)
          const newChapter = await prisma.chapter.create({
            data: {
              id: cuid(), // Генерация уникального ID для главы
              title: title,
              content: content,
              bookId: bookExists.id,
              publishStatus: publishStatus
            },
          });
      
          return newChapter;
        } catch (error) {
          console.error("Error creating chapter:", error);
          throw new Error("Failed to create chapter");
        }
      },

      async editChapter(_, { id, title, content, bookId }, { req, res, prisma }) {
        try {
          // Получаем текущего пользователя
          const user = await getUserFromRequest(req, res);
          if (!user) {
            throw new Error("Not authenticated");
          }
  
          // Проверяем, существует ли глава
          const chapter = await prisma.chapter.findUnique({
            where: { id },
            include: { book: true }, // Включаем информацию о книге для проверки
          });
  
          if (!chapter) {
            throw new Error("Chapter not found");
          }
  
          // Проверяем, принадлежит ли книга этому пользователю
          if (chapter.book.authorId !== user.id) {
            throw new Error("You can only edit chapters of your own books");
          }
  
          // Обновляем информацию о главе
          const updatedChapter = await prisma.chapter.update({
            where: { id },
            data: {
              title: title || chapter.title, // Если title не передан, оставляем старый
              content: content || chapter.content, // Если content не передан, оставляем старый
              bookId: bookId || chapter.bookId, // Если bookId не передан, оставляем старый
            },
          });
  
          return updatedChapter;
        } catch (error) {
          console.error("Error editing chapter:", error);
          throw new Error("Failed to edit chapter");
        }
      },

      async publishChapter(_, { id }, { req, res, prisma }) {
        try {
          // Получаем текущего пользователя
          const user = await getUserFromRequest(req, res);
          if (!user) {
            throw new Error("Not authenticated");
          }
      
          // Находим главу
          const chapter = await prisma.chapter.findUnique({
            where: { id },
            include: { book: true }, // Включаем книгу для проверки авторства
          });
      
          if (!chapter) {
            throw new Error("Chapter not found");
          }
      
          // Проверяем, принадлежит ли глава книге, автором которой является текущий пользователь
          if (chapter.book.authorId !== user.id) {
            throw new Error("You are not allowed to publish this chapter");
          }
      
          // Проверяем, что глава находится в статусе "DRAFT"
          if (chapter.publishStatus === "PUBLISHED") {
            throw new Error("This chapter is already published");
          }
      
          // Обновляем статус главы на "PUBLISHED"
          const updatedChapter = await prisma.chapter.update({
            where: { id },
            data: { publishStatus: "PUBLISHED" },
            include: { book: true }, // Можно включить доп. инфу о книге
          });
      
          return updatedChapter;
        } catch (error) {
          console.error("Error publishing chapter:", error);
          throw new Error("Failed to publish chapter");
        }
      },
      
  
      // Резолвер для удаления главы
      async deleteChapterById(_, { id }, { req, res, prisma }) {
        try {
          // Получаем текущего пользователя
          const user = await getUserFromRequest(req, res);
          if (!user) {
            throw new Error("Not authenticated");
          }
  
          // Проверяем, существует ли глава
          const chapter = await prisma.chapter.findUnique({
            where: { id },
            include: { book: true }, // Включаем информацию о книге для проверки
          });
  
          if (!chapter) {
            throw new Error("Chapter not found");
          }
  
          // Проверяем, принадлежит ли книга этому пользователю
          if (chapter.book.authorId !== user.id) {
            throw new Error("You can only delete chapters of your own books");
          }
  
          // Удаляем главу
          await prisma.chapter.delete({
            where: { id },
          });
  
          return { message: "Chapter deleted successfully" };
        } catch (error) {
          console.error("Error deleting chapter:", error);
          throw new Error("Failed to delete chapter");
        }
      },
}
}

export default chapterResolvers