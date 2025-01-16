import client from "@utils/db";
import { v4 as uuidv4 } from "uuid";
import { Connection } from "@interfaces/connection";
import { ConnectionStatus } from "@utils/enums";

export const findAllConnectionsByUser = async (
  user_id: string
): Promise<Connection[] | null> => {
  const result = await client.query(
    `SELECT 
    u.id,
    c.id AS connection_id,
    u.first_name,
    u.last_name,
    u.profile_picture,
    c.status
FROM
    users u 
LEFT JOIN 
    connections c ON u.id = c.requester_id 
WHERE 
    c.user_id='${user_id}'
    AND c.status='${ConnectionStatus.ACCEPTED}';`
  );
  return result.rows;
};

export const findAllConnectionRequestsByUser = async (
  user_id: string
): Promise<Connection[] | null> => {
  const result = await client.query(
    `SELECT 
    u.id,
    c.id AS connection_id,
    u.first_name,
    u.last_name,
    u.profile_picture,
    c.status
FROM
    users u 
LEFT JOIN 
    connections c ON u.id = c.requester_id 
WHERE 
    c.user_id='${user_id}'
    AND c.status='${ConnectionStatus.PENDING}';`
  );
  return result.rows;
};

export const createConnectionRequestByUser = async (
  connection: Connection
): Promise<void> => {
  const id = uuidv4();
  const newDate = new Date().toISOString();

  await client.query(
    `INSERT INTO connections (id, user_id, requester_id, status, created_date, modified_date)
        VALUES ('${id}', '${connection.user_id}', '${connection.requester_id}', '${ConnectionStatus.PENDING}', '${newDate}', '${newDate}')`
  );
};

export const deleteConnectionRequestByUser = async (
  id: string
): Promise<void> => {
  await client.query(
    `DELETE FROM connections WHERE id='${id}' AND status='${ConnectionStatus.PENDING}'`
  );
};

export const deleteConnectionByUser = async (id: string): Promise<void> => {
  await client.query(
    `DELETE FROM connections WHERE id='${id}' AND status='${ConnectionStatus.ACCEPTED}'`
  );
};

export const updateConnectionRequestByUser = async (
  id: string
): Promise<void> => {
  await client.query(
    `UPDATE connections SET status='${ConnectionStatus.ACCEPTED}' WHERE id='${id}'`
  );
};
