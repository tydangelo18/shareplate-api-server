import { Router } from "express";
import {
  getAllPostsByUser,
  getPost,
  getAllPostsForFeedByUser,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postController";

const router = Router();

router.get("/user/:user_id", getAllPostsByUser);
router.get("/:id", getPost);
router.get("/feed/:user_id", getAllPostsForFeedByUser);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
