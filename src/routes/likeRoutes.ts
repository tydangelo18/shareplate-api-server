import { Router } from "express";
import {
  getAllLikesByUser,
  getAllLikesByPost,
  createLike,
  deleteLike,
} from "../controllers/likeController";

const router = Router();

router.get("/user/:user_id", getAllLikesByUser);
router.get("/post/:post_id", getAllLikesByPost);
router.post("/", createLike);
router.delete("/:id/:post_id", deleteLike);

export default router;
