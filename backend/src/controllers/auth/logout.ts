import { Request, Response } from "express";
import { invalidateRefreshToken } from "./tokenUtils";

export const logout = async (req: Request, res: Response): Promise<void> => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    res.status(400).json({ error: "Refresh token is required" });
    return;
  }

  const isInvalidated = await invalidateRefreshToken(refreshToken);

  if (isInvalidated) {
    res
      .clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .json({ message: "Logged out successfully" });
  } else {
    res.status(400).json({ error: "Invalid refresh token" });
  }
};
