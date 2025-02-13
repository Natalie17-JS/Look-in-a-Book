import { GraphQLUpload } from "graphql-upload-minimal";
import { createWriteStream } from "fs";
import path from "path";
import prisma from "../../prisma/prismaClient"; 

const uploadResolvers = {
  Upload: GraphQLUpload,

  Mutation: {
    uploadFile: async (_: any, { file, type, id }: any) => {
      const { createReadStream, filename } = await file;

      // Генерируем путь к файлу
      const uploadDir = path.join(process.cwd(), "uploads");
      const filePath = path.join(uploadDir, filename);

      // Сохраняем файл на сервере
      await new Promise((resolve, reject) => {
        createReadStream()
          .pipe(createWriteStream(filePath))
          .on("finish", resolve)
          .on("error", reject);
      });

      // Формируем URL файла
      const fileUrl = `/uploads/${filename}`;

      // Обновляем соответствующую сущность в базе
      if (type === "COVER") {
        await prisma.book.update({
          where: { id: Number(id) },
          data: { cover: fileUrl },
        });
      } else if (type === "AVATAR") {
        await prisma.user.update({
          where: { id: Number(id) },
          data: { avatar: fileUrl },
        });
      } else if (type === "POST_IMAGE") {
        await prisma.post.update({
          where: { id: Number(id) },
          data: { image: fileUrl },
        });
      }

      return fileUrl;
    },
  },
};

export default uploadResolvers;
