import { Request, Response } from "express";
import * as commentService from "@services/commentService";
import {
  getAllCommentsByPost,
  getAllCommentsByUser,
  createComment,
  updateComment,
  deleteComment,
} from "@controllers/commentController";

jest.mock("@services/commentService");

describe("Comment Controller", () => {
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

  describe("getAllCommentsByUser", () => {
    it("should return comments for a user", async () => {
      const mockComments = [
        { id: "1", content: "Test comment", user_id: "123", post_id: "456" },
        { id: "2", content: "Test comment 2", user_id: "123", post_id: "789" },
        { id: "3", content: "Test comment 3", user_id: "123", post_id: "012" },
      ];
      jest
        .spyOn(commentService, "getCommentsByUser")
        .mockResolvedValue(mockComments);

      req.params = { user_id: "123" };

      await getAllCommentsByUser(req as Request, res as Response, jest.fn());

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockComments);
    });

    it("should return 404 if no comments are found for a user", async () => {
      jest.spyOn(commentService, "getCommentsByUser").mockResolvedValue(null);

      req.params = { user_id: "123" };

      await getAllCommentsByUser(req as Request, res as Response, jest.fn());

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: "No comments found for this user",
      });
    });

    it("should return 500 if an error occurs during getting comments by user", async () => {
      jest
        .spyOn(commentService, "getCommentsByUser")
        .mockRejectedValue(new Error("Internal server error"));

      req.params = { user_id: "123" };

      await getAllCommentsByUser(req as Request, res as Response, jest.fn());

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
    });
  });

  describe("getAllCommentsByPost", () => {
    it("should return comments for a post", async () => {
      const mockComments = [
        { id: "1", content: "Test comment", user_id: "123", post_id: "456" },
        { id: "2", content: "Test comment 2", user_id: "012", post_id: "456" },
        { id: "3", content: "Test comment 3", user_id: "789", post_id: "456" },
      ];
      jest
        .spyOn(commentService, "getCommentsByPost")
        .mockResolvedValue(mockComments);

      req.params = { post_id: "456" };

      await getAllCommentsByPost(req as Request, res as Response, jest.fn());

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockComments);
    });

    it("should return 404 if no comments are found for a post", async () => {
      jest.spyOn(commentService, "getCommentsByPost").mockResolvedValue(null);

      req.params = { post_id: "456" };

      await getAllCommentsByPost(req as Request, res as Response, jest.fn());

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: "No comments found for this post",
      });
    });

    it("should return 500 if an error occurs during getting comments by post", async () => {
      jest
        .spyOn(commentService, "getCommentsByPost")
        .mockRejectedValue(new Error("Internal server error"));

      req.params = { post_id: "123" };

      await getAllCommentsByPost(req as Request, res as Response, jest.fn());

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
    });
  });

  describe("createNewComment", () => {
    it("should create a new comment", async () => {
      const mockComment = {
        content: "New comment",
        user_id: "123",
        post_id: "456",
      };
      jest
        .spyOn(commentService, "createNewComment")
        .mockResolvedValue(undefined);

      req.body = mockComment;

      await createComment(req as Request, res as Response, jest.fn());

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Comment created successfully",
      });
    });

    it("should return 500 if an error occurs during comment creation", async () => {
      jest
        .spyOn(commentService, "createNewComment")
        .mockRejectedValue(new Error("Internal server error"));

      req.body = { content: "New comment", user_id: "123", post_id: "456" };

      await createComment(req as Request, res as Response, jest.fn());

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
    });
  });

  describe("deleteComment", () => {
    it("should delete a comment", async () => {
      const req = {
        params: { id: "1", post_id: "456" },
      } as Partial<Request>;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as Partial<Response>;

      jest.spyOn(commentService, "deleteCommentById").mockResolvedValue();

      await deleteComment(req as Request, res as Response, jest.fn());

      expect(commentService.deleteCommentById).toHaveBeenCalledWith("1", "456");

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: `Comment 1 deleted successfully`,
      });
    });

    it("should return 500 if an error occurs during comment deletion", async () => {
      const req = {
        params: { id: "1", post_id: "456" },
      } as Partial<Request>;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as Partial<Response>;

      (commentService.deleteCommentById as jest.Mock).mockRejectedValue(
        new Error("Internal server error")
      );
      jest
        .spyOn(commentService, "deleteCommentById")
        .mockRejectedValue(new Error("Internal server error"));

      await deleteComment(req as Request, res as Response, jest.fn());

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
    });
  });

  describe("updateComment", () => {
    it("should update a comment", async () => {
      const req = {
        params: { id: "1", post_id: "456" },
        body: { title: "Updated Post" },
      } as Partial<Request>;

      jest.spyOn(commentService, "updateCommentById").mockResolvedValue();

      await updateComment(req as Request, res as Response, jest.fn());

      expect(commentService.updateCommentById).toHaveBeenCalledWith(
        "1",
        req.body
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Comment 1 updated successfully",
      });
    });

    it("should return 500 if an error occurs during comment update", async () => {
      const req = {
        params: { id: "1", post_id: "456" },
      } as Partial<Request>;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as Partial<Response>;

      jest
        .spyOn(commentService, "updateCommentById")
        .mockRejectedValue(new Error("Internal server error"));

      await updateComment(req as Request, res as Response, jest.fn());

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
    });
  });
});
