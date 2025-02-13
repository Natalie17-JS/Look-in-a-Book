import { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import path from "path";
import fs from "fs";

// Определяем тип для Multer-файла
interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
}

// Указываем папку для загрузки файлов
const uploadDir = path.join(process.cwd(), "uploads");

// Создаём папку, если её нет
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Конфигурация хранилища Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = file.fieldname === "avatar" ? "avatars" : "covers";
    const uploadPath = path.join(uploadDir, folder);

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});

// Создаём экземпляр multer
const upload = multer({ storage });

// Обертка для работы с Next.js API Routes
export const config = {
  api: {
    bodyParser: false, // Отключаем bodyParser, так как используем multer
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    upload.single("file")(req as any, res as any, (err: any) => {
      if (err) {
        return res.status(500).json({ error: "Error uploading file" });
      }

      // Проверяем, есть ли загруженный файл
      const file = (req as any).file as MulterFile | undefined;
      if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      // Создаём URL для загруженного файла
      const filePath = `/uploads/${file.fieldname === "avatar" ? "avatars" : "covers"}/${file.filename}`;

      return res.status(200).json({ url: filePath });
    });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
