import client from "../utils/db";
import { v4 as uuidv4 } from "uuid";
import { Like } from "../interfaces/like";

export const findAllLikesByUser = async (
  user_id: string
): Promise<Like[] | null> => {
  const result = await client.query(
    `SELECT 
    l.id AS like_id,
    l.post_id,
    p.post_picture,
    p.caption
  FROM 
    likes l
  JOIN 
    users u ON l.user_id = u.id
  JOIN 
    posts p ON l.post_id = p.id
  WHERE 
    l.user_id='${user_id}';`
  );
  return result.rows;
};

export const findAllLikesByPost = async (
  post_id: string
): Promise<Like[] | null> => {
  const result = await client.query(
    `SELECT 
    l.id AS like_id,
    u.first_name,
    u.last_name,
    u.profile_picture
  FROM 
    likes l
  JOIN 
    users u ON l.user_id = u.id
  WHERE 
    l.post_id='${post_id}';`
  );
  return result.rows;
};

export const createLikeByPost = async (like: Like): Promise<void> => {
  const id = uuidv4();
  const newDate = new Date().toISOString();

  await client.query(`
  INSERT INTO likes (id, user_id, post_id, like_time)
  VALUES ('${id}', '${like.user_id}', '${like.post_id}', '${newDate}')`);
};

export const incrementLikeCount = async (like: Like): Promise<void> => {
  await client.query(`
  UPDATE posts
SET like_count = like_count + 1
WHERE id='${like.post_id}'`);
};

export const deleteLikeByPost = async (id: string): Promise<void> => {
  await client.query(`DELETE FROM likes WHERE id='${id}'`);
};

export const decrementLikeCount = async (post_id: string): Promise<void> => {
  await client.query(`
    UPDATE posts
  SET like_count = like_count - 1
  WHERE id='${post_id}'`);
};
