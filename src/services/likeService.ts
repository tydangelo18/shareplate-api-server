import {
  findAllLikesByUser,
  findAllLikesByPost,
  createLikeByPost,
  incrementLikeCount,
  deleteLikeByPost,
  decrementLikeCount,
} from "../models/likeModel";
import { Like } from "../interfaces/like";

export const getLikesByUser = async (
  user_id: string
): Promise<Like[] | null> => {
  return await findAllLikesByUser(user_id);
};

export const getLikesByPost = async (
  post_id: string
): Promise<Like[] | null> => {
  return await findAllLikesByPost(post_id);
};

export const createNewLike = async (like: Like): Promise<void> => {
  await createLikeByPost(like);
  await incrementLikeCount(like);
};

export const deleteLikeById = async (
  id: string,
  post_id: string
): Promise<void> => {
  await deleteLikeByPost(id);
  await decrementLikeCount(post_id);
};
