import express, { Express } from "express";
import userRoutes from "@routes/userRoutes";
import authRoutes from "@routes/authRoutes";
import postRoutes from "@routes/postRoutes";
import likeRoutes from "@routes/likeRoutes";
import commentRoutes from "@routes/commentRoutes";
import connectionRoutes from "@routes/connectionRoutes";
import { errorHandler } from "@middlewares/errorHandler";

const app: Express = express();

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/connections", connectionRoutes);
app.use(errorHandler);

export default app;
