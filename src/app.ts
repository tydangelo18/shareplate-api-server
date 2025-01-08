import express, { Express } from "express";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import { errorHandler } from "./middlewares/errorHandler";

const app: Express = express();

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/auth", authRoutes);
app.use(errorHandler);

export default app;
