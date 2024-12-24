import express, { Express } from "express";
import { errorHandler } from "./middlewares/errorHandler";

const app: Express = express();

app.use(express.json());
// TODO: use routes from express
app.use(errorHandler);

export default app;
