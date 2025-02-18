import jwt, { JwtPayload } from "jsonwebtoken";

interface UserPayload {
  id: number;
  email: string;
  role: string;
}

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "access_secret";
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "refresh_secret";

export const generateAccessToken = (user: UserPayload): string => {
  return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: "30m" });
};

export const generateRefreshToken = (user: UserPayload): string => {
  return jwt.sign(user, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

export const verifyAccessToken = (token: string): UserPayload => {
  const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as JwtPayload;

  // Проверяем, что в объекте есть id и email
  if (
    !decoded ||
    typeof decoded.id !== "number" ||
    typeof decoded.email !== "string"
  ) {
    throw new Error("Invalid token payload");
  }

  return {
    id: decoded.id,
    email: decoded.email,
    role: decoded.role,
  };
};

export const verifyRefreshToken = (token: string): JwtPayload | string => {
  return jwt.verify(token, REFRESH_TOKEN_SECRET);
};

export const refreshAccessToken = (refreshToken: string): string => {
  try {
    if (!refreshToken) {
      throw new Error("No refresh token provided");
    }
    console.log("Received refreshToken:", refreshToken);
    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as JwtPayload;

    if (!decoded || typeof decoded.id !== "number" || typeof decoded.email !== "string") {
      throw new Error("Invalid refresh token payload");
    }

    // Генерируем новый accessToken
    return generateAccessToken({
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    });
    
  } catch (error) {
    throw new Error("Invalid or expired refresh token");
  }
};

