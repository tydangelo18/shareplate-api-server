import client from "../utils/db";
import { v4 as uuidv4 } from "uuid";
import { Post } from "../interfaces/post";
import { Recipe } from "../interfaces/recipe";

export const findAllPostsByUser = async (
  user_id: string
): Promise<Post[] | null> => {
  const result = await client.query(
    `SELECT
    p.id AS post_id,
    p.post_picture,
    p.rating,
    p.caption,
    p.location,
    p.like_count,
    p.comment_count,
    p.created_date,
    r.id AS recipe_id,
    r.post_id AS recipe_post_id,
    r.type AS recipe_type,
    r.link AS recipe_link,
    r.ingredients AS recipe_ingredients,
    r.content AS recipe_content
FROM
    posts p
LEFT JOIN
    recipes r ON p.id = r.post_id
WHERE
    p.user_id = '${user_id}';`
  );
  return result.rows;
};

export const findPostById = async (id: string): Promise<Post | null> => {
  const result = await client.query(
    `SELECT
    p.id AS post_id,
    p.post_picture,
    p.rating,
    p.caption,
    p.location,
    p.like_count,
    p.comment_count,
    p.created_date,
    r.id AS recipe_id,
    r.post_id AS recipe_post_id,
    r.type AS recipe_type,
    r.link AS recipe_link,
    r.ingredients AS recipe_ingredients,
    r.content AS recipe_content
FROM
    posts p
LEFT JOIN
    recipes r ON p.id = r.post_id
WHERE
    p.id='${id}';`
  );
  return result.rows[0] || null;
};

export const createPostByUser = async (
  post: Post,
  recipe?: Recipe
): Promise<void> => {
  const postId = uuidv4();
  const recipeId = uuidv4();
  const newDate = new Date().toISOString();

  await client.query(
    `INSERT INTO posts (id, user_id, post_picture, rating, caption, location, like_count, comment_count, created_date, modified_date) 
    VALUES ('${postId}', '${post.user_id}', '${post.post_picture}', '${
      post.rating
    }', '${post.caption}', '${
      post.location
    }', '${0}', '${0}', '${newDate}', '${newDate}')`
  );

  if (recipe) {
    await client.query(
      `INSERT INTO recipes (id, post_id, type, link, ingredients, content, created_date, modified_date)
          VALUES ('${recipeId}', '${postId}', '${recipe.type}', '${recipe.link}', '${recipe.ingredients}', '${recipe.content}', '${newDate}', '${newDate}')`
    );
  }
};

export const deletePostByUser = async (id: string): Promise<void> => {
  await client.query(`DELETE FROM posts WHERE id='${id}'`);
  await client.query(`DELETE FROM recipes WHERE post_id='${id}'`);
};

export const updatePostByUser = async (
  id: string,
  data: { post?: Partial<Post>; recipe?: Partial<Recipe> }
): Promise<void> => {
  const { post, recipe } = data;
  if (post && Object.keys(post).length > 0) {
    // Extract the keys and values from the updates object
    const postFields = Object.keys(post).filter((field) =>
      ["post_picture", "rating", "caption", "location"].includes(field)
    );
    const postValues = postFields.map((key) => (post as any)[key]);

    if (postFields.length > 0) {
      // Build the SET part of the SQL query dynamically
      const postSetClause = postFields
        .map((field, index) => `${field} = $${index + 1}`)
        .join(", ");

      postValues.push(id);

      const postQuery = `
UPDATE posts
SET ${postSetClause}
WHERE id = $${postValues.length}
`;
      await client.query(postQuery, postValues);
    }
  }

  if (recipe && Object.keys(recipe).length > 0) {
    const recipeFields = Object.keys(recipe).filter((field) =>
      ["type", "link", "ingredients", "content"].includes(field)
    );
    const recipeValues = recipeFields.map((key) => (recipe as any)[key]);

    if (recipeFields.length > 0) {
      const recipeSetClause = recipeFields
        .map((field, index) => `${field} = $${index + 1}`)
        .join(", ");

      recipeValues.push(id);

      const recipeQuery = `
UPDATE recipes
SET ${recipeSetClause}
WHERE post_id = $${recipeValues.length}
`;

      await client.query(recipeQuery, recipeValues);
    }
  }
};
