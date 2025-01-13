import { Request, Response, NextFunction } from "express";
import {
  getConnectionsByUser,
  getConnectionRequestsByUser,
  createNewConnectionRequest,
  deleteConnectionById,
  deleteConnectionRequestById,
  updateConnectionRequestById,
} from "../services/connectionService";
import { Connection } from "../interfaces/connection";

export const getAllConnectionsByUser = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const { user_id } = req.params;

  try {
    const connections = await getConnectionsByUser(user_id);

    if (!connections) {
      res.status(404).json({ error: "No connections found for this user" });
      return;
    }

    res.status(200).json(connections);
  } catch (error: any) {
    console.error(`Error fetching connections by user: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

export const getAllConnectionRequestsByUser = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const { user_id } = req.params;

  try {
    const connectionRequests = await getConnectionRequestsByUser(user_id);

    if (!connectionRequests) {
      res
        .status(404)
        .json({ error: "No connection requests found for this user" });
      return;
    }

    res.status(200).json(connectionRequests);
  } catch (error: any) {
    console.error(
      `Error fetching connection requests by user: ${error.message}`
    );
    res.status(500).json({ error: error.message });
  }
};

export const createConnectionRequest = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const connectionRequest: Connection = req.body;

  try {
    await createNewConnectionRequest(connectionRequest);

    res
      .status(200)
      .json({ message: "Connection request created successfully" });
  } catch (error: any) {
    console.error(`Error creating connection request: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

export const deleteConnection = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  try {
    await deleteConnectionById(id);

    res.status(200).json({ message: `Connection ${id} deleted successfully` });
  } catch (error: any) {
    console.error(`Error deleting connection: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

export const denyConnectionRequest = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  try {
    await deleteConnectionRequestById(id);

    res
      .status(200)
      .json({ message: `Connection Request ${id} denied successfully` });
  } catch (error: any) {
    console.error(`Error denying connection request: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

export const acceptConnectionRequest = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  try {
    await updateConnectionRequestById(id);

    res
      .status(200)
      .json({ message: `Connection Request ${id} accepted successfully` });
  } catch (error: any) {
    console.error(`Error accepting connection request: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};
