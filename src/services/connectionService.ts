import {
  findAllConnectionsByUser,
  findAllConnectionRequestsByUser,
  createConnectionRequestByUser,
  deleteConnectionByUser,
  deleteConnectionRequestByUser,
  updateConnectionRequestByUser,
} from "../models/connectionModel";
import { Connection } from "../interfaces/connection";

export const getConnectionsByUser = async (
  user_id: string
): Promise<Connection[] | null> => {
  return await findAllConnectionsByUser(user_id);
};

export const getConnectionRequestsByUser = async (
  user_id: string
): Promise<Connection[] | null> => {
  return await findAllConnectionRequestsByUser(user_id);
};

export const createNewConnectionRequest = async (
  connection: Connection
): Promise<void> => {
  await createConnectionRequestByUser(connection);
};

export const deleteConnectionById = async (id: string): Promise<void> => {
  await deleteConnectionByUser(id);
};

export const deleteConnectionRequestById = async (
  id: string
): Promise<void> => {
  await deleteConnectionRequestByUser(id);
};

export const updateConnectionRequestById = async (
  id: string
): Promise<void> => {
  await updateConnectionRequestByUser(id);
};
