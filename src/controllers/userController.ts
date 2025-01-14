import { Request, Response, NextFunction } from "express";
import {
  getUsers,
  getUserById,
  registerUser,
  updateUserById,
  deleteUserById,
} from "../services/userService";
import { User } from "../interfaces/user";

export const getAllUsers = async (
  _req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  try {
    const users = await getUsers();

    if (!users) {
      res.status(404).json({ error: "Users not found" });
      return;
    }

    res.status(200).json(users);
  } catch (error: any) {
    console.error(`Error fetching users: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  try {
    const user = await getUserById(id);

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (error: any) {
    console.error(`Error fetching user: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

export const createUser =  async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const user: User = req.body;

  try {
    await registerUser(user);
    res.status(201).json({ message: "User created successfully" });
  } catch (error: any) {
    console.error(`Error creating user: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const { id } = req.params;
  const updates = req.body;

  try {
    await updateUserById(id, updates);

    res.status(200).json({ message: `User ${id} updated successfully` });
  } catch (error: any) {
    console.error(`Error updating user: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  try {
    await deleteUserById(id);

    res.status(200).json({ message: `User ${id} deleted successfully` });
  } catch (error: any) {
    console.error(`Error deleting user: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};
