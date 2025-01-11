import { Router } from "express";
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
router.post("/", createComment);
router.delete("/:id/:post_id", deleteComment);
router.put("/:id", updateComment);

export default router;
