import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { isRefreshTokenValid, storeRefreshToken, invalidateRefreshToken } from "./tokenUtils";

const SECRET_KEY = process.env.SECRET_KEY || "default_key";
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY || "default_refresh_secret_key";

export const refreshAccessToken = async (req: Request, res: Response): Promise<void> => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    res.status(400).json({ error: "Refresh token is required" });
    return;
  }

  const isValid = await isRefreshTokenValid(refreshToken);
  if (!isValid) {
    res.status(403).json({ error: "Invalid or expired refresh token" });
    return;
  }

  try {
    const payload = jwt.verify(refreshToken, REFRESH_SECRET_KEY) as jwt.JwtPayload;

    // Invalidate the old refresh token (optional for enhanced security)
    await invalidateRefreshToken(refreshToken);

    // Generate a new access token and refresh token
    const accessToken = jwt.sign({ userId: payload.userId }, SECRET_KEY, { expiresIn: "15m" });
    const newRefreshToken = jwt.sign({ userId: payload.userId }, REFRESH_SECRET_KEY, { expiresIn: "7d" });

    // Store the new refresh token in the database
    await storeRefreshToken(newRefreshToken, payload.userId);

    // Send the new refresh token and access token
    res
      .cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      res.json({ accessToken });
  } catch (error) {
    console.error("Error verifying refresh token:", (error as Error).message);
    res.status(403).json({ error: "Invalid or expired refresh token" });
  }
  }
