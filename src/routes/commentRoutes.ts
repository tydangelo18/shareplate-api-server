import { Router } from "express";
import {
  commentValidator,
  handleValidationErrors,
} from "src/middlewares/validator";
import {
  getAllCommentsByUser,
  getAllCommentsByPost,
  createComment,
  deleteComment,
  updateComment,
} from "../controllers/commentController";

const router = Router();

router.get("/user/:user_id", getAllCommentsByUser);
router.get("/post/:post_id", getAllCommentsByPost);
router.post("/", [...commentValidator, handleValidationErrors], createComment);
router.delete("/:id/:post_id", deleteComment);
router.put("/:id", updateComment);

export default router;
