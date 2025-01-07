import { storeRefreshToken as dbStoreRefreshToken, deleteRefreshToken, findRefreshToken } from "../../database/models/refreshTokenModel";

// Store a new refresh token in the database
export const storeRefreshToken = async (token: string, userId: number): Promise<void> => {
  await dbStoreRefreshToken(token, userId);
};

// Invalidate (delete) a refresh token in the database
export const invalidateRefreshToken = async (token: string): Promise<boolean> => {
    const tokenExists = await findRefreshToken(token);
    if (!tokenExists) {
      return false; // Token does not exist
    }
    
    try {
      await deleteRefreshToken(token);
      return true; // Token successfully invalidated
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error invalidating refresh token:", err.message);
      } else {
        console.error("Error invalidating refresh token: An unknown error occurred");
      }
      return false;
    }
  };

// Check if a refresh token is valid (exists in the database)
export const isRefreshTokenValid = async (token: string): Promise<boolean> => {
  return await findRefreshToken(token);
};
