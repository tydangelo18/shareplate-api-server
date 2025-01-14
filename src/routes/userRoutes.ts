import { Router } from "express";
import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController";
import { signUpValidator, handleValidationErrors } from "src/middlewares/validator";

const router = Router();

router.get("/", getAllUsers);
router.get("/:id", getUser);
router.post("/", [...signUpValidator, handleValidationErrors], createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
