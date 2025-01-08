import client from "../utils/db";
import { v4 as uuidv4 } from "uuid";
import { Post } from "../interfaces/post";

export const findAllPostsByUser = async (
  user_id: string
): Promise<Post[] | null> => {
  const result = await client.query(
    `SELECT * FROM posts WHERE user_id='${user_id}'`
  );
  return result.rows;
};

export const findPostById = async (id: string): Promise<Post | null> => {
  const result = await client.query(`SELECT * FROM posts WHERE id='${id}'`);
  return result.rows[0] || null;
};

export const createPostByUser = async (post: Post): Promise<void> => {
  const id = uuidv4();
  const newDate = new Date().toISOString();

  await client.query(
    `INSERT INTO posts (id, user_id, post_picture, rating, caption, location, like_count, comment_count, created_date, modified_date) 
    VALUES ('${id}', '${post.user_id}', '${post.post_picture}', '${post.rating}', '${post.caption}', '${post.location}', '${post.like_count}', '${post.comment_count}', '${newDate}', '${newDate}')`
  );
};

export const deletePostByUser = async (id: string): Promise<void> => {
  await client.query(`DELETE FROM posts WHERE id='${id}'`);
};

export const updatePostByUser = async (id: string, post: Partial<Post>): Promise<void> => {
    // Extract the keys and values from the updates object
  const fields = Object.keys(post);
  const values = Object.values(post);

  // Build the SET part of the SQL query dynamically
  const setClause = fields
    .map((field, index) => `${field} = $${index + 1}`)
    .join(", ");

  values.push(id);

  const query = `
  UPDATE posts
  SET ${setClause}
  WHERE id = $${values.length}
`;

  await client.query(query, values);
}
