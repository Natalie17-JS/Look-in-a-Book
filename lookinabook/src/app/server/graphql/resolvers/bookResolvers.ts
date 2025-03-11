import { Category, Genre, PStatus, WStatus } from "@prisma/client";
import { getUserFromRequest } from "../../auth/authMiddleware";
import { BookResolvers } from "../resolversTypes/bookResolversTypes"
import { DateTime } from "../resolversTypes/dateTime";
import prisma from "@/app/server/prisma/prismaClient";
import slugify from "slugify"

const bookResolvers: BookResolvers = {
DateTime,

Query: {
    async getBookById (_, { id }) {
        try {
            const book = await prisma.book.findUnique({
                where: { id },
                include: {
                  author: {        
                      select: { id: true, username: true } 
                  }
              }
            });
            return book;
        } catch (error) {
            console.error("Error fetching book:", error);
            throw new Error("Failed to fetch book");
          }
    },
    async getBookBySlug(_, { slug }) {
      try {
          const book = await prisma.book.findUnique({
              where: { slug }, // Поиск по slug вместо id
              include: {
                  author: {        
                      select: { id: true, username: true } 
                  }
              }
          });
  
          if (!book) {
              throw new Error("Book not found");
          }

          return book;
      } catch (error) {
          console.error("Error fetching book by slug:", error);
          throw new Error("Failed to fetch book");
      }
  },
  
    async getBooks() {
        try {
            const books = await prisma.book.findMany({
              where: {
                publishStatus: "PUBLISHED",
              },
              include: {
                /*chapters: true,  
                comments: true,   
                likes: true, */     
                author: {         
                    select: { id: true, username: true } 
                }
            }
            });
            return books;
        } catch (error) {
            console.error("Error fetching books:", error);
            throw new Error("Failed to fetch books");
        }
    },

    async getBookDrafts(_, __, { req, res, prisma }) {
      try {
        const user = await getUserFromRequest(req, res);
        if (!user) {
          throw new Error("Not authenticated");
        }
    
        // Получаем все книги пользователя со статусом "DRAFT"
        const bookDrafts = await prisma.book.findMany({
          where: {
            publishStatus: "DRAFT",
            authorId: user.id, // Условие, что книги принадлежат текущему пользователю
          },
          include: {
            author: {
              select: { id: true, username: true },
            },
          },
        });
    
        return bookDrafts;
      } catch (error) {
        console.error("Error fetching book drafts:", error);
        throw new Error("Failed to fetch book drafts");
      }
    },
    
    getMyBooks: async (_, __, { prisma, req, res,}) => {
      const user = await getUserFromRequest(req, res);
      if (!user) {
        throw new Error("Not authenticated");
      }

      return await prisma.book.findMany({
        where: {
          authorId: user.id, // Только книги текущего пользователя
        },
      });
    },
},

Mutation: {
  async createBook(_, { title, annotation, cover, category, genre, publishStatus, writingStatus }, { req, res, prisma }) {
    try {
      // Получаем текущего пользователя из запроса
      const user = await getUserFromRequest(req, res);
      if (!user) {
        throw new Error("Not authenticated");
      }
  
      // Генерируем уникальный slug на основе заголовка
      const slug = slugify(title, { lower: true, strict: true });
  
      // Создаем книгу и связываем с пользователем-автором
      const newBook = await prisma.book.create({
        data: {
          title,
          annotation: annotation || null, // Обработка null значений
          cover: cover || null,            // Обработка null значений
          slug,
          category, // Добавляем категорию
          genre,    // Добавляем жанр
          publishStatus,
          writingStatus,
          author: { connect: { id: user.id } }, // Используем id текущего пользователя
        },
        include: {
          author: {  // Включаем информацию о авторе
            select: { id: true, username: true }  // Поля, которые нужно вернуть об авторе
          },
        },
      });
  
      return newBook;
    } catch (error) {
      console.error("Error creating book:", error);
      throw new Error("Failed to create book");
    }
  },

  async updateBook(_, { id, title, annotation, cover, category, genre, publishStatus, writingStatus }, { req, res, user }) {
    try {
      const user = await getUserFromRequest(req, res);
      if (!user) {
        throw new Error("Not authenticated");
      }
  
      const book = await prisma.book.findUnique({ where: { id } });
  
      if (!book) {
        throw new Error("Book not found");
      }
  
      // Только автор книги или админ могут редактировать книгу
      if (user.id !== book.authorId && user.role !== "ADMIN") {
        throw new Error("You are not allowed to update this book");
      }
  
      let updatedFields: { 
        title?: string; 
        annotation?: string; 
        cover?: string; 
        slug?: string, 
        category?: Category, 
        genre?: Genre,
        publishStatus?: PStatus;
        writingStatus?: WStatus;
      } = {};
        
  
      if (title) {
        updatedFields.title = title;
        updatedFields.slug = slugify(title, { lower: true, strict: true });
      }
      if (annotation) updatedFields.annotation = annotation;
      if (cover) updatedFields.cover = cover;
      if (category) updatedFields.category = category;
      if (genre) updatedFields.genre = genre;
      if (publishStatus) updatedFields.publishStatus = publishStatus;
      if (writingStatus) updatedFields.writingStatus = writingStatus;
  
      const updatedBook = await prisma.book.update({
        where: { id },
        data: updatedFields,
        include: { author: true }, // Включаем автора в ответ
      });
  
      return updatedBook;
    } catch (error) {
      console.error("Error updating book:", error);
      throw new Error("Failed to update book");
    }
  },
  
  async publishBook(_, { slug }, { req, res }) {
    try {
      const user = await getUserFromRequest(req, res);
      if (!user) {
        throw new Error("Not authenticated");
      }

      const book = await prisma.book.findUnique({ where: { slug } });

      if (!book) {
        throw new Error("Book not found");
      }

      // Проверяем, является ли пользователь автором книги
      if (user.id !== book.authorId) {
        throw new Error("You are not allowed to publish this book");
      }

      // Проверяем, что книга находится в статусе "DRAFT"
      if (book.publishStatus === "PUBLISHED") {
        throw new Error("This book is already published");
      }

      // Обновляем статус на "PUBLISHED"
      const updatedBook = await prisma.book.update({
        where: { slug },
        data: { publishStatus: "PUBLISHED" },
        include: { author: true }, // Возвращаем автора книги
      });

      return updatedBook;
    } catch (error) {
      console.error("Error publishing book:", error);
      throw new Error("Failed to publish book");
    }
  },

  
        
          async deleteBook(_, { id }, { user, req, res, prisma }) {
            try {
              const user = await getUserFromRequest(req, res);
      if (!user) {
        throw new Error("Not authenticated");
      }
  
              // Находим книгу
              const book = await prisma.book.findUnique({ where: { id } });
          
              if (!book) {
                throw new Error("Book not found");
              }
          
              // Проверяем, является ли пользователь автором или админом
              if (!user || (user.id !== book.authorId && user.role !== "ADMIN")) {
                throw new Error("You are not allowed to delete this book");
              }
          
              // Удаляем книгу
              await prisma.book.delete({ where: { id } });
          
              return { message: "Book deleted successfully" };
            } catch (error) {
              console.error("Error deleting book:", error);
              throw new Error("Failed to delete book");
            }
          }
          
    },
}
export default bookResolvers;