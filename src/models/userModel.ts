import { hashPassword } from "@utils/password";
import { User } from "@interfaces/user";
import client from "@utils/db";
import { v4 as uuidv4 } from "uuid";

export const findAllUsers = async (): Promise<User[] | null> => {
  const result = await client.query(`SELECT * FROM users`);
  return result.rows;
};

export const findUserById = async (id: string): Promise<User | null> => {
  const result = await client.query(`SELECT * FROM users WHERE id='${id}'`);
  return result.rows[0] || null;
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const result = await client.query(
    `SELECT * FROM users WHERE email='${email}'`
  );
  return result.rows[0] || null;
};

export const createUser = async (user: User): Promise<void> => {
  const id = uuidv4();
  const newDate = new Date().toISOString();
  const hashedPassword = await hashPassword(user.password);

  await client.query(
    `INSERT INTO users (id, first_name, last_name, email, password, created_date, modified_date) 
    VALUES ('${id}', '${user.first_name}', '${user.last_name}', '${user.email}', '${hashedPassword}', '${newDate}', '${newDate}')`
  );
};

export const deleteUser = async (id: string): Promise<void> => {
  await client.query(`DELETE FROM users WHERE id='${id}'`);
};

export const updateUser = async (
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

  values.push(id);

  const query = `
  UPDATE users
  SET ${setClause}
  WHERE id = $${values.length}
`;

  await client.query(query, values);
};
