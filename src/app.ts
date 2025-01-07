import express, { Express } from "express";
import userRoutes from './routes/userRoutes';
import { errorHandler } from "./middlewares/errorHandler";

const app: Express = express();

app.use(express.json());
app.use('/api/users', userRoutes);
app.use(errorHandler);

export default app;
