import express from "express";
import * as authContoller from "@controllers/authController";
import {
  loginValidator,
  handleValidationErrors,
} from "@middlewares/validator";

/**
 * Define API endpoints and link them to their respective auth controllers.
 */

const router = express.Router();

router.post(
  "/login",
  [...loginValidator, handleValidationErrors],
  authContoller.login
);

export default router;
