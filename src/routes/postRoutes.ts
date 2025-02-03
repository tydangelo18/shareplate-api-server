import { Router } from "express";
import {
  getAllPostsByUser,
  getPost,
  getAllPostsForFeedByUser,
  createPost,
  updatePost,
  deletePost,
} from "@controllers/postController";
// import { authenticateToken } from "@middlewares/authMiddleware";

/**
 * Define API endpoints and link them to their respective post controllers.
 */

const router = Router();

router.get(
  "/user/:user_id",
  // authenticateToken,
  getAllPostsByUser
);

router.get(
  "/:id",
  // authenticateToken,
  getPost
);

router.get(
  "/feed/:user_id",
  // authenticateToken,
  getAllPostsForFeedByUser
);

router.post(
  "/",
  // authenticateToken,
  createPost
);

router.put(
  "/:id",
  // authenticateToken,
  updatePost
);

router.delete(
  "/:id",
  // authenticateToken,
  deletePost
);

export default router;
