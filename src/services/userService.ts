import {
  findAllUsers,
  findUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../models/userModel";
import { User } from "../interfaces/user";

export const getUsers = async (): Promise<User[] | null> => {
  return await findAllUsers();
};

export const getUserById = async (id: string): Promise<User | null> => {
  return await findUserById(id);
};

export const registerUser = async (user: User): Promise<void> => {
  await createUser(user);
};

export const updateUserById = async (
  id: string,
  user: Partial<User>
): Promise<void> => {
  await updateUser(id, user);
};

export const deleteUserById = async (id: string): Promise<void> => {
  await deleteUser(id);
};
