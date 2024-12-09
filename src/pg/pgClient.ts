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

export default client;
