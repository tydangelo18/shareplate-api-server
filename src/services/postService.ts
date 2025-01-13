import {
  findAllPostsByUser,
  findPostById,
  createPostByUser,
  deletePostByUser,
  updatePostByUser,
} from "../models/postModel";
import { Post } from "../interfaces/post";
import { Recipe } from "../interfaces/recipe";

export const getPostsByUser = async (
  user_id: string
): Promise<Post[] | null> => {
  return await findAllPostsByUser(user_id);
};

export const getPostById = async (id: string): Promise<Post | null> => {
  return await findPostById(id);
};

export const createNewPost = async (
  post: Post,
  recipe?: Recipe
): Promise<void> => {
  await createPostByUser(post, recipe);
};

export const updatePostById = async (
  id: string,
  data: { post?: Partial<Post>; recipe?: Partial<Recipe> }
): Promise<void> => {
  await updatePostByUser(id, data);
};

export const deletePostById = async (id: string): Promise<void> => {
  await deletePostByUser(id);
};
