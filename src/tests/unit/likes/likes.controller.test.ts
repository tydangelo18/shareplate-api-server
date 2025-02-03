import { Request, Response } from "express";
import * as likeService from "@services/likeService";
import {
  getAllLikesByUser,
  getAllLikesByPost,
  createLike,
  deleteLike,
} from "@controllers/likeController";

jest.mock("@services/likeService");

describe("Like Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllLikesByUser", () => {
    it("should return likes by a user", async () => {
      const mockLikes = [
        { id: "1", user_id: "123", post_id: "456" },
        { id: "2", user_id: "123", post_id: "789" },
        { id: "3", user_id: "123", post_id: "012" },
      ];
      jest.spyOn(likeService, "getLikesByUser").mockResolvedValue(mockLikes);

      req.params = { user_id: "123" };

      await getAllLikesByUser(req as Request, res as Response, jest.fn());

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockLikes);
    });

    it("should return 404 if no likes are found by a user", async () => {
      jest.spyOn(likeService, "getLikesByUser").mockResolvedValue(null);

      req.params = { user_id: "123" };

      await getAllLikesByUser(req as Request, res as Response, jest.fn());

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: "No likes found for this user",
      });
    });

    it("should return 500 if an error occurs during getting likes by user", async () => {
      jest
        .spyOn(likeService, "getLikesByUser")
        .mockRejectedValue(new Error("Internal server error"));

      req.params = { user_id: "123" };

      await getAllLikesByUser(req as Request, res as Response, jest.fn());

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
    });
  });

  describe("getAllLikesByPost", () => {
    it("should return likes on a post", async () => {
      const mockLikes = [
        { id: "1", user_id: "123", post_id: "456" },
        { id: "2", user_id: "789", post_id: "456" },
        { id: "2", user_id: "012", post_id: "456" },
      ];
      jest.spyOn(likeService, "getLikesByPost").mockResolvedValue(mockLikes);

      req.params = { post_id: "456" };

      await getAllLikesByPost(req as Request, res as Response, jest.fn());

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockLikes);
    });

    it("should return 404 if no likes are found on a post", async () => {
      jest.spyOn(likeService, "getLikesByPost").mockResolvedValue(null);

      req.params = { post_id: "456" };

      await getAllLikesByPost(req as Request, res as Response, jest.fn());

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: "No likes found for this post",
      });
    });

    it("should return 500 if an error occurs during getting likes on a post", async () => {
      jest
        .spyOn(likeService, "getLikesByPost")
        .mockRejectedValue(new Error("Internal server error"));

      req.params = { post_id: "456" };

      await getAllLikesByPost(req as Request, res as Response, jest.fn());

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
    });
  });

  describe("createLike", () => {
    it("should create a new like", async () => {
      const mockLike = { user_id: "123", post_id: "456" };
      jest.spyOn(likeService, "createNewLike").mockResolvedValue(undefined);

      req.body = mockLike;

      await createLike(req as Request, res as Response, jest.fn());

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Like created successfully",
      });
    });

    it("should return 500 if an error occurs during creating a new like", async () => {
      (likeService.createNewLike as jest.Mock).mockRejectedValue(
        new Error("Error creating like")
      );
      jest
        .spyOn(likeService, "createNewLike")
        .mockRejectedValue(new Error("Error creating like"));

      req.body = { user_id: "123", post_id: "456" };

      await createLike(req as Request, res as Response, jest.fn());

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Error creating like" });
    });
  });

  describe("deleteLike", () => {
    it("should delete a like", async () => {
      const req = {
        params: { id: "1", post_id: "123", user_id: "456" },
      } as Partial<Request>;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as Partial<Response>;

      jest.spyOn(likeService, "deleteLikeById").mockResolvedValue();

      await deleteLike(req as Request, res as Response, jest.fn());

      expect(likeService.deleteLikeById).toHaveBeenCalledWith("1", "123");

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: `Like 1 deleted successfully`,
      });
    });

    it("should return 500 if an error occurs during deleting a like", async () => {
      const req = {
        params: { id: "1", post_id: "123", user_id: "456" },
      } as Partial<Request>;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as Partial<Response>;

      jest
        .spyOn(likeService, "deleteLikeById")
        .mockRejectedValue(new Error("Internal server error"));

      await deleteLike(req as Request, res as Response, jest.fn());

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
    });
  });
});
