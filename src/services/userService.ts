import {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
} from "../models/userModel";
import { User } from "../interfaces/user";

export const getAllUsers = async (): Promise<User[] | null> => {
  return await getUsers();
};

export const getOneUser = async (id: string): Promise<User | null> => {
  return await getUserById(id);
};

export const createOneUser = async (user: User): Promise<void> => {
  await createUser(user);
};

export const updateUser = async (
  id: string,
  user: Partial<User>
): Promise<void> => {
  await updateUserById(id, user);
};

export const deleteUser = async (id: string): Promise<void> => {
  await deleteUserById(id);
};
