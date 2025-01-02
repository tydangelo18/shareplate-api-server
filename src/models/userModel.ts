import { User } from "../interfaces/user";
import client from "../utils/db";

export const getUsers = async (): Promise<User[] | null> => {
  const result = await client.query(`SELECT * FROM users`);
  return result.rows;
};

export const getUserById = async (id: string): Promise<User | null> => {
  const result = await client.query(`SELECT * FROM users WHERE id=${id}`);
  return result.rows[0] || null;
};

export const createUser = async (user: User): Promise<void> => {
  await client.query(
    `INSERT INTO users (id, first_name, last_name, email, password) VALUES (${
      (user.id, user.first_name, user.last_name, user.email, user.password)
    })`
  );
};

export const deleteUserById = async (id: string): Promise<void> => {
  await client.query(`DELETE * FROM users WHERE id=${id}`);
};

export const updateUserById = async (
  id: string,
  user: Partial<User>
): Promise<void> => {
  // Extract the keys and values from the updates object
  const fields = Object.keys(user);
  const values = Object.values(user);

  // Build the SET part of the SQL query dynamically
  const setClause = fields
    .map((field, index) => `${field} = $${index + 1}`)
    .join(", ");

  // Add the userId as the last parameter
  values.push(id);

  // Construct the SQL query
  const query = `
  UPDATE users
  SET ${setClause}
  WHERE id = $${values.length}
`;

  await client.query(query, values);
};
