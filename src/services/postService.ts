import {
  findAllPostsByUser,
  findPostById,
  createPostByUser,
  deletePostByUser,
  updatePostByUser,
} from "../models/postModel";
import { Post } from "../interfaces/post";

export const getPostsByUser = async (
  user_id: string
): Promise<Post[] | null> => {
  return await findAllPostsByUser(user_id);
};

export const getPostById = async (id: string): Promise<Post | null> => {
  return await findPostById(id);
};

export const createNewPost = async (post: Post): Promise<void> => {
  await createPostByUser(post);
};

export const updatePostById = async (
  id: string,
  post: Partial<Post>
): Promise<void> => {
  await updatePostByUser(id, post);
};

export const deletePostById = async (id: string): Promise<void> => {
  await deletePostByUser(id);
};
