import { Router } from "express";
import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "@controllers/userController";
import {
  signUpValidator,
  handleValidationErrors,
} from "@middlewares/validator";
// import { authenticateToken } from "@middlewares/authMiddleware";

/**
 * Define API endpoints and link them to their respective user controllers.
 */

const router = Router();

router.get(
  "/",
  // authenticateToken,
  getAllUsers
);

router.get(
  "/:id",
  // authenticateToken,
  getUser
);

router.post("/", [...signUpValidator, handleValidationErrors], createUser);

router.put(
  "/:id",
  // authenticateToken,
  updateUser
);

router.delete(
  "/:id",
  // authenticateToken,
  deleteUser
);

export default router;
