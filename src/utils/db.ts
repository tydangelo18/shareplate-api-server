import { Client } from "pg";
import * as dotenv from "dotenv";

dotenv.config();

const client = new Client({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: String(process.env.POSTGRES_PASSWORD),
  port: Number(process.env.POSTGRES_PORT),
});

export const connectDB = async () => {
  try {
    await client.connect();
    console.log("Database connection successful!");
  } catch (error) {
    console.error("Database connection failed:", error);
  } 
  // finally {
  //   await client.end();
  // }
};

export default client;