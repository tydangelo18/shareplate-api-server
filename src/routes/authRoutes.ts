import express from "express";
import * as authContoller from "../controllers/authController";

const router = express.Router();

router.post("/login", authContoller.login);

export default router;
