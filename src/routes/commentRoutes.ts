import { Router } from "express";
import {
  commentValidator,
  handleValidationErrors,
} from "@middlewares/validator";
// import { authenticateToken } from "@middlewares/authMiddleware";
import {
  getAllCommentsByUser,
  getAllCommentsByPost,
  createComment,
  deleteComment,
  updateComment,
} from "@controllers/commentController";

/**
 * Define API endpoints and link them to their respective comment controllers.
 */

const router = Router();

router.get(
  "/user/:user_id",
  // authenticateToken,
  getAllCommentsByUser
);

router.get(
  "/post/:post_id",
  //  authenticateToken,
  getAllCommentsByPost
);

router.post(
  "/",
  // authenticateToken,
  [...commentValidator, handleValidationErrors],
  createComment
);

router.delete(
  "/:id/:post_id",
  // authenticateToken,
  deleteComment
);

router.put(
  "/:id",
  // authenticateToken,
  updateComment
);

export default router;
