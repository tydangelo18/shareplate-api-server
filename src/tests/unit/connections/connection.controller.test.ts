import { Request, Response, NextFunction } from "express";
import {
  getAllConnectionsByUser,
  getAllConnectionRequestsByUser,
  createConnectionRequest,
  deleteConnection,
  denyConnectionRequest,
  acceptConnectionRequest,
} from "@controllers/connectionController";
import * as connectionService from "@services/connectionService";
import { ConnectionStatus } from "@utils/enums";

jest.mock("@services/connectionService");

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
    it("should return connections for a user", async () => {
      const mockConnections = [
        {
          id: "1",
          requester_id: "123",
          user_id: "456",
          status: ConnectionStatus.ACCEPTED,
        },
        {
          id: "2",
          requester_id: "012",
          user_id: "456",
          status: ConnectionStatus.ACCEPTED,
        },
        {
          id: "3",
          requester_id: "789",
          user_id: "456",
          status: ConnectionStatus.ACCEPTED,
        },
      ];
      jest
        .spyOn(connectionService, "getConnectionsByUser")
        .mockResolvedValue(mockConnections);

      const req = mockRequest({ user_id: "456" });
      const res = mockResponse();

      await getAllConnectionsByUser(req as Request, res as Response, mockNext);

      expect(connectionService.getConnectionsByUser).toHaveBeenCalledWith(
        "456"
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockConnections);
    });

    it("should return 404 if no connections found for a user", async () => {
      jest
        .spyOn(connectionService, "getConnectionsByUser")
        .mockResolvedValue(null);

      const req = mockRequest({ user_id: "456" });
      const res = mockResponse();

      await getAllConnectionsByUser(req as Request, res as Response, mockNext);

      expect(connectionService.getConnectionsByUser).toHaveBeenCalledWith(
        "456"
      );
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: "No connections found for this user",
      });
    });

    it("should return 500 if an error occurs during getting connections for a user", async () => {
      jest
        .spyOn(connectionService, "getConnectionsByUser")
        .mockRejectedValue(new Error("Internal server error"));

      const req = mockRequest({ user_id: "456" });
      const res = mockResponse();

      await getAllConnectionsByUser(req as Request, res as Response, mockNext);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
    });
  });

  describe("getAllConnectionRequestsByUser", () => {
    it("should return connection requests for a user", async () => {
      const mockConnections = [
        {
          id: "1",
          requester_id: "123",
          user_id: "456",
          status: ConnectionStatus.PENDING,
        },
        {
          id: "1",
          requester_id: "012",
          user_id: "456",
          status: ConnectionStatus.PENDING,
        },
        {
          id: "1",
          requester_id: "789",
          user_id: "456",
          status: ConnectionStatus.PENDING,
        },
      ];
      jest
        .spyOn(connectionService, "getConnectionRequestsByUser")
        .mockResolvedValue(mockConnections);

      const req = mockRequest({ user_id: "456" });
      const res = mockResponse();

      await getAllConnectionRequestsByUser(
        req as Request,
        res as Response,
        mockNext
      );

      expect(
        connectionService.getConnectionRequestsByUser
      ).toHaveBeenCalledWith("456");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockConnections);
    });

    it("should return 404 if no connection requests are found", async () => {
      jest
        .spyOn(connectionService, "getConnectionRequestsByUser")
        .mockResolvedValue(null);

      const req = mockRequest({ user_id: "456" });
      const res = mockResponse();

      await getAllConnectionRequestsByUser(
        req as Request,
        res as Response,
        mockNext
      );

      expect(
        connectionService.getConnectionRequestsByUser
      ).toHaveBeenCalledWith("456");
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: "No connection requests found for this user",
      });
    });

    it("should return 500 if an error occurs during getting connection requests for a user", async () => {
      jest
        .spyOn(connectionService, "getConnectionRequestsByUser")
        .mockRejectedValue(new Error("Internal server error"));

      const req = mockRequest({ user_id: "456" });
      const res = mockResponse();

      await getAllConnectionRequestsByUser(
        req as Request,
        res as Response,
        mockNext
      );

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
    });
  });

  describe("createConnectionRequest", () => {
    it("should create a new connection request", async () => {
      jest
        .spyOn(connectionService, "createNewConnectionRequest")
        .mockResolvedValue(undefined);

      const req = mockRequest(
        {},
        { id: "1", userId: "123", requester_id: "456" }
      );
      const res = mockResponse();

      await createConnectionRequest(req as Request, res as Response, mockNext);

      expect(connectionService.createNewConnectionRequest).toHaveBeenCalledWith(
        {
          id: "1",
          userId: "123",
          requester_id: "456",
        }
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Connection request created successfully",
      });
    });

    it("should return 500 if an error occurs during creating a connection request", async () => {
      jest
        .spyOn(connectionService, "createNewConnectionRequest")
        .mockRejectedValue(new Error("Internal server error"));

      const req = mockRequest(
        {},
        { id: "1", userId: "123", requester_id: "456" }
      );
      const res = mockResponse();

      await createConnectionRequest(req as Request, res as Response, mockNext);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
    });
  });

  describe("deleteConnection", () => {
    it("should delete a connection", async () => {
      jest
        .spyOn(connectionService, "deleteConnectionById")
        .mockResolvedValue(undefined);

      const req = mockRequest({ id: "1" });
      const res = mockResponse();

      await deleteConnection(req as Request, res as Response, mockNext);

      expect(connectionService.deleteConnectionById).toHaveBeenCalledWith("1");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Connection 1 deleted successfully",
      });
    });

    it("should return 500 if an error occurs during deleting a connection", async () => {
      jest
        .spyOn(connectionService, "deleteConnectionById")
        .mockRejectedValue(new Error("Internal server error"));

      const req = mockRequest({ id: "1" });
      const res = mockResponse();

      await deleteConnection(req as Request, res as Response, mockNext);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
    });
  });

  describe("denyConnectionRequest", () => {
    it("should decline a connection request", async () => {
      jest
        .spyOn(connectionService, "deleteConnectionRequestById")
        .mockResolvedValue();

      const req = { params: { id: "1" } } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await denyConnectionRequest(req as Request, res as Response, jest.fn());

      expect(
        connectionService.deleteConnectionRequestById
      ).toHaveBeenCalledWith("1");

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Connection Request 1 denied successfully",
      });
    });

    it("should return 500 if an error occurs during denying a connection request", async () => {
      jest
        .spyOn(connectionService, "deleteConnectionRequestById")
        .mockRejectedValue(new Error("Internal server error"));

      const req = mockRequest({ id: "1" });
      const res = mockResponse();

      await deleteConnection(req as Request, res as Response, mockNext);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
    });
  });

  describe("acceptConnectionRequest", () => {
    it("should accept a connection request", async () => {
      jest
        .spyOn(connectionService, "updateConnectionRequestById")
        .mockResolvedValue();

      const req = { params: { id: "1" } } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await acceptConnectionRequest(req, res, jest.fn());

      expect(
        connectionService.updateConnectionRequestById
      ).toHaveBeenCalledWith("1");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: `Connection Request 1 accepted successfully`,
      });
    });

    it("should return 500 if an error occurs during accepting a connection request", async () => {
      jest
        .spyOn(connectionService, "updateConnectionRequestById")
        .mockRejectedValue(new Error("Internal server error"));

      const req = mockRequest({ id: "1" });
      const res = mockResponse();

      await deleteConnection(req as Request, res as Response, mockNext);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
    });
  });
});
