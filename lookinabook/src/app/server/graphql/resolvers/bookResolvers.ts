import { BookResolvers } from "../resolversTypes/bookresolversTypes";
import { DateTime } from "../resolversTypes/dateTime";
import prisma from "@/app/server/prisma/prismaClient";
import slugify from "slugify"

const bookResolvers: BookResolvers = {
DateTime,

Query: {
    async getBook (_, { id }) {
        try {
            const book = await prisma.book.findUnique({
                where: { id },
            });
            return book;
        } catch (error) {
            console.error("Error fetching book:", error);
            throw new Error("Failed to fetch book");
          }
    },
    async getBooks() {
        try {
            const books = await prisma.book.findMany();
            return books;
        } catch (error) {
            console.error("Error fetching books:", error);
            throw new Error("Failed to fetch books");
        }
    }
},

Mutation: {
    async createBook(_, {title, annotation, cover, authorId}) {
        try {
            const author = await prisma.user.findUnique({ where: { id: authorId } });
            if (!author) {
              throw new Error("Author not found");
            }
            const slug = slugify(title, { lower: true, strict: true });

            const newBook = await prisma.book.create({
              data: {
                title,
                annotation,
                cover,
                slug, 
                author: { connect: { id: authorId } },
              },
            });
      
            return newBook;
        }
        catch (error) {
            console.error("Error creating book:", error);
            throw new Error("Failed to create book");
        }
    },

    async updateBook(_, { id, title, annotation, cover, authorId }) {
        try {
            const book = await prisma.book.findUnique({where: { id }})
            if (!book) {
                throw new Error("Book not found");
              }
               
            if (book.authorId !== authorId) {
                throw new Error("You are not allowed to update this book");
              }
              let updatedFields: { title?: string; annotation?: string; cover?: string; slug?: string } = {};
        
              if (title) {
                updatedFields.title = title;
                updatedFields.slug = slugify(title, { lower: true, strict: true });
              }
              if (annotation) updatedFields.annotation = annotation;
              if (cover) updatedFields.cover = cover;
      
              // 4️⃣ Обновляем книгу
              const updatedBook = await prisma.book.update({
                where: { id },
                data: updatedFields,
              });
      
              return updatedBook;
            } catch (error) {
              console.error("Error updating book:", error);
              throw new Error("Failed to update book");
            }
          },
        
        async deleteBook(_, { id }, { user }) {
            try {
              const book = await prisma.book.findUnique({ where: { id } });
              if (!book) {
                throw new Error("Book not found");
              }
              if (!user || user.id !== book.authorId) {
                throw new Error("You are not allowed to delete this book");
              }
              await prisma.book.delete({ where: { id } });

              return { message: "Book deleted successfully" };
             } catch (error) {
                console.error("Error deleting book:", error);
                throw new Error("Failed to delete book");
              }
        }
    },
};