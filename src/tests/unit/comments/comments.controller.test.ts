import { Request, Response } from "express";
import * as commentService from "../../../services/commentService";
import {
  getAllCommentsByPost,
  getAllCommentsByUser,
  createComment,
  updateComment,
  deleteComment,
} from "../../../controllers/commentController";

jest.mock("../../../services/commentService");

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
        { id: "1", content: "Test comment", user_id: "123" },
      ];
      (commentService.getCommentsByUser as jest.Mock).mockResolvedValue(
        mockComments
      );

      req.params = { user_id: "123" };

      await getAllCommentsByUser(req as Request, res as Response, jest.fn());

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockComments);
    });

    it("should return 404 if no comments are found", async () => {
      (commentService.getCommentsByUser as jest.Mock).mockResolvedValue(null);

      req.params = { user_id: "123" };

      await getAllCommentsByUser(req as Request, res as Response, jest.fn());

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: "No comments found for this user",
      });
    });

    it("should handle errors", async () => {
      (commentService.getCommentsByUser as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );

      req.params = { user_id: "123" };

      await getAllCommentsByUser(req as Request, res as Response, jest.fn());

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Database error" });
    });
  });

  describe("getAllCommentsByPost", () => {
    it("should return comments for a post", async () => {
      const mockComments = [
        { id: "1", content: "Test comment", post_id: "456" },
      ];
      (commentService.getCommentsByPost as jest.Mock).mockResolvedValue(
        mockComments
      );

      req.params = { post_id: "456" };

      await getAllCommentsByPost(req as Request, res as Response, jest.fn());

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockComments);
    });

    it("should return 404 if no comments are found", async () => {
      (commentService.getCommentsByPost as jest.Mock).mockResolvedValue(null);

      req.params = { post_id: "456" };

      await getAllCommentsByPost(req as Request, res as Response, jest.fn());

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: "No comments found for this post",
      });
    });
  });

  describe("createNewComment", () => {
    it("should create a new comment", async () => {
      const mockComment = {
        content: "New comment",
        user_id: "123",
        post_id: "456",
      };
      (commentService.createNewComment as jest.Mock).mockResolvedValue(
        undefined
      );

      req.body = mockComment;

      await createComment(req as Request, res as Response, jest.fn());

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Comment created successfully",
      });
    });

    it("should handle errors", async () => {
      (commentService.createNewComment as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );

      req.body = { content: "New comment", user_id: "123", post_id: "456" };

      await createComment(req as Request, res as Response, jest.fn());

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Database error" });
    });
  });

  describe("deleteComment", () => {
    it("should delete a comment successfully", async () => {
      const req = {
        params: { id: "1", post_id: "456" },
      } as Partial<Request>;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as Partial<Response>;

      (commentService.deleteCommentById as jest.Mock).mockResolvedValue({
        success: true,
      });

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
        new Error("Database error")
      );

      await deleteComment(req as Request, res as Response, jest.fn());

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Database error" });
    });
  });

  describe("updateComment", () => {
    it("should return 200 on successful comment update", async () => {
      const req = {
        params: { id: "1", post_id: "456" },
        body: { title: "Updated Post" },
      } as Partial<Request>;

      (commentService.updateCommentById as jest.Mock).mockResolvedValue({
        success: true,
      });

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
  
        (commentService.deleteCommentById as jest.Mock).mockRejectedValue(
          new Error("Database error")
        );
  
        await deleteComment(req as Request, res as Response, jest.fn());
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: "Database error" });
      });
  });
});
