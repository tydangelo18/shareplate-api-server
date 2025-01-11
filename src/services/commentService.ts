import {
  findAllCommentsByUser,
  findAllCommentsByPost,
  createCommentByPost,
  incrementCommentCount,
  deleteCommentByPost,
  decrementCommentCount,
  updateCommentByPost,
} from "../models/commentModel";
import { Comment } from "../interfaces/comment";

export const getCommentsByUser = async (
  user_id: string
): Promise<Comment[] | null> => {
  return await findAllCommentsByUser(user_id);
};

export const getCommentsByPost = async (
  post_id: string
): Promise<Comment[] | null> => {
  return await findAllCommentsByPost(post_id);
};

export const createNewComment = async (comment: Comment): Promise<void> => {
  await createCommentByPost(comment);
  await incrementCommentCount(comment);
};

export const deleteCommentById = async (
  id: string,
  post_id: string
): Promise<void> => {
  await deleteCommentByPost(id);
  await decrementCommentCount(post_id);
};

export const updateCommentById = async (
  id: string,
  comment: Partial<Comment>
): Promise<void> => {
  await updateCommentByPost(id, comment);
};
