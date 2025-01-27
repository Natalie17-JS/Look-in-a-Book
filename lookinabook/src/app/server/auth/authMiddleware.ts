import { verifyAccessToken } from "@/app/server/auth/auth";
import { NextApiRequest, NextApiResponse } from "next";

interface CustomApiRequest extends NextApiRequest {
  user?: { id: number; email: string }; // Добавляем поле user с нужной структурой
}

export const authMiddleware = (
  handler: (req: CustomApiRequest, res: NextApiResponse) => any
) => {
  return async (req: CustomApiRequest, res: NextApiResponse) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    try {
      const user = verifyAccessToken(token); // Расшифровываем токен
      req.user = user; // Добавляем пользователя в запрос
      return handler(req, res); // Передаем управление следующему обработчику
    } catch (error) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
  };
};
