import { Request, Response, NextFunction } from "express";
import {
  getAllConnectionsByUser,
  getAllConnectionRequestsByUser,
  createConnectionRequest,
  deleteConnection,
  denyConnectionRequest,
  acceptConnectionRequest,
} from "../../../controllers/connectionController";
import {
  getConnectionsByUser,
  getConnectionRequestsByUser,
  createNewConnectionRequest,
  deleteConnectionById,
  deleteConnectionRequestById,
  updateConnectionRequestById,
} from "../../../services/connectionService";

jest.mock("../../../services/connectionService");

const mockRequest = (params: any, body: any = {}): Partial<Request> => ({
  params,
  body,
});
const mockResponse = (): Partial<Response> => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};
const mockNext: NextFunction = jest.fn();

describe("Connections Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllConnectionsByUser", () => {
    it("should return connections for a valid user", async () => {
      const mockConnections = [{ id: "1", name: "Connection 1" }];
      (getConnectionsByUser as jest.Mock).mockResolvedValue(mockConnections);

      const req = mockRequest({ user_id: "123" });
      const res = mockResponse();

      await getAllConnectionsByUser(req as Request, res as Response, mockNext);

      expect(getConnectionsByUser).toHaveBeenCalledWith("123");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockConnections);
    });

    it("should return 404 if no connections found", async () => {
      (getConnectionsByUser as jest.Mock).mockResolvedValue(null);

      const req = mockRequest({ user_id: "123" });
      const res = mockResponse();

      await getAllConnectionsByUser(req as Request, res as Response, mockNext);

      expect(getConnectionsByUser).toHaveBeenCalledWith("123");
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: "No connections found for this user",
      });
    });

    it("should return 500 on error", async () => {
      (getConnectionsByUser as jest.Mock).mockRejectedValue(
        new Error("Service error")
      );

      const req = mockRequest({ user_id: "123" });
      const res = mockResponse();

      await getAllConnectionsByUser(req as Request, res as Response, mockNext);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Service error" });
    });
  });

  describe("getAllConnectionRequestsByUser", () => {
    it("should return connection requests for a valid user", async () => {
      const mockConnections = [{ id: "1", name: "Connection 1" }];
      (getConnectionRequestsByUser as jest.Mock).mockResolvedValue(
        mockConnections
      );

      const req = mockRequest({ user_id: "123" });
      const res = mockResponse();

      await getAllConnectionRequestsByUser(
        req as Request,
        res as Response,
        mockNext
      );

      expect(getConnectionRequestsByUser).toHaveBeenCalledWith("123");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockConnections);
    });

    it("should return 404 if no connections found", async () => {
      (getConnectionRequestsByUser as jest.Mock).mockResolvedValue(null);

      const req = mockRequest({ user_id: "123" });
      const res = mockResponse();

      await getAllConnectionRequestsByUser(
        req as Request,
        res as Response,
        mockNext
      );

      expect(getConnectionRequestsByUser).toHaveBeenCalledWith("123");
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: "No connection requests found for this user",
      });
    });

    it("should return 500 on error", async () => {
      (getConnectionRequestsByUser as jest.Mock).mockRejectedValue(
        new Error("Service error")
      );

      const req = mockRequest({ user_id: "123" });
      const res = mockResponse();

      await getAllConnectionRequestsByUser(
        req as Request,
        res as Response,
        mockNext
      );

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Service error" });
    });
  });

  describe("createConnectionRequest", () => {
    it("should create a new connection request", async () => {
      (createNewConnectionRequest as jest.Mock).mockResolvedValue(undefined);

      const req = mockRequest({}, { id: "1", userId: "123" });
      const res = mockResponse();

      await createConnectionRequest(req as Request, res as Response, mockNext);

      expect(createNewConnectionRequest).toHaveBeenCalledWith({
        id: "1",
        userId: "123",
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Connection request created successfully",
      });
    });

    it("should return 500 on error", async () => {
      (createNewConnectionRequest as jest.Mock).mockRejectedValue(
        new Error("Service error")
      );

      const req = mockRequest({}, { id: "1", userId: "123" });
      const res = mockResponse();

      await createConnectionRequest(req as Request, res as Response, mockNext);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Service error" });
    });
  });

  describe("deleteConnection", () => {
    it("should delete a connection", async () => {
      (deleteConnectionById as jest.Mock).mockResolvedValue(undefined);

      const req = mockRequest({ id: "1" });
      const res = mockResponse();

      await deleteConnection(req as Request, res as Response, mockNext);

      expect(deleteConnectionById).toHaveBeenCalledWith("1");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Connection 1 deleted successfully",
      });
    });

    it("should return 500 on error", async () => {
      (deleteConnectionById as jest.Mock).mockRejectedValue(
        new Error("Service error")
      );

      const req = mockRequest({ id: "1" });
      const res = mockResponse();

      await deleteConnection(req as Request, res as Response, mockNext);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Service error" });
    });
  });

  describe("denyConnectionRequest", () => {
    it("should return 200 on successful connection decline", async () => {
      (deleteConnectionRequestById as jest.Mock).mockResolvedValue({
        success: true,
      });

      const req = { params: { id: "1" } } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      // Call the controller method
      await denyConnectionRequest(req as Request, res as Response, jest.fn());

      //   // Check if the service method was called correctly
      expect(deleteConnectionRequestById).toHaveBeenCalledWith("1");

      //   // Check if response methods were called with the expected arguments
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Connection Request 1 denied successfully",
      });
    });
  });

  describe("acceptConnectionRequest", () => {
    it("should return 200 on successful connection acceptance", async () => {
      (updateConnectionRequestById as jest.Mock).mockResolvedValue({
        success: true,
      });

      const req = { params: { id: "1" } } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await acceptConnectionRequest(req, res, jest.fn());

      expect(updateConnectionRequestById).toHaveBeenCalledWith("1");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: `Connection Request 1 accepted successfully`,
      });
    });
  });
});
