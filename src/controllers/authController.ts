import { Request, Response, NextFunction } from "express";
import * as authService from "@services/authService";

export const login = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required" });
    return;
  }

  try {
    const result = await authService.login(email, password);
    res.status(200).json({ message: "Login successful", ...result });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
}
