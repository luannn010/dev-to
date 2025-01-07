import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { createUser } from "../../database/models/userModel";

export const signup = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: "Username and password are required" });
    return;
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await createUser(username, hashedPassword);
    res.status(201).json({ message: "User created", userId });
  } catch (err: any) {
    if (err.message.includes("UNIQUE")) {
      res.status(409).json({ error: "Username already exists" });
    } else {
      res.status(500).json({ error: "Server error" });
    }
  }
};
