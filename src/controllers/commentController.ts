import { Request, Response, NextFunction } from "express";
import {
  getCommentsByUser,
  getCommentsByPost,
  createNewComment,
  deleteCommentById,
  updateCommentById,
} from "@services/commentService";
import { Comment } from "@interfaces/comment";

/**
 * Handle HTTP requests and responses for comments.
 *
 */

export const getAllCommentsByUser = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const { user_id } = req.params;

  try {
    const comments = await getCommentsByUser(user_id);

    if (!comments) {
      res.status(404).json({ error: "No comments found for this user" });
      return;
    }

    res.status(200).json(comments);
  } catch (error: any) {
    console.error(`Error fetching comments by user: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

export const getAllCommentsByPost = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const { post_id } = req.params;

  try {
    const comments = await getCommentsByPost(post_id);

    if (!comments) {
      res.status(404).json({ error: "No comments found for this post" });
    }

    res.status(200).json(comments);
  } catch (error: any) {
    console.error(`Error fetching comments by post: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

export const createComment = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const comment: Comment = req.body;

  try {
    await createNewComment(comment);

    res.status(200).json({ message: `Comment created successfully` });
  } catch (error: any) {
    console.error(`Error creating comment: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

export const deleteComment = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const { id, post_id } = req.params;

  try {
    await deleteCommentById(id, post_id);

    res.status(200).json({ message: `Comment ${id} deleted successfully` });
  } catch (error: any) {
    console.error(`Error deleting comment: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

export const updateComment = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const { id } = req.params;
  const updates = req.body;

  try {
    await updateCommentById(id, updates);

    res.status(200).json({ message: `Comment ${id} updated successfully` });
  } catch (error: any) {
    console.error(`Error updating comment: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};
