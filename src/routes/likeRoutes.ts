import { Router } from "express";
import {
  getAllLikesByUser,
  getAllLikesByPost,
  createLike,
  deleteLike,
} from "@controllers/likeController";
// import { authenticateToken } from "@middlewares/authMiddleware";

/**
 * Define API endpoints and link them to their respective like controllers.
 */

const router = Router();

router.get(
  "/user/:user_id",
  // authenticateToken,
  getAllLikesByUser
);

router.get(
  "/post/:post_id",
  // authenticateToken,
  getAllLikesByPost
);

router.post(
  "/",
  // authenticateToken,
  createLike
);

router.delete(
  "/:id/:post_id",
  // authenticateToken,
  deleteLike
);

export default router;
