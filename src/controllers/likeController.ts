import { Request, Response, NextFunction } from "express";
import {
  getLikesByUser,
  getLikesByPost,
  createNewLike,
  deleteLikeById,
} from "@services/likeService";
import { Like } from "@interfaces/like";

export const getAllLikesByUser = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const { user_id } = req.params;

  try {
    const likes = await getLikesByUser(user_id);

    if (!likes) {
      res.status(404).json({ error: "No likes found for this user" });
      return;
    }

    res.status(200).json(likes);
  } catch (error: any) {
    console.error(`Error fetching likes by user: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

export const getAllLikesByPost = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const { post_id } = req.params;

  try {
    const likes = await getLikesByPost(post_id);

    if (!likes) {
      res.status(404).json({ error: "No likes found for this post" });
    }

    res.status(200).json(likes);
  } catch (error: any) {
    console.error(`Error fetching likes by post: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

export const createLike = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const like: Like = req.body;

  try {
    await createNewLike(like);

    res.status(200).json({ message: `Like created successfully` });
  } catch (error: any) {
    if (error.message.includes("already liked")) {
      res.status(400).json({ error: error.message });
    } else {
      console.error(`Error liking post: ${error.message}`);
      res.status(500).json({ error: error.message });
    }
  }
};

export const deleteLike = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const { id, post_id } = req.params;

  try {
    await deleteLikeById(id, post_id);

    res.status(200).json({ message: `Like ${id} deleted successfully` });
  } catch (error: any) {
    console.error(`Error unliking post: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};
