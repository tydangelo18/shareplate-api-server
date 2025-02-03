import client from "@utils/db";
import { v4 as uuidv4 } from "uuid";
import { Comment } from "@interfaces/comment";

/**
 * Define the database schema and query logic for comments
 */

export const findAllCommentsByUser = async (
  user_id: string
): Promise<Comment[] | null> => {
  const result = await client.query(
    `SELECT
        c.id AS comment_id,
        c.post_id,
        c.content,
        p.post_picture,
        p.caption
    FROM
        comments c
    JOIN
        users u ON c.user_id = u.id
    JOIN
        posts p ON c.post_id = p.id
    WHERE
        c.user_id='${user_id}';`
  );
  return result.rows;
};

export const findAllCommentsByPost = async (
  post_id: string
): Promise<Comment[] | null> => {
  const result = await client.query(
    `SELECT
        c.id AS comment_id,
        c.content,
        u.first_name,
        u.last_name,
        u.profile_picture
    FROM 
        comments c
    JOIN 
        users u ON c.user_id = u.id
    WHERE 
        c.post_id='${post_id}';`
  );
  return result.rows;
};

export const createCommentByPost = async (comment: Comment): Promise<void> => {
  const id = uuidv4();
  const newDate = new Date().toISOString();

  await client.query(`
    INSERT INTO comments (id, user_id, post_id, content, created_date, modified_date)
    VALUES ('${id}', '${comment.user_id}', '${comment.post_id}', '${comment.content}', '${newDate}', '${newDate}')`);
};

export const incrementCommentCount = async (
  comment: Comment
): Promise<void> => {
  await client.query(`
    UPDATE posts
  SET comment_count = comment_count + 1
  WHERE id='${comment.post_id}'`);
};

export const deleteCommentByPost = async (id: string): Promise<void> => {
  await client.query(`DELETE FROM comments WHERE id='${id}'`);
};

export const decrementCommentCount = async (post_id: string): Promise<void> => {
  await client.query(`
      UPDATE posts
    SET comment_count = comment_count - 1
    WHERE id='${post_id}'`);
};

export const updateCommentByPost = async (
  id: string,
  comment: Partial<Comment>
): Promise<void> => {
  // Extract the keys and values from the updates object
  const fields = Object.keys(comment);
  const values = Object.values(comment);

  // Build the SET part of the SQL query dynamically
  const setClause = fields
    .map((field, index) => `${field} = $${index + 1}`)
    .join(", ");

  values.push(id);

  const query = `
  UPDATE comments
  SET ${setClause}
  WHERE id = $${values.length}
`;

  await client.query(query, values);
};
