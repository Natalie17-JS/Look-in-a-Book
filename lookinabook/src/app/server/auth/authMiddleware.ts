import { verifyAccessToken, refreshAccessToken } from "./auth"
import { NextRequest, NextResponse } from "next/server";
import { CustomRequest } from "../graphql/resolversTypes/UserResolversTypes";

export async function getUserFromRequest(req: CustomRequest, res: NextResponse) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return null;

  try {
    const accessToken = authHeader.split(" ")[1];
    return verifyAccessToken(accessToken);
  } catch (error) {
    console.log("Access token expired, trying to refresh...");

    const refreshToken = res.cookies.get("refreshToken")?.value;
    if (!refreshToken) return null;

    try {
      const newAccessToken = refreshAccessToken(refreshToken);
      res.headers.set("Authorization", `Bearer ${newAccessToken}`);
      return verifyAccessToken(newAccessToken);
    } catch (refreshError) {
      console.error("Refresh token expired, please log in again");
      return null;
    }
  }
}
