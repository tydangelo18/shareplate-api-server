import { Request, Response, NextFunction } from "express";
import {
  getPostsByUser,
  getPostById,
  getPostsForFeedByUser,
  createNewPost,
  updatePostById,
  deletePostById,
} from "../services/postService";

export const getAllPostsByUser = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const { user_id } = req.params;

  try {
    const posts = await getPostsByUser(user_id);

    if (!posts) {
      res.status(404).json({ error: "No posts found for this user" });
      return;
    }

    res.status(200).json(posts);
  } catch (error: any) {
    console.error(`Error fetching posts by user: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

export const getPost = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  try {
    const post = await getPostById(id);

    if (!post) {
      res.status(404).json({ error: "No post found" });
      return;
    }

    res.status(200).json(post);
  } catch (error: any) {
    console.error(`Error fetching post: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

export const getAllPostsForFeedByUser = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const { user_id } = req.params;

  try {
    const posts = await getPostsForFeedByUser(user_id);

    if (!posts) {
      res.status(404).json({ error: "No feed posts found for this user" });
      return;
    }

    res.status(200).json(posts);
  } catch (error: any) {
    console.error(`Error fetching feed posts by user: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

export const createPost = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const { post, recipe } = req.body;

  try {
    await createNewPost(post, recipe);

    res.status(200).json({ message: "Post created successfully" });
  } catch (error: any) {
    console.error(`Error creating post: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

export const updatePost = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const { id } = req.params;
  const updates = req.body;

  try {
    await updatePostById(id, updates);

    res.status(200).json({ message: `Post ${id} updated successfully` });
  } catch (error: any) {
    console.error(`Error updating post: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

export const deletePost = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  try {
    await deletePostById(id);

    res.status(200).json({ message: `Post ${id} deleted successfully` });
  } catch (error: any) {
    console.error(`Error deleting post: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};
